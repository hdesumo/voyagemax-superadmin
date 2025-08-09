import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import SuperAdminNavbar from './components/SuperAdminNavbar';
import Sidebar from './components/Sidebar';

import LoginSuperAdmin from './pages/LoginSuperAdmin';
import DashboardSuperAdmin from './pages/DashboardSuperAdmin';
import CompaniesPage from './pages/CompaniesPage';
import DriversPage from './pages/DriversPage';
import PassengersPage from './pages/PassengersPage';
import TripsPage from './pages/TripsPage';
import BookingsPage from './pages/BookingsPage';
import SuperAdminProfilePage from './pages/SuperAdminProfilePage';

function Protected({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('superAdminToken');
    setIsAuthenticated(Boolean(token));
  }, [location.pathname]);

  const showChrome = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {showChrome && <SuperAdminNavbar />}

      <div className="flex flex-1">
        {showChrome && (
          <aside className="w-64 shrink-0">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Routes>
            {/* Public */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginSuperAdmin />
              }
            />

            {/* Protégé */}
            <Route
              path="/dashboard"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <DashboardSuperAdmin />
                </Protected>
              }
            />
            <Route
              path="/companies"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <CompaniesPage />
                </Protected>
              }
            />
            <Route
              path="/drivers"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <DriversPage />
                </Protected>
              }
            />
            <Route
              path="/passengers"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <PassengersPage />
                </Protected>
              }
            />
            <Route
              path="/trips"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <TripsPage />
                </Protected>
              }
            />
            <Route
              path="/bookings"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <BookingsPage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <SuperAdminProfilePage />
                </Protected>
              }
            />

            {/* Racine + 404 */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="*"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
