import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/NuBolsoLogo.png';
import SearchBar from '../searchBar/SearchBar';
import { FaUserCircle } from "react-icons/fa";

let linkCorrente = {
  color: "#027399"
};

const Navbar = () => {

  const handleSearch = (query) => {
    console.log('Searching for: ', query);
    // lógica para realizar busca
  };

  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='navbar-container'>
        <a href='/'>
            <img src={Logo} alt='Logo' title='NuBolsoTickets' className='navbar-logo'/>
        </a>

      <ul className='navbar-menu'>
        <SearchBar onSearch={handleSearch}/>
        <li className='navbar-user'>
          <NavLink to={isLogin ? '/perfil' : '/login'} onClick={handleLogin} className='navbar-user-link>'>
            <div className='navbar-user-box'>
              {isLogin && <FaUserCircle className='navbar-user-icon'/>}
              <span>{isLogin ? 'Olá, Fulano' : 'Entre ou Cadastre-se'}</span>
            </div>
          </NavLink>
        </li>
    </ul>
    </div>
  );
}

export default Navbar;
