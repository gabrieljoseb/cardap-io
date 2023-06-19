import React from "react";
import LinkButton from "../../components/Button";
import ResetLocation from "../../helpers/ResetLocation";

export default class CheckoutBtn extends React.Component {


  render() {
    const { className, showModal, validLogin } = this.props;
    return (
      <React.Fragment>
        {validLogin ? 
        <LinkButton
        onClick={ResetLocation}
        to="/payment"
        className={className}
        >Ir para pagamento</LinkButton>
          :
          <button className={className} onClick={() => { ResetLocation(); showModal() }}>
            Ir para pagamento</button>
        }
      </React.Fragment>

    );
  }
}
