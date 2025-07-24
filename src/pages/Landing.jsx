import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background from '../assets/vitevuebg.jpeg'
import logo from '../assets/vitevuue.webp'
import { fetchTrendingMovies } from '../api/omdb'


const Landing = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingLikeMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=fa9e566a&s=avengers&type=movie`
        )
        const data = await res.json()
        if (data.Response === 'True') {
          setMovies(data.Search)
        } else {
          setMovies([])
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingLikeMovies()
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 60%, rgba(20,20,20,0.3) 100%), url(${background})`,
      }}
    >
      {/* Netflix-style header */}
      <header className="flex justify-between items-center px-12 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="ViteVue Logo"
            className="h-10 w-10 rounded-full shadow-lg border-2 border-red-600"
          />
          <span className="text-4xl font-black tracking-tight text-red-600">ViteVue</span>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold text-white shadow"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Netflix-style hero section */}
      <section className="flex flex-col items-start justify-center px-12 py-24 min-h-[40vh] max-w-5xl mx-auto w-full">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Watch anywhere. Cancel anytime.</h2>
        <p className="text-lg mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-8 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500 flex-1 min-w-[300px] w-full sm:w-2/3"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/register')
              }
            }}
          />
          <button
            onClick={() => navigate('/register')}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded text-xl font-bold text-white shadow"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Trending Movies */}
      <main className="px-12 py-10">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-red-600"
              >
                {movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-sm">
                    No Image
                  </div>
                )}
                <div className="p-3">
                  <h3 className="text-base font-semibold truncate">{movie.Title}</h3>
                  <p className="text-sm text-gray-400">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-12 py-8 text-gray-400 text-sm bg-black/80 mt-12">
        <div>Questions? Contact us.</div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <span>FAQ</span>
          <span>Help Center</span>
          <span>Terms of Use</span>
          <span>Privacy</span>
        </div>
        <div className="mt-6">&copy; {new Date().getFullYear()} ViteVue</div>
      </footer>
    </div>
  )
}

export default Landing
