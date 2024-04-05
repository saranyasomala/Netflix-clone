// MovieDetailsPage.js

import React from 'react';

const MovieDetailsPage = ({ movie }) => {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      {/* Add more details here if needed */}
    </div>
  );
};

export default MovieDetailsPage;
