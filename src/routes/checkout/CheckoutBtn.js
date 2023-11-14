import React from "react";
import LinkButton from "../../components/Button";
import axios from 'axios';

export default class CheckoutBtn extends React.Component {

  handlePayment = async (cartItems, userInfo) => {
    try {

      const items = cartItems.map(cartItem => {
        return {
          title: cartItem.ItemName, // Nome do item
          unit_price: parseFloat(cartItem.ItemPrice), // Preço unitário
          quantity: cartItem.quantity // Quantidade de itens
        };
      });

      const payer = {
        "email": userInfo.email,
        "first_name": userInfo.nome,
      }

      const response = await axios.post('/api/process-payment', { items, payer });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  }

  render() {
    const { cartItems, userInfo, className } = this.props;
    return (
      <React.Fragment>
        <LinkButton
          onClick={() => this.handlePayment(cartItems, userInfo)}
          className={className}>
          Ir para pagamento
        </LinkButton>
      </React.Fragment>

    );
  }
}
