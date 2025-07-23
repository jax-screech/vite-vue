import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrendingMovies, fetchMovieTrailer } from '../api/tmdb'
import background from '../assets/vitevuebg.jpeg'
import logo from '../assets/vitevuue.webp'

const Dashboard = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [trailerKey, setTrailerKey] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies()
        setMovies(data)
      } catch (err) {
        console.error('Error fetching trending movies:', err)
      } finally {
        setLoading(false)
      }
    }

    getMovies()
  }, [])

  const handleWatchTrailer = async (movieId) => {
    try {
      const key = await fetchMovieTrailer(movieId)
      setTrailerKey(key)
    } catch (err) {
      console.error('Failed to load trailer:', err)
    }
  }

  const handleCloseTrailer = () => setTrailerKey(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMovies(movies)
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, movies])

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black bg-opacity-90 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-gradient-to-b from-black/90 to-transparent">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="ViteVue Logo" className="rounded h-10 w-10 shadow-lg border-2 border-red-600" />
            <span className="text-3xl font-black tracking-tight text-white drop-shadow-lg">ViteVue</span>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center text-base text-gray-200 hover:text-red-500 transition"
            >
              <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
              className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded font-bold shadow-lg transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="px-10 pt-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Loader or Movie Grid */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-2xl text-gray-400">Loading movies...</div>
        ) : (
          <div className="flex-1 px-10 py-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Trending Now</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {(filteredMovies.length ? filteredMovies : []).map((movie) => (
                <div
                  key={movie.id}
                  className="group bg-gray-900/80 rounded-lg shadow-lg overflow-hidden relative hover:scale-105 hover:z-10 transition-transform duration-300"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-56 object-cover group-hover:opacity-70 transition"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/90 to-transparent p-4 transition">
                    <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/watch/${movie.id}`)}
                        className="bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
                      >
                        ▶ Play
                      </button>
                      <button
                        onClick={() => handleWatchTrailer(movie.id)}
                        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Trailer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!filteredMovies.length && (
                <div className="col-span-full text-center text-gray-400 text-lg py-10">
                  No movies found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded-lg w-full max-w-3xl relative shadow-2xl">
            <button
              onClick={handleCloseTrailer}
              className="absolute top-2 right-4 text-white text-3xl hover:text-red-500"
            >
              &times;
            </button>
            <iframe
              className="w-full h-64 md:h-96 rounded"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
