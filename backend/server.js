const express = require('express');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuração do Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

app.post('/process-payment', async (req, res) => {
    try {
        let preference = {
            items: req.body.items,
            //notification_url: 'http://localhost:3001/payment-notification',
            back_urls: {
                success: 'http://localhost:3000/successful-payment',
                pending: 'http://localhost:3000/menu',
                failure: 'http://localhost:3000/menu',
            }
        };

        const response = await mercadopago.preferences.create(preference);
        const initPoint = response.body.init_point;
        res.json({ url: initPoint });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar pagamento');
    }
});

app.post('/payment-notification', async (req, res) => {
    const paymentId = req.body.data.id;
    console.log(paymentId);

    // Exemplo: const orderNumber = await fetchOrderNumberFromDatabase(paymentId);
    // const orderNumber = '12345'; // Substitua por sua lógica real

    // Enviar o número do pedido para a aplicação de cozinha
    // try {
    //     await axios.post('http://endereco_da_aplicacao_de_cozinha/api/orders', {
    //         orderNumber,
    //         status: 'pendente'
    //     });
    //     res.status(200).send();
    // } catch (error) {
    //     console.error('Erro ao enviar o pedido para a aplicação de cozinha:', error);
    //     res.status(500).send('Internal Server Error');
    // }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
