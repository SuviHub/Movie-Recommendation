import { useState, useEffect } from "react";
import MovieCard from "./components/movieCard";
import MovieDetails from "./components/movieDetails";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const popularKeywords = [
    "Avengers",
    "Inception",
    "Batman",
    "Harry Potter",
    "Spider-Man",
    "Fast and Furious",
    "Star Wars",
    "Jurassic Park",
    "Mission Impossible",
    "Transformers",
    "Pirates of the Caribbean",
    "The Lord of the Rings",
    "The Dark Knight",
    "Toy Story",
    "Frozen",
    "The Matrix",
    "Avatar",
    "Titanic",
    "The Godfather",
    "Pulp Fiction",
    "Forrest Gump",
    "The Shawshank Redemption",
    "Gladiator",
    "Interstellar",
    "The Lion King",
    "Theri",
    "Dangal",
    "3 Idiots",
    "Bahubali",
    "KGF",
    "RRR",
    "Avengers Endgame",
    "Black Panther",
    
  ];

  useEffect(() => {
    async function fetchDefaultMovies() {
      if (!API_KEY) return;
      setLoading(true);
      setError(null);
      const keyword =
        popularKeywords[Math.floor(Math.random() * popularKeywords.length)];
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
            keyword
          )}&type=movie`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || "No results found");
        }
      } catch (err) {
        setError("Network error. Check console.");
      } finally {
        setLoading(false);
      }
    }
    fetchDefaultMovies();
    // eslint-disable-next-line
  }, [API_KEY]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    if (!API_KEY) {
      setError("Please set VITE_OMDB_API_KEY in your .env file.");
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);
    setSelectedMovieId(null);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          query
        )}&type=movie`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No results found");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  const openMovieDetails = (imdbID) => {
    setSelectedMovieId(imdbID);
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="app">
      <h1>Your Next Watch...</h1>

      <form onSubmit={handleSearch} className="searchForm">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} onClick={openMovieDetails} />
        ))}
      </div>

      {!loading && !error && movies.length === 0 && (
        <p className="info">Try searching for "Inception", "Avengers", etc.</p>
      )}

      {selectedMovieId && (
        <MovieDetails
          imdbID={selectedMovieId}
          API_KEY={API_KEY}
          onClose={closeMovieDetails}
        />
      )}
    </div>
  );
}
