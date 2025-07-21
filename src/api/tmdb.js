import axios from 'axios'

const API_KEY = '69c4fdf6680fbbdd7240074c612d69cc'
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY }
  })
  return res.data.results
}
