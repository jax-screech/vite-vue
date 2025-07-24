// ResetPassword.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from '../assets/vitevuebg.jpeg'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromURL = params.get('token')
    setToken(tokenFromURL)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return setMessage('Missing reset token.')

    try {
      setLoading(true)
      await axios.post('http://127.0.0.1:8000/api/auth/reset-password/', {
        token,
        password
      })
      setMessage('Password reset successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-gray-800 p-6 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

        {message && <div className="mb-4 text-red-400">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            className="w-full p-2 rounded bg-gray-700 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
