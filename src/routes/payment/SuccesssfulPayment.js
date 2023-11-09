import React from "react";
import Tick from "../../assets/images/success-tick.png";
import ResetLocation from "../../helpers/ResetLocation";
import { Link } from "react-router-dom";

export default class SuccessfulPayment extends React.Component {
  render() {
    return (
      <main>
        <article className="success-payment">
          <section className="success-payment-title">
            <h2>Pedido realizado!</h2>
            <p>Em breve o garçom irá trazer seu pedido</p>
          </section>
          <img src={Tick} alt="" aria-hidden="true" />
          <section className="success-payment-redirection">
            <Link className="active-button-style" to="/menu" onClick={ResetLocation}>Fazer outro pedido</Link>
          </section>
        </article>
      </main>
    );
  }
}
