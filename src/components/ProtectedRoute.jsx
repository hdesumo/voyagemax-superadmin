import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user?.token) {
    // Rediriger vers la page de login si pas de token
    return <Navigate to="/" replace />;
  }

  // Afficher le composant protégé si l'utilisateur est authentifié
  return children;
};

export default ProtectedRoute;
