import { useEffect, useState } from 'react'
import axios from 'axios'

function TripsPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/trips', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTrips(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des trajets', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des trajets</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Départ</th>
              <th className="p-2 border">Arrivée</th>
              <th className="p-2 border">Heure</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Prix</th>
              <th className="p-2 border">Véhicule</th>
              <th className="p-2 border">Statut</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td className="p-2 border">{trip.departure_city}</td>
                <td className="p-2 border">{trip.arrival_city}</td>
                <td className="p-2 border">{trip.departure_time}</td>
                <td className="p-2 border">{trip.departure_date}</td>
                <td className="p-2 border">{trip.price} FCFA</td>
                <td className="p-2 border">{trip.vehicle_id}</td>
                <td className="p-2 border">{trip.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TripsPage
