// Login.js
import React from 'react';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// Inicializar o Firebase com as configurações
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Extrair informações do usuário
            const userInfo = {
                nome: user.displayName,
                email: user.email,
            };

            // Atualizar o estado com as informações do usuário
            this.setState({ user: userInfo });

            // Passar as informações para o componente pai
            this.props.setUser(userInfo);

            // Enviando evento para o Firebase Analytics
            logEvent(analytics, 'login', { method: provider.providerId });

            // Armazenar as informações do usuário no localStorage para persistência entre sessões
            localStorage.setItem('user', JSON.stringify(userInfo));
        } catch (error) {
            console.error(error);
            // Enviar evento de erro para o Firebase Analytics
            logEvent(analytics, 'login_failure', { error: error.message });
        }
    };

    render() {
        return (
            <div>
                <button onClick={() => this.handleLogin(googleProvider)}>Login com Google</button>
                <button onClick={() => this.handleLogin(facebookProvider)}>Login com Facebook</button>
                {this.state.user && <div>Bem-vindo, {this.state.user.nome}</div>}
            </div>
        );
    }
}

export default Login;
