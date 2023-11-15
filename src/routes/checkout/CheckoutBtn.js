import React from "react";
import LinkButton from "../../components/Button";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class CheckoutBtn extends React.Component {

  generateUniqueExternalReference = () => {
    return uuidv4(); // Esta função gera um UUID v4 único
  }

  handlePayment = async (cartItems, userInfo) => {
    try {
      const items = cartItems.map(cartItem => {
        return {
          title: cartItem.ItemName,
          unit_price: parseFloat(cartItem.ItemPrice),
          quantity: cartItem.quantity
        };
      });

      const user = {
        nome: userInfo.nome,
        email: userInfo.email,
        mesa_id: localStorage.getItem('mesa_id')
      };
      const externalReference = this.generateUniqueExternalReference();
      await axios.post('/api/client', { user, external_reference: externalReference });

      const mercadoPagoResponse = await axios.post('/api/process-payment', { items, external_reference: externalReference });
      window.location.href = mercadoPagoResponse.data.url;
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
