import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/NuBolsoLogo.png';
import SearchBar from '../searchBar/SearchBar';
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../../utils/UseAuth';
import Dropdown from '../dropdown/Dropdown';

const Navbar = () => {

  const { isAuthentic, setIsAuthentic } = useContext(AuthContext);

  const handleSearch = (query) => {
    console.log('Searching for: ', query);
    // lógica para realizar busca
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthentic(false);
  };

  return (
    <div className='navbar-container'>
      <a href='/'>
        <img src={Logo} alt='Logo' title='NuBolsoTickets' className='navbar-logo'/>
      </a>
      
      <ul className='navbar-menu'>
      <SearchBar onSearch={handleSearch}/>
        {isAuthentic ? (
          <li className='navbar-user-drop'>
              <div className='navbar-user-box'>
                <Dropdown isAuthenticated={isAuthentic} onLogout={handleLogout} />
              </div>
          </li>
        ) : (
          <li className='navbar-user'>
            <NavLink to='/login' className='navbar-user-link'>
              <div className='navbar-user-box'>
                <span>Entre ou Cadastre-se</span>
              </div>
            </NavLink>
          </li>
        )}




      </ul>
    </div>
  );
}

export default Navbar;
