import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// 🔐 Redirection automatique HTTP → HTTPS (production)
if (window.location.protocol === 'http:') {
  window.location.href = window.location.href.replace('http:', 'https:');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>e>
);
