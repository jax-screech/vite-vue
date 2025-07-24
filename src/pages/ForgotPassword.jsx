// src/pages/ForgotPassword.jsx
import { useState } from 'react'
import axios from 'axios'
import background from '../assets/vitevuebg.jpeg'
import logo from '../assets/vitevuue.webp' // Assuming you have a logo image

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/forgot-password/', { email })
      setMessage(res.data.message)
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}>
      <header className="flex justify-between items-center px-6 py-4 w-full absolute top-0">
        <h1
          className="text-3xl font-bold text-red-600 cursor-pointer flex items-center"
          onClick={() => window.location.href = '/'}
        >
          <img src={logo} alt="ViteVue Logo" className="rounded-full h-15 w-13 shadow-lg border-2 border-red-600 mr-2" />
          </h1>
      </header>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-800 mb-4 border border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded text-white font-bold"
        >
          Send Reset Link
        </button>
        <p className="mt-4 text-sm text-gray-400">
          Remembered your password? <a href="/login" className="text-red-500 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword
