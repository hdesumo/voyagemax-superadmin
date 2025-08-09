import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SuperAdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('superAdminToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/dashboard">VoyageMax</Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg
              className="h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div className={`md:flex md:items-center space-x-6 ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/companies" className="block py-2 text-gray-700 hover:text-blue-600">Sociétés</Link>
          <Link to="/drivers" className="block py-2 text-gray-700 hover:text-blue-600">Chauffeurs</Link>
          <Link to="/passengers" className="block py-2 text-gray-700 hover:text-blue-600">Passagers</Link>
          <Link to="/trips" className="block py-2 text-gray-700 hover:text-blue-600">Trajets</Link>
          <Link to="/bookings" className="block py-2 text-gray-700 hover:text-blue-600">Réservations</Link>
          <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600">Profil</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
