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
        setMovies(data.slice(0, 12))
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

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <img src={logo} alt="ViteVue Logo" className="rounded-full h-10 w-10" />
          <button
            onClick={() => {
              localStorage.clear()
              navigate('/login')
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </header>

        <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-gray-400">Loading movies...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                    {movie.overview}
                  </p>
                  <button
                        onClick={() => navigate(`/watch/${movie.id}`)}
                        className="bg-green-600 px-4 py-2 mt-3 rounded hover:bg-green-700"
                        >
                        Watch Full Movie
                 </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trailer Modal */}
        {trailerKey && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-4 rounded-lg w-full max-w-3xl relative">
              <button
                onClick={handleCloseTrailer}
                className="absolute top-2 right-4 text-white text-2xl"
              >
                &times;
              </button>
              <iframe
                className="w-full h-64 md:h-96"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
