// src/pages/Login.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from '../assets/vitevuebg.jpeg'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState(null)

  const handleGoogleLogin = () => {
  alert('Google login is not implemented yet.')
}


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', formData)
      const { access, user } = res.data

      localStorage.setItem('accessToken', access)
      localStorage.setItem('user', JSON.stringify(user))

      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message)
      setMessage('Invalid credentials. Please try again.')
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) navigate('/dashboard')
  }, [navigate])

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg text-white w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to ViteVue</h2>

        {message && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email ?? ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          >
            Login
          </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-blue-400 hover:bg-blue-700 text-white font-bold rounded"
        >
          Sign in with Google
        </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-300">
          Don’t have an account?{' '}
          <button
            className="text-red-500 hover:underline"
            onClick={() => navigate('/register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
