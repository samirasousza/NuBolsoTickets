import React, { useContext, useState } from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/UseAuth';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthentic } = useContext(AuthContext);

  const handleGoogleSuccess = (response) => {
    console.log(response);
    const decoded = jwtDecode(response.credential);
    const { name, email, password } = decoded;

    setName(name);
    setEmail(email);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email);

    if (!user){
      // Se o usuário não existir, criar um novo e adicionar ao localStorage
      user = { name, email };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Configurar a autenticação e redirecionar
    localStorage.setItem('user', JSON.stringify({ name, email }));
    setIsAuthentic(true);
    navigate('/');
  };

  const handleGoogleFailure = (response) => {
    setIsAuthentic(false);
    setMessage('Erro ao tentar logar com google')
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    const dataUser = JSON.parse(localStorage.getItem('user'));

    if (user) {
      localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email, password: user.password }));
      
      // // Recuperar e exibir o nome do usuário
      const savedUser = JSON.parse(localStorage.getItem('user'));
      console.log(`Nome do usuário: ${savedUser.name}`);

      console.log(JSON.parse(localStorage.getItem('users')));
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

        <div className='auth-google'>
          <GoogleOAuthProvider
            clientId="986006489457-ei8s7d93t83ihi31m31363pf8t4pcfm7.apps.googleusercontent.com">
            <span>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login com Google
                  </button>
                )}
              />
              {/* <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse?.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />; */}
            </span> 
          </GoogleOAuthProvider>
        </div>

        <div className='login-signup'>
          <p>Não possui uma conta?</p>
          <NavLink to='/signup' className='signup-link'>Cadastre-se</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login
