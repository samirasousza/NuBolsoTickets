import React, { useState } from 'react'
import './Dropdown.css'
import { FaRegUser, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { IoLogOut, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ isAuthenticated, onLogout }) => {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleTicket = () => {
        navigate('/tickets');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <div className="dropdown-container">
            <button className={`dropdown-button ${isOpen ? 'toggled' : 'untoggled'}`} onClick={toggleDropdown}>
                <FaUserCircle className='navbar-user-icon'/>
                <span>Olá, Fulano</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                {isAuthenticated ? (
                    <div className='dropdown-itens'>
                        <button className="dropdown-item" onClick={handleTicket} >
                            <IoTicket className='dropdown-item-icon'/>
                            <span>Ingressos</span>
                        </button>

                        <button className="dropdown-item" onClick={handleProfile}>
                            <FaUserAlt className='dropdown-item-icon'/>
                            <span>Conta</span>
                        </button>

                        <button className="dropdown-item" onClick={onLogout} >
                            <IoLogOut className='dropdown-item-icon'/>
                            <span>Sair</span>
                        </button>
                    </div>
                ) : (
                    <>
                    <a href="/login" className="dropdown-item">Login</a>
                    <a href="/signup" className="dropdown-item">Sign Up</a>
                    </>
                )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;