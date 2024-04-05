import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css';

const HeroBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=9808391ae6baef3d4fd2f514b39e478f'
        );
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        const movie = response.data.results[randomIndex];
        setBackgroundImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
        setTitle(movie.title);
        setDescription(movie.overview);
        await fetchVideoKey(movie.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchVideoKey = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=9808391ae6baef3d4fd2f514b39e478f`
      );
      if (response.data.results.length > 0) {
        const key = response.data.results[0].key;
        setVideoKey(key);
      } else {
        console.log('No Video key found');
      }
    } catch (error) {
      console.error('Error fetching video key:', error);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
        {!isPlaying && videoKey && (
          <button className="watch-now-button" onClick={handlePlay}>Watch Now</button>
        )}
      </div>
      {isPlaying && (
        <div className="video-player hero-video-player">
          <button className="close-button" onClick={handleClose}>X</button>
          <iframe
            title="Video Player"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
