import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';

import LoginSuperAdmin from './pages/LoginSuperAdmin';
import DashboardSuperAdmin from './pages/DashboardSuperAdmin';
import CompaniesPage from './pages/CompaniesPage';
import DriversPage from './pages/DriversPage';
import PassengersPage from './pages/PassengersPage';
import TripsPage from './pages/TripsPage';
import BookingsPage from './pages/BookingsPage';
import SuperAdminProfilePage from './pages/SuperAdminProfilePage';

console.log("🚀 Composant LoginSuperAdmin affiché !");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('superAdminToken');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const showSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <Routes>
          {/* Route login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginSuperAdmin />
            }
          />

          {/* Routes protégées */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardSuperAdmin /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/companies"
            element={
              isAuthenticated ? <CompaniesPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/drivers"
            element={
              isAuthenticated ? <DriversPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/passengers"
            element={
              isAuthenticated ? <PassengersPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/trips"
            element={
              isAuthenticated ? <TripsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/bookings"
            element={
              isAuthenticated ? <BookingsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <SuperAdminProfilePage /> : <Navigate to="/login" />
            }
          />

          {/* Redirections selon état de connexion */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
