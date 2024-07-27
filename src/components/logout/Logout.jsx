import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Ajuste o caminho conforme necessário

const Logout = () => {
  const { setIsAuthentic } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthentic(false);
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
};

export default Logout;
