import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=9808391ae6baef3d4fd2f514b39e478f&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching for movies and TV shows:', error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleClearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className="movie-search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies and TV shows..."
        />
        <button onClick={handleSearch}><span role="img" aria-label="search">🔍</span></button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results-container">
          <div className="clear-results">
            <button onClick={handleClearResults}>Clear Results</button>
          </div>
          <div className="search-results">
            {searchResults.map((item) => (
              <div key={item.id} onClick={() => handleItemClick(item)} className="search-result-item">
                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
                <p>{item.title || item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="selected-item">
          <h2>{selectedItem.title || selectedItem.name}</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedItem.video_key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
