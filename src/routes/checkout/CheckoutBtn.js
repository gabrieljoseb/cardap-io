import React from "react";
import LinkButton from "../../components/Button";

export default class CheckoutBtn extends React.Component {

  handlePayment = async (totalPayment, productsQuantity) => {
    try {
      const items = [
        {
          title: 'Seu Pedido',
          unit_price: totalPayment,
          // quantity: productsQuantity,
          quantity: 1,
        }
      ];

      console.log();

      const response = await fetch('http://localhost:3001/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();
      window.location.href = data.url;
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
