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
      {/* Netflix-style Footer */}
      <footer className="bg-[#141414] text-[#757575] py-10 px-4 border-t border-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center md:text-left">
            <a href="tel:0800-000-000" className="hover:underline">Questions? Call 0800-000-000</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
            <div>
              <ul>
                <li className="mb-3"><a href="#" className="hover:underline">FAQ</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Investor Relations</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Privacy</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Speed Test</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="mb-3"><a href="#" className="hover:underline">Help Center</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Jobs</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Cookie Preferences</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Legal Notices</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="mb-3"><a href="#" className="hover:underline">Account</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Ways to Watch</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Corporate Information</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Only on ViteVue</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="mb-3"><a href="#" className="hover:underline">Media Center</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Terms of Use</a></li>
                <li className="mb-3"><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mb-6">
            <button className="border border-[#333] px-4 py-2 rounded text-xs bg-transparent hover:bg-[#222]">English</button>
          </div>
          <div className="text-xs text-center md:text-left">
            ViteVue &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
