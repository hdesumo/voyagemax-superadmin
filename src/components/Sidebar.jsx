import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const logout = () => {
    localStorage.removeItem('superAdminToken')
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white shadow-md h-full fixed top-0 left-0 z-10">
      <div className="p-6 text-center border-b">
        <h2 className="text-xl font-bold text-blue-600">VoyageMax</h2>
        <p className="text-gray-500 text-sm mt-1">Super Admin</p>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => navigate('/dashboard')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/dashboard') && 'bg-blue-200 font-semibold'}`}
        >
          📊 Tableau de bord
        </button>

        <button
          onClick={() => navigate('/companies')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/companies') && 'bg-blue-200 font-semibold'}`}
        >
          🏢 Sociétés
        </button>

        <button
          onClick={() => navigate('/drivers')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/drivers') && 'bg-blue-200 font-semibold'}`}
        >
          🚗 Chauffeurs
        </button>

        <button
          onClick={() => navigate('/passengers')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/passengers') && 'bg-blue-200 font-semibold'}`}
        >
          👤 Passagers
        </button>

        <button
          onClick={() => navigate('/trips')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/trips') && 'bg-blue-200 font-semibold'}`}
        >
          🚌 Trajets
        </button>

        <button
          onClick={() => navigate('/bookings')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/bookings') && 'bg-blue-200 font-semibold'}`}
        >
          🎫 Réservations
        </button>

        <hr className="my-4" />

        <button
          onClick={() => navigate('/profile')}
          className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${isActive('/profile') && 'bg-blue-200 font-semibold'}`}
        >
          🙍‍♂️ Mon profil
        </button>

        <button
          onClick={logout}
          className="block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
        >
          🔒 Déconnexion
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
