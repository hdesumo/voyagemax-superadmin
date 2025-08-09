import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ex: https://api.voyagemax.net/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // ✅ Nécessaire pour gérer CORS + cookies si backend le supporte
});

// Intercepteur pour ajouter le token Authorization si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('superAdminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

