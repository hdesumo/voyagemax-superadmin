import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginSuperAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.voyagemax.net/api/auth/superadmin/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('superAdminToken', token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>SuperAdmin Login</h2>
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
            width: '100%',
            padding: 10,
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginSuperAdmin;
