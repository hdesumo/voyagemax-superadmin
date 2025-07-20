import { useEffect, useState } from 'react';
import API from '../services/axios';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await API.get('/superadmin/companies');
        setCompanies(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des sociétés.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sociétés de transport</h2>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="space-y-3">
          {companies.map((company) => (
            <div key={company.id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p>Email : {company.email}</p>
              <p>Téléphone : {company.phone}</p>
              <p>Statut : {company.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
