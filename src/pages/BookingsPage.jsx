import { useEffect, useState } from 'react'
import axios from 'axios'

function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBookings(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des réservations', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des réservations</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Passager</th>
              <th className="p-2 border">Téléphone</th>
              <th className="p-2 border">Trajet</th>
              <th className="p-2 border">Date réservation</th>
              <th className="p-2 border">Statut</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-2 border">{booking.passenger_fullname}</td>
                <td className="p-2 border">{booking.passenger_phone}</td>
                <td className="p-2 border">
                  {booking.departure_city} → {booking.arrival_city}
                </td>
                <td className="p-2 border">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BookingsPage
