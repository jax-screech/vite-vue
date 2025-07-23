import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchMovieDetails, fetchMovieTrailer } from '../api/tmdb'

const WatchMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)

  useEffect(() => {
    const loadMovie = async () => {
      const details = await fetchMovieDetails(id)
      const trailer = await fetchMovieTrailer(id)
      setMovie(details)
      setTrailerKey(trailer)
    }

    loadMovie()
  }, [id])

  if (!movie) return <p className="text-white">Loading...</p>

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-white hover:text-gray-400 flex items-center"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      {trailerKey ? (
        <iframe
          className="w-full h-[500px] mb-4"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={movie.title}
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p>No trailer available.</p>
      )}
      <p>{movie.overview}</p>
    </div>
  )
}

export default WatchMovie
