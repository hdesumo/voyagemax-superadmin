import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/superadmin/login', { email, password })
      const token = response.data.token
      localStorage.setItem('superadminToken', token)
      navigate('/dashboard')
    } catch (err) {
      setError('Connexion refusée. Vérifiez vos identifiants.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-purple-700 uppercase">
            Connexion SuperAdmin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Accès réservé au gestionnaire principal de la plateforme
          </p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            placeholder="superadmin@voyagemax.net"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded w-full hover:bg-purple-700"
        >
          Connexion
        </button>
      </form>
    </div>
  )
}

export default LoginPage
