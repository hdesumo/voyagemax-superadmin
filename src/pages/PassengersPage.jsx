import { useEffect, useState } from 'react'
import axios from 'axios'

function PassengersPage() {
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPassengers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/passengers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPassengers(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des passagers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPassengers()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des passagers</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Téléphone</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.id}>
                <td className="p-2 border">{passenger.fullname}</td>
                <td className="p-2 border">{passenger.phone}</td>
                <td className="p-2 border">{passenger.status}</td>
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

export default PassengersPage
