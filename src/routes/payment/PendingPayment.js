import React, { Component } from 'react';

export default class PendingPayment extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Pagamento Pendente</h1>
        <p>O seu pagamento está sendo processado. Por favor, aguarde a confirmação.</p>
      </React.Fragment>
    );
  }
}