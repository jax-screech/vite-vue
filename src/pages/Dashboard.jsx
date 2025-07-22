import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrendingMovies } from '../api/tmdb'
import background from '../assets/vitevuebg.jpeg'

const Dashboard = () => {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies()
        setMovies(data.slice(0, 12)) // Fetch 12 trending movies
      } catch (err) {
        console.error('Error fetching trending movies:', err)
      }
    }

    getMovies()
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen px-6 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">ViteVue</h1>
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

        <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
