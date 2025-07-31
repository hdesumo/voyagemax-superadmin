// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login-superadmin`,
        { email, password }
      );

      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard'); // Redirige vers la page dashboard après connexion
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion SuperAdmin</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-semibold mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
