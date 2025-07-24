import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WatchMovie = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [startedMovies, setStartedMovies] = useState([]);
  const [selectedMovieUrl, setSelectedMovieUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    const query = search.trim() === "" ? "movie" : search;
    setLoading(true);

    fetch(`https://www.omdbapi.com/?apikey=e5c142fb&s=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          let results = data.Search;

          if (genre) {
            const filtered = [];
            const promises = results.map((movie) =>
              fetch(`https://www.omdbapi.com/?apikey=e5c142fb&i=${movie.imdbID}`)
                .then((res) => res.json())
                .then((detail) => {
                  if (detail.Genre && detail.Genre.toLowerCase().includes(genre.toLowerCase())) {
                    filtered.push(movie);
                  }
                })
            );

            Promise.all(promises).then(() => {
              setMovies(filtered);
              setError(filtered.length ? "" : "No movies found for this genre.");
              setLoading(false);
            });
          } else {
            setMovies(results);
            setError("");
            setLoading(false);
          }
        } else {
          setMovies([]);
          setError(data.Error || "No movies found.");
          setLoading(false);
        }
      })
      .catch(() => {
        setMovies([]);
        setError("Failed to fetch movies.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [genre]);

  const handleSearchClick = () => {
    fetchData();
  };

  const handleClearSearch = () => {
    setSearch("");
    setMovies([]);
    setError("");
  };

  const handleMovieClick = (movie) => {
    const dummyStreamUrl = "https://ww4.123moviesfree.net/season/the-flash-season-1-1533/";
    setSelectedMovieUrl(dummyStreamUrl);

    if (!startedMovies.some((m) => m.imdbID === movie.imdbID)) {
      setStartedMovies([...startedMovies, movie]);
    }
  };

  const markAsFinished = (movieId) => {
    setStartedMovies((prev) => prev.filter((m) => m.imdbID !== movieId));
  };

  const handleViewFavorites = () => {
    setMovies(favorites);
    setError("");
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  const closePlayer = () => {
    setSelectedMovieUrl(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <LoggedInNavbar
        genre={genre}
        setGenre={setGenre}
        search={search}
        setSearch={setSearch}
        handleSearchClick={handleSearchClick}
        handleClearSearch={handleClearSearch}
        handleLogout={() => {
          localStorage.clear();
          navigate("/login");
        }}
        handleViewFavorites={handleViewFavorites}
      />

      <div className="flex-1 p-6 mt-20">
        <ContinueWatchingList
          startedMovies={startedMovies}
          handleMovieClick={handleMovieClick}
          markAsFinished={markAsFinished}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={handleMovieClick}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.some((m) => m.imdbID === movie.imdbID)}
                />
              ))}
            </ul>
          </>
        )}
      </div>

      {selectedMovieUrl && (
        <MoviePlayer videoUrl={selectedMovieUrl} onClose={closePlayer} />
      )}
    </div>
  );
};

export default WatchMovie;
