import axios from 'axios';
import pool from './database.js';

const webhookHandler = async (req, res) => {

  if (req.method === 'POST') {
    const client = await pool.connect();
    try {
      const { type, data } = req.body;

      // Verificar o tipo do webhook e tratar os dados conforme necessário.
      // Por exemplo, para um pagamento, você pode querer extrair informações da transação.
      if (type === 'payment') {
        const { id } = data;
        // Rota para receber os detalhes da transação.
        axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }).then(async response => {
          const paymentData = response.data;
          //const payerData = paymentData.payer;
          const items = paymentData.additional_info.items;

          // Inserir os dados do pagador na tabela 'pedidos'.
          axios.post('https://kitchen-io.vercel.app/api/orders', {
            numero_transacao: id,
            nome_cliente: 'Test User',
            //nome_cliente: payerData.first_name + ' ' + payerData.last_name,
            status: 'Pendente',
          }).catch(error => console.log('[POST] api/orders error: ', error));

          // Inserir os itens do pedido na tabela 'pedidos_itens'.
          axios.post('https://kitchen-io.vercel.app/api/orders_itens', { items: items, id: id })
            .catch(error => console.log('[POST] api/orders_itens error: ', error));
        }).catch(error => {
          console.error('Erro na requisição:', error);
        });
      }
      // Log e resposta de sucesso.
      console.log('Webhook recebido:', req.body);
      res.status(200).send('Webhook recebido com sucesso');
    } catch (error) {
      // Log e resposta de erro.
      console.error('Erro ao processar webhook:', error);
      res.status(500).send('Erro interno do servidor');
    } finally {
      client.release();
    }
  } else {
    // Permitir apenas métodos POST.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Exportar a função nomeada como padrão.
export default webhookHandler;
