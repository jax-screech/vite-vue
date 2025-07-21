import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrendingMovies } from '../api/tmdb'
import background from '../assets/vitevuebg.jpeg'

const Landing = () => {
  const [email, setEmail] = useState('')
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies()
        setMovies(data.slice(0, 6)) // Display only 6 trending movies
      } catch (err) {
        console.error('Failed to fetch movies:', err)
      }
    }
    getMovies()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/register', { state: { email } })
  }

  return (
    <div className="relative h-screen text-white" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="relative z-10 h-full flex flex-col justify-between">

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-red-600">ViteVue</h1>
          <button onClick={() => navigate('/login')} className="bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700">Sign In</button>
        </header>

        {/* Hero */}
        <main className="text-center max-w-2xl mx-auto px-4 mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Unlimited movies, TV shows, and more</h2>
          <p className="text-xl md:text-2xl mb-6">Watch anywhere. Cancel anytime.</p>
          <p className="mb-4 text-lg">Ready to watch? Enter your email to create or restart your membership.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center items-center" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email address" className="p-3 w-full sm:w-[70%] rounded text-black bg-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg rounded font-semibold">Get Started</button>
          </form>
        </main>

        {/* Trending Section */}
        <section className="bg-black p-6 mt-10">
          <h3 className="text-2xl font-bold mb-4 text-center">Trending Movies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {movies.map(movie => (
              <div key={movie.id} className="bg-gray-900 rounded overflow-hidden shadow-lg text-white">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-lg font-semibold">{movie.title}</h4>
                  <p className="text-sm">{movie.overview.slice(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Landing
