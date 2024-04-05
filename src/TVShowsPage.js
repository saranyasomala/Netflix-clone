import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import TVShowModal from './TVShowModal';
import { Navigate } from 'react-router-dom';
import './Movie.css';

const TVShowsPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [dramaShows, setDramaShows] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);
  const [actionAdventureShows, setActionAdventureShows] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false); // New state for modal

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        // Fetch TV shows for Drama genre
        const dramaResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/tv?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=18'
        );
        setDramaShows(dramaResponse.data.results);

        // Fetch TV shows for Comedy genre
        const comedyResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/tv?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=35'
        );
        setComedyShows(comedyResponse.data.results);

        // Fetch TV shows for Action & Adventure genre
        const actionAdventureResponse = await axios.get(
          'https://api.themoviedb.org/3/discover/tv?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=10759'
        );
        setActionAdventureShows(actionAdventureResponse.data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, []);

  const handleLogout = async () => {
    setIsAuthenticated(false);
  };

  const handleShowClick = (show) => {
    setSelectedShow(show); // Set the selected TV show
    setIsShowModalOpen(true); // Open the modal
  };

  if (!isAuthenticated) {
    return <Navigate to="/loginForm" />;
  }

  return (
    <div className="tv-show-page" style={{ backgroundColor: 'black' }}>
      <Navbar
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        handleLogout={handleLogout}
      />
      <div className="tv-shows-row">
        <h2>Drama TV Shows</h2>
        <div className="show-list">
          {dramaShows.map((show) => (
            <div key={show.id} className="show" onClick={() => handleShowClick(show)}>
              <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
              <h3>{show.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="tv-shows-row">
        <h2>Comedy TV Shows</h2>
        <div className="show-list">
          {comedyShows.map((show) => (
            <div key={show.id} className="show" onClick={() => handleShowClick(show)}>
              <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
              <h3>{show.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="tv-shows-row">
        <h2>Action & Adventure TV Shows</h2>
        <div className="show-list">
          {actionAdventureShows.map((show) => (
            <div key={show.id} className="show" onClick={() => handleShowClick(show)}>
              <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
              <h3>{show.name}</h3>
            </div>
          ))}
        </div>
      </div>
      {isShowModalOpen && (
        <TVShowModal // Render TVShowModal conditionally
          isOpen={isShowModalOpen}
          onClose={() => setIsShowModalOpen(false)}
          tvShow={selectedShow}
        />
      )}
    </div>
  );
};

export default TVShowsPage;
