import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour y accéder
export const useAuth = () => useContext(AuthContext);

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);        // infos SuperAdmin
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Vérifier le token existant
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const response = await axios.get('https://api.voyagemax.net/api/superadmin/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (err) {
          console.error('Token invalide ou expiré:', err.message);
          // Ne pas faire logout automatiquement si c'est juste un problème de réseau
          if (err.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [token]);

  // Connexion SuperAdmin
  const login = async (email, password) => {
    try {
      const response = await axios.post('https://api.voyagemax.net/api/superadmin/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);

      const profile = await axios.get('https://api.voyagemax.net/api/superadmin/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(profile.data);
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Identifiants incorrects ou serveur injoignable.');
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
