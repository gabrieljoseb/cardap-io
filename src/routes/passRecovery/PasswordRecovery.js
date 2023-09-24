import React from "react";

export default class PasswordRecovery extends React.Component {
  render() {
    document.title = "Password Recovery | Cardap.io";
    return (
      <main className="password-recovery-main">
        <section className="pass-recovery-section">
          <section className="pass-recovery-title">
            <h1>Precisa de ajuda com sua senha?</h1>
            <p>
              Insira o e-mail cadastrado que vamos ajudá-lo
            </p>
          </section>
          <section className="forgot-pass-submit-section">
            <input className="forgot-pass-input" type="email" placeholder="Email"></input>
            <button className="forgot-pass-btn">Próximo</button>
          </section>
        </section>
      </main>
    );
  }
}

