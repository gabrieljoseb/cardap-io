import React, { Component } from 'react';

export default class FailedPayment extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Pagamento Falhou</h1>
        <p>Infelizmente, não conseguimos processar o seu pagamento. Por favor, tente novamente mais tarde.</p>
      </React.Fragment>
    );
  }
}