import React, { useEffect } from 'react';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  getRedirectResult
} from "firebase/auth";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Inicializar o Firebase com as configurações
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurações do Firebase UI
const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID
  ],
};

function Login({ setUser }) {
  useEffect(() => {
    // Iniciar o Firebase UI para o processo de login
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start('#firebaseui-auth-container', uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start('#firebaseui-auth-container', uiConfig);
    }

    // Tratar o resultado do redirecionamento após o login
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // Usuário logado, você pode obter o usuário assim: const user = result.user;
          // Defina o usuário no estado do componente ou faça o que for necessário
          const userInfo = {
            nome: result.user.displayName,
            email: result.user.email,
          };
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
        }
      })
      .catch((error) => {
        // Tratar erros aqui
        console.error(error);
      });

    // Limpar o Firebase UI ao desmontar o componente
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
