import React, { useContext, useEffect, useState } from 'react'
import './Dropdown.css'
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { IoLogOut, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/UseAuth';

const Dropdown = ({ onLogout }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { isAuthentic } = useContext(AuthContext);
    const [ userName, setUserName ] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, [isAuthentic]);

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
                <span>Olá, {userName}</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                {isAuthentic ? (
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