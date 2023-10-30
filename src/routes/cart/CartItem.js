import React from "react";
import CartProductInteraction from "./CartItemInteraction";

const CartItem = ({ successMsg,
  handleAddProduct,
  handleRemoveProduct,
  clearCart,
  cartItems }) => {
  return (
    <section className="cart-title-section" >
      {
        cartItems.map((cartItem, index) => {
          return (
            <article className="cart-item" key={index}>
              <img src={cartItem.ItemImg} alt={cartItem.ItemName} />
              <section className="cart-item-content">
                <section className="cart-item-info">
                  <section className="cart-item-title">
                    {cartItem.userSelectedAttributes.length === 0 ? (
                      <h3>{cartItem.ItemName}</h3>
                    ) : (
                      <h3>
                        {cartItem.ItemName},{" "}
                        {cartItem.userSelectedAttributes.map((i, index) => {
                          return <span key={index}>{i.attributeValue}</span>;
                        })}
                      </h3>
                    )}
                  </section>
                  <section className="cart-item-ingredients">
                    <p>{cartItem.ItemIngredients}</p>
                  </section>
                </section>

                <section className="cart-item-interaction">
                  <CartProductInteraction
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    cartItem={cartItem}
                    successMsg={successMsg}
                  />

                  <p className="cart-item-price">R${cartItem.ItemPrice}</p>
                </section>
              </section>
            </article>
          );
        })
      }
    </section>
  );
}



export default CartItem;