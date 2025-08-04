import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tableau de bord SuperAdmin</h1>
        <p className="text-gray-600">Bienvenue dans l’interface de gestion de VoyageMax.</p>
      </main>
    </div>
  );
};

export default DashboardPagee;
