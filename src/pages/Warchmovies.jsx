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
