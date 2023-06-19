import React from "react";
import EmptyCart from "./EmptyCart";

const Cart = ({ cartItems, clearedCart, CartItem, cartTotals }) => {

  document.title = "Carrinho | Cardap.io";
  return (
    <main className="cart-container">
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? <EmptyCart /> : CartItem}
      {clearedCart === true ? null : cartTotals}

    </main>
  );
}

export default Cart;
