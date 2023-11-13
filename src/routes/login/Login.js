import React, { useEffect } from 'react';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Inicializar o Firebase com as configurações
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const uiConfig = {
  signInSuccessUrl: '/', // URL para redirecionar após o login
  signInOptions: [
    // Opções de provedores de login
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    'email'
  ],
};

function Login({ setUser }) {
  useEffect(() => {
    // Verifica se a instância da Firebase UI já foi inicializada para evitar duplicação
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start('#firebaseui-auth-container', uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start('#firebaseui-auth-container', uiConfig);
    }

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

    // Limpar a UI ao desmontar o componente
    return () => {
      const ui = firebaseui.auth.AuthUI.getInstance();
      if (ui) ui.delete();
    };
  }, [setUser]);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Login;
