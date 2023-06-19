import React from "react";
import { Link } from "react-router-dom";
import ResetLocation from "../../helpers/ResetLocation";

export default class EmptyCart extends React.Component {
  render() {
    return (
      <article className="cart-title-section">
        <h3>Poxa! Seu carrinho está vazio... :(</h3>
        <Link to="/menu" className="active-button-style" onClick={ResetLocation}>
          Ir para o cardápio
        </Link>
      </article>
    );
  }
}
