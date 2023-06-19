import React from "react";
import RegistrationForm from "./RegistrationForm";

export default class Register extends React.Component {
  render() {
    document.title = "Register | Cardap.io";
    return (
      <main className="register-main">
        <h1>Registro</h1>
        <RegistrationForm />

      </main>
    );
  }
}
