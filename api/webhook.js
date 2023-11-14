import axios from 'axios/dist/node/axios.cjs';

const webhookHandler = (req, res) => {
  if (req.method === 'POST') {
    try {
      const { type, data } = req.body;

      if (type === 'payment') {
        const { id } = data;
        console.log('Webhook recebido:', req.body);
        console.log('id', id);

        // Rota para receber os detalhes da transação.
        axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }).then(response => {
          const paymentData = response.data;
          //const payerData = paymentData.payer;
          const items = paymentData.additional_info.items;

          // Inserir os dados do pagador na tabela 'pedidos'.
          axios.post('https://kitchen-io.vercel.app/api/orders', {
            numero_transacao: id,
            nome_cliente: "payerData.first_name",
            status: 'Pendente',
            email: "payerData.email@email.com",
            mesa_id: 1
          }).then(response => console.log('orders response', response))
            .catch(error => console.log('[POST] api/orders error: ', error));

          // Inserir os itens do pedido na tabela 'pedidos_itens'.
          axios.post('https://kitchen-io.vercel.app/api/orders_itens', { items: items, id: id })
            .then(response => console.log('orders_itens response', response))
            .catch(error => console.log('[POST] api/orders_itens error: ', error));
        }).catch(error => {
          console.error('Erro na requisição:', error);
        });
      }

      res.status(200).send('Webhook recebido com sucesso');
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      res.status(500).send('Erro interno do servidor');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default webhookHandler;
