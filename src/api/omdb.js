const API_KEY = 'fa9e566a'
const BASE_URL = 'https://www.omdbapi.com/'

// Fetch trending movies — here we use a common search like "Avengers"
export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=avengers`)
  const data = await res.json()
  if (data.Response === 'True') {
    return data.Search
  } else {
    return []
  }
}

// Search movies by a keyword
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
  const data = await res.json()
  if (data.Response === 'True') {
    return data.Search
  } else {
    return []
  }
}

// Fetch details of a single movie by IMDb ID
export const fetchMovieDetails = async (imdbID) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)
  const data = await res.json()
  if (data.Response === 'True') {
    return data
  } else {
    return null
  }
}
