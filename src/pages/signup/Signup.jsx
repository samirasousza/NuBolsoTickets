import React, { useContext, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './Signup.css'
import { AuthContext } from '../../utils/UseAuth';

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Senhas diferentes');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.email === email);
    
    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    console.log(JSON.parse(localStorage.getItem('users')));


    navigate('/login');
  };

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <form method='post' action='' onSubmit={handleSubmit} className='signup-form'>
          <h2>Cadastro</h2>
          {message && <p>{message}</p>}

          <div className='signup-campo'>
            <label>Nome</label>
            <input 
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='signup-campo'>
            <label>E-mail</label>
            <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='signup-campo'>
            <label>Senha</label>
            <input
            type='password'
            name='senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='signup-campo'>
            <label>Confirme sua senha</label>
            <input
            type='password'
            name='confirmSenha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='signup-checkbox'>
            <input type='checkbox'/>
            <p>Mantenha-me Conectado</p>
            <a href=''>Esqueceu a senha?</a>
          </div>

          <input type='submit' value='Cadastrar'/>
        </form>

        <div className='signup-login'>
          <p>Já possui uma conta?</p>
          <NavLink to='/login' className='login-link'>Faça login!</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Signup
