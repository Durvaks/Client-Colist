import React, { useState } from 'react';
import { Command } from '../assets/command';

const LoginForm = ({onLogin}) => {

    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();        
        await Command.login(loginData.username, loginData.password);
        onLogin();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Usuário</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Entrar</button>
        </form>
    );
};

export default LoginForm;


