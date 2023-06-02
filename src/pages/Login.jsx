import React, { useState } from 'react';
import { Command } from '../assets/command';

const LoginForm = ({ onLogin }) => {

  const mode = {
    mode1: 'Acessar',
    mode2: 'Registrar'
  }

  const [loginData, setLoginData] = useState({ username: '', password: '', name: '' });
  const [btnSubmit, setbtnSubmit] = useState(mode.mode1);
  const [btnMode, setbtnMode] = useState(mode.mode2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (btnSubmit == mode.mode1) {
      const response = await Command.login(loginData.username, loginData.password);
      alert(response ? 'Login efetuado com sucesso' : 'Dados incorretos')
      setLoginData({ username: loginData.username, password: '' })
      onLogin();
    } else {
      const response = await Command.register(loginData.username, loginData.password, loginData.name);
      alert(response ? "Usuario registrado com sucesso, seguir com login" : 'Falha ao registrar, favor verificar os dados inseridos')
      switchAuthMode();
    }

  }
  const nameTagToRegister = () => {
    if (btnSubmit == mode.mode2) {
      return (
        <>
          <label htmlFor="username">Name</label>
          <input
            className="bg-[#8b8585] rounded-md p-1 text-sm w-56 m-2"
            type="text"
            id="name"
            name="name"
            value={loginData.name}
            onChange={handleInputChange}
          />
        </>
      )
    }
  }
  const switchAuthMode = () => {
    if (btnSubmit == mode.mode1) {
      setbtnSubmit(mode.mode2);
      setbtnMode(mode.mode1);
    } else {
      setbtnSubmit(mode.mode1);
      setbtnMode(mode.mode2);
    }
    setLoginData({ username: '', password: '' })
  }

  return (
    <main className="h-screen bg-[#38532f]">
      <h1 className="font-bold text-center pt-36 mb-10 text-7xl text-[#d9d9d9]">Colist</h1>
      <div className="flex flex-col items-center ">
        <div className="bg-[#D9D9D9] rounded-xl">
          <div className="p-5">
            <form className="flex flex-col items-center text-sm" onSubmit={handleSubmit}>
              
              {nameTagToRegister()}

              <label htmlFor="username">Usuário</label>
              <input
                className="bg-[#8b8585] rounded-md p-1 text-sm w-56 m-2"
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
              />

              <label htmlFor="password">Senha</label>
              <input
                className="bg-[#8b8585] rounded-md p-1 text-sm w-56 m-2"
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />

              <button
                className="rounded-full bg-slate-600 p-2 w-20 mt-4 text-[#ffffff]"
                type="submit">
                {btnSubmit}
              </button>

            </form>
            <div className="flex justify-around pt-8 text-sm">
              <button className="mr-5" href="" >Esqueci Minha Senha</button>
              <button className="ml-5" href="" onClick={switchAuthMode}>{btnMode}</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;


