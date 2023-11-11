import React from "react";
import CheckoutBtn from "../checkout/CheckoutBtn";
import LinkButton from "../../components/Button";
import ResetLocation from "../../helpers/ResetLocation";

const CartTotals = ({ totalPayment, productsQuantity, cartItems, className }) => {
  return (
    <article className={className}>
      {productsQuantity === 0 ? null : (
        <section className="cart-totals">
          <section className="totals-content">
            <section>
              <h4 className="cart-totals-sum">Total:</h4>
              {/* COUNTING TWICE DUE TO STRICT MODE */}
              <p>R$ {(totalPayment / 2).toFixed(2)}</p>
            </section>
          </section>
          <section className="cart-interaction-btns">
            <CheckoutBtn
              className="active-button-style"
              cartItems={cartItems}
            />
            <LinkButton onClick={ResetLocation} to="/menu" className="cart-backtomenu-btn" >
              Voltar ao Cardápio
            </LinkButton>
          </section>
        </section>
      )}
    </article>
  );
}

export default CartTotals;
