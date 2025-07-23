// src/api/tmdb.js
const API_KEY = '69c4fdf6680fbbdd7240074c612d69cc'

export const fetchTrendingMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export const fetchMovieTrailer = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
  const data = await res.json()
  const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  return trailer?.key
}

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  return await res.json()
}
