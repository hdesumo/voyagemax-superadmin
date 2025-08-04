import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.voyagemax.net/api',
});

// Ajoute automatiquement le token aux requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;;

