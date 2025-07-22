import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from '../assets/vitevuebg.jpeg'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', formData)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      navigate('/dashboard')
    } catch (err) {
      setMessage('Invalid username or password')
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

      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In to ViteVue</h2>

        {message && <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">{message}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-red-500 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
