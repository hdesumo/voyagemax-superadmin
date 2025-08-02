import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'

import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CompaniesPage from './pages/CompaniesPage'
import DriversPage from './pages/DriversPage'
import PassengersPage from './pages/PassengersPage'
import TripsPage from './pages/TripsPage'
import BookingsPage from './pages/BookingsPage'
import SuperAdminProfilePage from './pages/SuperAdminProfilePage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('superAdminToken')
    setIsAuthenticated(!!token)
  }, [location.pathname])

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen">
      {isAuthenticated && <Sidebar />}

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/passengers" element={<PassengersPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<SuperAdminProfilePage />} />

          {/* Redirige toute URL inconnue vers le dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
