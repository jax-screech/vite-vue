import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import background from '../assets/vitevuebg.jpeg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      await axios.post('http://127.0.0.1:8000/api/auth/forgot-password/', {
        email,
      })
      setMessage('This email exists in our database, a password reset link has been sent.')
    } catch (err) {
      setMessage('Sorry we could not find this email in our database.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
        {/* Header with logo on the right */}
      <header className="flex justify-between items-center px-6 py-4 w-full absolute top-0 left-0">
        <div></div>
        <h1
          className="text-3xl font-bold text-red-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ViteVue
        </h1>
      </header>

      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Your Password?</h2>

        {message && (
          <div className="bg-blue-600 text-white p-3 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Remembered your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-red-500 hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
