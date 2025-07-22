import axios from 'axios'

const API_KEY = '69c4fdf6680fbbdd7240074c612d69cc' // replace with your own if needed
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  return res.data.results
}

export const fetchMovieTrailer = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
  const trailers = res.data.results.filter((vid) => vid.type === 'Trailer' && vid.site === 'YouTube')
  return trailers.length > 0 ? trailers[0].key : null
}
