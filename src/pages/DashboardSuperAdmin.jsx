const DashboardSuperAdmin = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenue sur le Dashboard SuperAdmin</h1>
      <p>Token stocké : {localStorage.getItem('token')}</p>
    </div>
  );
};

export default DashboardSuperAdmin;
