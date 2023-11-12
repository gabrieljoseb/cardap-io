import axios from 'axios';

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { type, data } = req.body;

      if (type === 'payment') {
        const { id } = data;
        // Rota para receber os detalhes da transação.
        const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        });

        const paymentData = paymentResponse.data;
        const items = paymentData.additional_info.items;

        // As duas chamadas abaixo podem ser feitas em paralelo
        await Promise.all([
          axios.post('https://kitchen-io.vercel.app/api/orders', {
            numero_transacao: id,
            nome_cliente: 'Test User',
            status: 'Pendente',
          }),
          axios.post('https://kitchen-io.vercel.app/api/orders_itens', { items: items, id: id })
        ]);
      }

      console.log('Webhook recebido:', req.body);
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
