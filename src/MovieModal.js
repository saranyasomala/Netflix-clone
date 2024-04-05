import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieModal.css';

const MovieModal = ({ isOpen, onClose, movie}) => {
   const [videoKey, setVideoKey] = useState(null);
   const [isPlaying, setIsPlaying] = useState(false);


   useEffect(() => {
       const fetchVideoKey = async () => {
           try {
               const response = await axios.get(
                   `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9808391ae6baef3d4fd2f514b39e478f`
               )
               if (response.data.results.length > 0) {
                   const key = response.data.results[0].key;
                   console.log('Video key:', key);
                   setVideoKey(key);
               } else {
                   console.log('No video key found');
               }
           } catch (error) {
               console.error('Error fetching video key:', error);
           }
       };
  
       if (isOpen && !videoKey) {
           fetchVideoKey();
       }
   }, [isOpen, movie.id, videoKey]);
  
if (!isOpen) return null;


const handlePlay = () => {
   setIsPlaying(true);
};


   return (
       <div className='modal'>
           <div className='modal-content'>
               <button className='close-button' onClick={onClose}>X</button>
               <div className="movie-details">
               <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
               <div className='overlay'>
               <h2>{movie.title}</h2>
               <div className='descrption'>
               <p>{movie.overview}</p>
               </div>
               {!isPlaying && (
                           <button className='play-button' onClick={handlePlay}>Play</button>
                       )}
               </div>
       </div>
       {isPlaying && (
                   <div className="video-player">
                       {/* HTML5 video player or other video player component */}
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
   )
}


export default MovieModal;

