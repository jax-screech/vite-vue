import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrendingMovies, fetchMovieTrailer } from '../api/tmdb'
import background from '../assets/vitevuebg.jpeg'

const Landing = () => {
  const [email, setEmail] = useState('')
  const [movies, setMovies] = useState([])
  const [selectedTrailer, setSelectedTrailer] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies()
        setMovies(data.slice(0, 6))
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

  const handleWatchTrailer = async (movieId) => {
    const trailerKey = await fetchMovieTrailer(movieId)
    if (trailerKey) {
      setSelectedTrailer(trailerKey)
      setShowPrompt(true)
    }
  }

  return (
    <div className="relative text-white min-h-screen" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="relative z-10 flex flex-col justify-between min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-red-600">ViteVue</h1>
          <button onClick={() => navigate('/login')} className="bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700">Sign In</button>
        </header>

        {/* Hero Section */}
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
              <div key={movie.id} className="bg-gray-900 rounded overflow-hidden shadow-lg text-white flex flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 flex-1">
                  <h4 className="text-lg font-semibold">{movie.title}</h4>
                  <p className="text-sm mb-3">{movie.overview.slice(0, 100)}...</p>
                  <button
                    onClick={() => handleWatchTrailer(movie.id)}
                    className="bg-red-600 hover:bg-red-700 text-sm px-4 py-2 rounded"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trailer Modal */}
        {selectedTrailer && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-4 rounded-lg w-full max-w-3xl relative">
              <button onClick={() => {
                setSelectedTrailer(null)
                setShowPrompt(false)
              }} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
              <iframe
                className="w-full h-64 md:h-96"
                src={`https://www.youtube.com/embed/${selectedTrailer}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              />
              {showPrompt && (
                <div className="mt-6 bg-gray-800 p-4 rounded text-center">
                  <h3 className="text-xl font-semibold mb-2">Enjoying the trailer?</h3>
                  <p className="mb-4">Sign up or log in to watch the full movie on ViteVue!</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => navigate('/login')} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Log In</button>
                    <button onClick={() => navigate('/register')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Sign Up</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="bg-black py-8 mt-1 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400 text-sm">
          <div>
            <h5 className="text-white font-bold mb-3">ViteVue</h5>
            <p className="mb-2">Your destination for the latest movies and TV shows. Stream anywhere, anytime.</p>
            <div className="flex gap-3 mt-3">
              <a href="#" aria-label="Twitter" className="hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook" className="hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3">Company</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3">Support</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">Help Center</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Account</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3">Legal</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-8">
          &copy; {new Date().getFullYear()} ViteVue. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Landing
