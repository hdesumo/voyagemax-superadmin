import { useEffect, useState } from 'react'
import axios from 'axios'

function DriversPage() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/drivers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDrivers(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des chauffeurs', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des chauffeurs</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Téléphone</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="p-2 border">{driver.fullname}</td>
                <td className="p-2 border">{driver.phone}</td>
                <td className="p-2 border">{driver.status}</td>
                <td className="p-2 border">
                  <button className="text-red-600 hover:underline">Bloquer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DriversPage
