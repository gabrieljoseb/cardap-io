import React, { useEffect } from 'react';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Inicializar o Firebase com as configurações
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const uiConfig = {
  signInSuccessUrl: '/', // URL para redirecionar após o login
  signInOptions: [
    // Opções de provedores de login
    getAuth.GoogleAuthProvider.PROVIDER_ID,
    getAuth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function Login({ setUser }) {
  useEffect(() => {
    // Inicializar a instância da Firebase UI
    const ui = new firebaseui.auth.AuthUI(auth);

    // Iniciar a Firebase UI com a configuração
    ui.start('#firebaseui-auth-container', uiConfig);

    // Lidar com a atualização do estado do usuário após o login
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userInfo = {
          nome: user.displayName,
          email: user.email,
        };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
      }
    });
  }, [setUser]);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Login;
