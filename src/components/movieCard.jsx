// src/components/MovieCard.jsx
// IMPORTANT: No longer importing "./MovieCard.css" as per our discussion.

// Add 'onClick' to the props destructuring
export default function MovieCard({ movie, onClick }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/300x450?text=No+Image";

  return (
    <div
      className="movieCard"
      // Re-add the onClick handler
      onClick={() => onClick(movie.imdbID)}
      tabIndex="0" // Make it focusable for accessibility
      role="button" // Indicate it's an interactive element
      aria-label={`View details for ${movie.Title} (${movie.Year})`}
    >
      <div className="posterWrapper">
        <img
          className="poster"
          src={poster}
          alt={`${movie.Title} poster`}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = "https://placehold.co/300x450?text=No+Image";
          }}
        />

        <div className="overlay">
          <h3 className="movieTitle">{movie.Title}</h3>
          <p className="movieYear">
            {movie.Year} • {movie.Type}
          </p>
        </div>
      </div>
    </div>
  );
}