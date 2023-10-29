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
    //access_token: 'APP_USR-3400987480080086-102914-6621e3ad1f3f511e4791f83bbb71933a-1527781365'
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// Rota para criar uma preferência de pagamento
app.post('/create-preference', async (req, res) => {
  let preference = {
    items: [
      {
        title: 'Produto Teste',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar preferência de pagamento');
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
