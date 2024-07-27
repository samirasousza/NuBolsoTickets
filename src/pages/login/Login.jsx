import React, { useContext, useState } from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/UseAuth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { setIsAuthentic } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify({ email }));
      setIsAuthentic(true);
      navigate('/');
    } else {
      setMessage('Credenciais inválidas');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <form method='post' action='' onSubmit={handleSubmit} className='login-form'>
          <h2>Login</h2>
          {message && <p>{message}</p>}

          <div className='login-campo'>
            <label>E-mail</label>
            <input
            type='email'
            name='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='login-campo'>
            <label>Senha</label>
            <input
            type='password'
            name='senha'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='login-checkbox'>
            <input type='checkbox' className='checkbox-custom'/>
            <label>Mantenha-me Conectado</label>
            <a href=''>Esqueceu a senha?</a>
          </div>

          <input type='submit' value='Entrar'/>
        </form>

        <div className='login-signup'>
          <p>Não possui uma conta?</p>
          <NavLink to='/signup' className='signup-link'>Cadastre-se</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login
