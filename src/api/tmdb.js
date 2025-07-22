const API_KEY = '69c4fdf6680fbbdd7240074c612d69cc'
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export const fetchMovieTrailer = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
  const data = await res.json()
  const trailer = data.results.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  )
  return trailer ? trailer.key : null
}

export const fetchMovieDetails = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
  const data = await res.json()
  return data
}
