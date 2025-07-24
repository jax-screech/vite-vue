import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import background from '../assets/vitevuebg.jpeg'
import logo from '../assets/vitevuue.webp' // Assuming you have a logo image

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const initialEmail = location.state?.email || ''

  const [formData, setFormData] = useState({
    username: '',
    email: initialEmail,
    password: '',
    password2: '',
  })

  const [message, setMessage] = useState(null)

  const handleGoogleLogin = () => {
  alert('Google login is not implemented yet.')
}

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.password2) {
      setMessage('Passwords do not match.')
      return
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      navigate('/login')
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat()[0] ||
        'Registration failed.'
      setMessage(errorMsg)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header with logo on the left */}
      <header className="flex justify-between items-center px-6 py-4 w-full absolute top-0 left-0">
        <h1
          className="text-3xl font-bold text-red-600 cursor-pointer flex items-center"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="" className="rounded-full h-15 w-13 shadow-lg border-2 border-red-600 mr-2"/>
        </h1>
        <div></div>
      </header>

      <div className="bg-black bg-opacity-80 p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>

        {message && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-900 text-white font-semibold rounded"
          >
            Sign Up
          </button>
          <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
          Create an account with Google
        </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{' '}
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

export default Register
