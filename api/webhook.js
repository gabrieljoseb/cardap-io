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
          const payerData = paymentData.payer;
          const itemsData = paymentData.additional_info.items;
          
          // Inserir os dados do pagador na tabela 'pedidos'.
          let query = 'INSERT INTO pedidos (numero_transacao, nome_cliente, status, cpf, email, celular) VALUES ($1, $2, $3, $4, $5, $6)';
          let values = [id, payerData.first_name + ' ' + payerData.last_name, 'Pendente', payerData.identification.number, payerData.email, payerData.phone.number];
          await client.query(query, values);

          // Inserir os itens do pedido na tabela 'pedidos_itens'.
          query = 'INSERT INTO pedidos_itens (numero_transacao, nome, preco, quantidade) VALUES ($1, $2, $3, $4)';
          for (let item of itemsData) {
            values = [id, item.title, item.unit_price, item.quantity];
            await client.query(query, values);
          }          
          console.log('Dados inseridos com sucesso');
        }).catch(error => {
          console.error('Erro na requisição:', error);
        });

        // Log e resposta de sucesso.
        console.log('Webhook recebido:', req.body);
        res.status(200).send('Webhook recebido com sucesso');
      }
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
