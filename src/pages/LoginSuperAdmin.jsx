import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSuperAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://api.voyagemax.net/api/auth/superadmin/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: 20,
      border: '1px solid #ccc',
      borderRadius: 8
    }}>
      <h2>Connexion SuperAdmin</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 5 }}
        />
        <label style={{ marginTop: 15 }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 5 }}
        />
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: 10,
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginSuperAdmin;
