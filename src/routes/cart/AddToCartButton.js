import React from "react";

export default class AddToCartButton extends React.Component {
  render() {
    const {
      singleProduct,
      allAttributesAreSelected,
      selectedAttributes,
      handleAddProduct,
      successMsg,
    } = this.props;
    return (
      <button
        onClick={() => {
          handleAddProduct(singleProduct, selectedAttributes);
          successMsg();
        }}
        className={`passive-button-style ${allAttributesAreSelected
          ? "active-add-to-cart"
          : "inactive-add-to-cart"
          }`}
        disabled={!allAttributesAreSelected}
      >
        Adicionar
      </button>
    );
  }
}
