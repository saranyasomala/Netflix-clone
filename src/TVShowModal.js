import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TVShowModal.css';

const TVShowModal = ({ isOpen, onClose, tvShow }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchVideoKey = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvShow.id}/videos?api_key=9808391ae6baef3d4fd2f514b39e478f`
        );
        if (response.data.results.length > 0) {
          const key = response.data.results[0].key;
          setVideoKey(key);
        } else {
          console.log('No Video key found');
        }
      } catch (error) {
        console.error("Error fetching video key: ", error);
      }
    };

    if (isOpen && !videoKey) {
      fetchVideoKey();
    }
  }, [isOpen, tvShow.id, videoKey]);
  if(!isOpen) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  
  return (
    <div className="tv-show-modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="tv-show-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="tv-show-details">
          <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.name} />
          <div className="overlay">
            <h2>{tvShow.name}</h2>
            <div className="description">
              <p>{tvShow.overview}</p>
            </div>
            {!isPlaying && (
                           <button className='play-button' onClick={handlePlay}>Play</button>
                       )}
               </div>
        </div>
        {isPlaying && (
          <div className="video-player">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowModal;
