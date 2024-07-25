import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/NuBolsoLogo.png';
import SearchBar from '../searchBar/SearchBar';

let linkCorrente = {
  color: "#027399"
};

const Navbar = () => {

  const handleSearch = (query) => {
    console.log('Searching for: ', query);
    // lógica para realizar busca
  };

  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='navbar-container'>
        <a href='/'>
            <img src={Logo} alt='Logo' title='NuBolsoTickets' className='navbar-logo'/>
        </a>

      <ul className='navbar-menu'>
        <li className='navbar-serach-bar'>
          <SearchBar onSearch={handleSearch}/>
        </li>
        <li className='navbar-item'>
          <button onClick={handleLogin}>
            {isLogin ? 
              <NavLink exact activeStyle={linkCorrente} to="/login">Entre ou cadastre-se</NavLink>
              : 
              <NavLink exact activeStyle={linkCorrente} to="/pefil">Olá, Fulano</NavLink>
            }
          </button>
        </li>
    </ul>
    </div>
  );
}

export default Navbar;
