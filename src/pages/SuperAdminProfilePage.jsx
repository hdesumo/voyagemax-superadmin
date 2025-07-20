import { useEffect, useState } from 'react'
import axios from 'axios'

function SuperAdminProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const token = localStorage.getItem('superadminToken')

  // Charger le profil au chargement du composant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/superadmin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(response.data)
      } catch (err) {
        setError("Erreur lors du chargement du profil.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [token])

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        '/api/superadmin/update-password',
        { password, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Mot de passe mis à jour avec succès')
      setPassword('')
      setNewPassword('')
    } catch (err) {
      alert('Erreur lors du changement de mot de passe')
    }
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profil SuperAdmin</h2>

      <div className="mb-6">
        <p><strong>Nom :</strong> {profile.fullname}</p>
        <p><strong>Email :</strong> {profile.email}</p>
        <p><strong>Créé le :</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Changer le mot de passe</h3>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="border rounded px-3 py-2 mb-4 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordChange}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default SuperAdminProfilePage
