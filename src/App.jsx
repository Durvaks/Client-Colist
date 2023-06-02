import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Main from './pages/Main';
import { Command } from './assets/command';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const checkUserStatus = async () => {
    try {
      const response = await Command.checkUser();
      if (response) {
        setLoggedIn(true);
        setUser(response.name);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      // Tratar o erro, se necessário
    }
  };

  const handleLogout = () => {
    Command.logout();
    setLoggedIn(false);
    alert('Logout efetuado com sucesso');
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return loggedIn ? (
    <Main onLogout={handleLogout} username={user} />
  ) : (
    <Login onLogin={checkUserStatus} />
  );
}

export default App;
