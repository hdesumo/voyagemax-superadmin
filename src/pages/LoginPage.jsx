import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login/superadmin`,
        {
          email,
          password,
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion SuperAdmin</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
