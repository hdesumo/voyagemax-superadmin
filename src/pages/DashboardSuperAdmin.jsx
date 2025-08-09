import { useNavigate } from 'react-router-dom';

const DashboardSuperAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('superAdminToken');
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenue sur le Dashboard SuperAdmin</h1>
      <p>Token stocké : {localStorage.getItem('superAdminToken')}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#d33',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        Déconnexion
      </button>
    </div>
  );
};

export default DashboardSuperAdmin;
