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
            back_urls: {
                success: 'http://localhost:3000/successful-payment',
                pending: 'http://localhost:3000/pending-payment',
                failure: 'http://localhost:3000/failed-payment',
            },
            auto_return: 'approved',
        };

        const response = await mercadopago.preferences.create(preference);
        const initPoint = response.body.init_point;
        res.json({ url: initPoint });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar pagamento');
    }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
