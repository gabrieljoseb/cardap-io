import React from 'react';
import auth, { googleProvider, facebookProvider, analytics, firebaseConfig } from '../../config/firebase';
import { signInWithPopup } from "firebase/auth";
import { logEvent } from "firebase/analytics";

class Login extends React.Component {
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
        console.log(firebaseConfig);
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
