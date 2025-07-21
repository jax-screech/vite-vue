import { useEffect, useState } from 'react'
import axios from 'axios'

function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('access')
        const res = await axios.get('http://127.0.0.1:8000/api/movies/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setMovies(res.data)
      } catch (err) {
        console.error('Failed to fetch movies', err.response?.data)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div>
      <h1>Recommended Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Movies