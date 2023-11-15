import axios from 'axios/dist/node/axios.cjs';

const webhookHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { type, data } = req.body;
    console.log('Webhook recebido:', req.body);

    if (type !== 'payment') {
      return res.status(200).send('Webhook recebido com sucesso');
    }

    const { id } = data;
    const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    });

    const paymentData = paymentResponse.data;
    // const payerData = paymentData.payer; // Descomente e use esses dados
    await axios.post('https://kitchen-io.vercel.app/api/orders', {
      numero_transacao: id,
      nome_cliente: "payerData.first_name",
      status: 'Pendente',
      email: "payerData.email@email.com",
      mesa_id: "1"
    });

    const items = paymentData.additional_info.items;
    await axios.post('https://kitchen-io.vercel.app/api/orders_itens', { items: items, id: id });

    return res.status(200).send('Webhook processado com sucesso');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(500).send('Erro interno do servidor');
  }
};

export default webhookHandler;
