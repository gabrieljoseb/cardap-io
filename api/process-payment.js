const mercadopago = require('mercadopago');

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'https://cardap-io.vercel.app';

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

module.exports = async (req, res) => {

    if (req.method === 'POST') {
        try {
            let preference = {
                items: req.body.items,
                payer: req.body.payer,
                notification_url: 'https://cardap-io.vercel.app/api/webhook',
                back_urls: {
                    success: `${baseUrl}/orders`,
                    pending: `${baseUrl}/menu`,
                    failure: `${baseUrl}/menu`,
                }
            };
            const response = await mercadopago.preferences.create(preference);
            const initPoint = response.body.init_point;
            res.json({ url: initPoint });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar pagamento');
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 