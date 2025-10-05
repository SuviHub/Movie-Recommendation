// src/components/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import "./MovieInfo.css"; // We'll create this CSS next

export default function MovieDetails({ imdbID, API_KEY, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovieDetails(data);
        } else {
          setError(data.Error || "Could not fetch movie details.");
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Network error fetching details.");
      } finally {
        setLoading(false);
      }
    }

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID, API_KEY]);

  if (loading) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details-content">
          <p>Loading details...</p>
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details-content">
          <p className="error">{error}</p>
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return null; // Or handle a case where details are somehow missing but no error
  }

  return (
    <div className="movie-details-overlay">
      <div className="movie-details-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <div className="details-header">
          <img
            src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/200x300?text=No+Poster"}
            alt={movieDetails.Title}
          />
          <div className="details-info">
            <h2>{movieDetails.Title} ({movieDetails.Year})</h2>
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
            <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}/10</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            {movieDetails.Awards !== "N/A" && <p><strong>Awards:</strong> {movieDetails.Awards}</p>}
            {movieDetails.BoxOffice !== "N/A" && <p><strong>Box Office:</strong> {movieDetails.BoxOffice}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}