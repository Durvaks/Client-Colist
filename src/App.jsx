import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';
import { Command } from './assets/command';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const check = async () => {
    try {
      const response = await Command.checkUser();
      if (response) {
        setLoggedIn(true);
        console.log('usuário já logado');
      } else {
        setLoggedIn(false);
        console.log('usuário não está logado');
      }
    } catch (error) {
      // Manipular erro, se necessário
    }
  };

  useEffect(() => {
    check();
  }, []);

  const handleLogout = () => {
    Command.logout();
    check();
  };

  return (
    <>
      {loggedIn ? <Main onLogout={handleLogout} /> : <Login onLogin={check}/>}
    </>
  );
}

export default App;
