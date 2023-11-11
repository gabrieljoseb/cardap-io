import React from "react";
import LinkButton from "../../components/Button";
import axios from 'axios';

export default class CheckoutBtn extends React.Component {

  handlePayment = async (totalPayment, productsQuantity) => {
    try {
      const items = [
        {
          title: 'Seu Pedido',
          unit_price: totalPayment,
          quantity: 1
        }
      ];
    
      const response = await axios.post('/api/process-payment', { items });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  }

  render() {
    const { totalPayment, productsQuantity, className } = this.props;
    return (
      <React.Fragment>
        <LinkButton
          onClick={() => this.handlePayment(totalPayment, productsQuantity)}
          className={className}>
          Ir para pagamento
        </LinkButton>
      </React.Fragment>

    );
  }
}
