import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './Movie.css'
import Navbar from './Navbar';
import MovieModal from './MovieModal';
import HeroBanner from './HeroBanner';

const HomePage = ({ isAuthenticated, setIsAuthenticated }) => {
 const [isSearchActive, setIsSearchActive] = useState(false);
 const [popularMovies, setPopularMovies] = useState([]);
 const [romComMovies, setRomComMovies] = useState([]);
 const [actionMovies, setActionMovies] = useState([]);
 const [thrillerMovies, setThrillerMovies] = useState([]);
 const [backgroundImage, setBackgroundImage] = useState('');
 const [selectedMovie, setSelectedMovie] = useState(null);


 useEffect(() => {
   const interval = setInterval(() => {
     fetchMoviePoster();
     },5000);


     const fetchMoviePoster = async () => {
       try {
         const response = await axios.get(
           'https://api.themoviedb.org/3/discover/movie?api_key=9808391ae6baef3d4fd2f514b39e478f'
         );
         const randomIndex = Math.floor(Math.random() * response.data.results.length);
         const posterPath = response.data.results[randomIndex].poster_path;
         setBackgroundImage(`https://image.tmdb.org/t/p/original${posterPath}`);
       } catch (error) {
         console.error('Error fetching movie poster:', error);
       }
     };

   const fetchPopularMovies = async () => {
     try {
       const response = await axios.get(
         'https://api.themoviedb.org/3/movie/popular?api_key=9808391ae6baef3d4fd2f514b39e478f'
       );
       setPopularMovies(response.data.results);
     } catch(error) {
       console.error('Error fetching popular movies:',error);
     }
   }


   const fetchRomComMovies = async () => {
     try {
       const response = await axios.get(
         'https://api.themoviedb.org/3/discover/movie?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=35'
       );
       setRomComMovies(response.data.results);
     } catch (error) {
       console.error('Error fetching rom-com movies:', error);
     }
   };


   const fetchActionMovies = async () => {
     try {
       const response = await axios.get(
         'https://api.themoviedb.org/3/discover/movie?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=28'
       );
       setActionMovies(response.data.results);
     } catch (error) {
       console.error('Error fetching action movies:', error);
     }
   }


   const fetchThrillerMovies = async () => {
     try {
       const response = await axios.get(
         'https://api.themoviedb.org/3/discover/movie?api_key=9808391ae6baef3d4fd2f514b39e478f&with_genres=53'
       );
       setThrillerMovies(response.data.results);
     } catch (error) {
       console.error('Error fetching thriller movies:', error);
     }
   };

   fetchPopularMovies();
   fetchRomComMovies();
   fetchActionMovies();
   fetchThrillerMovies();
   fetchMoviePoster();


   return () => clearInterval(interval);
 }, []);


 const backgroundStyle = {
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   width: '100%', 
   height: '50%',
   zIndex: -1,
};

const handleLogout = async () => {
   setIsAuthenticated(false);
 }


 const handleMovieClick = (movie) => {
   setSelectedMovie(movie); 
 };


 const handleCloseModal = () => {
   setSelectedMovie(null); 
 };

 const handleWatchNowClick = (trailerKey) => {
};


 if (!isAuthenticated) {
 return <Navigate to="/loginForm" />;
}


 return(
     <div className='home-page' style={backgroundStyle}  >
        <Navbar
       isSearchActive={isSearchActive}
       setIsSearchActive={setIsSearchActive}
       handleLogout={handleLogout}
       />
       <HeroBanner
        backgroundImage={backgroundImage}
        onWatchNowClick={handleWatchNowClick}
      />
        
         <div id="popular-movies" className='popular-movies'>
           <h2>Popular Movies</h2>
           <div className='movie-list'>
             {popularMovies.map((movie) => (
               <div key={movie.id} className='movie' onClick={() => handleMovieClick(movie)}>
                 <img
                 src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                 alt={movie.title}
               />
               <h3>{movie.title}</h3>
             {/*<p>{movie.overview}</p> */}
             </div>    
             ))}
           </div>
         </div>
         <div  id="rom-com-movies" className="rom-com-movies">
       <h2>Romantic Comedy Movies</h2>
       <div className="movie-list">
         {romComMovies.map((movie) => (
           <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie)}>
             <img
               src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
               alt={movie.title}
             />
             <h3>{movie.title}</h3>
           </div>
         ))}
       </div>
     </div>
         <div id="action-movies" className='action-movies'>
           <h2> Action Movies</h2>
           <div className='movie-list'>
           {actionMovies.map((movie) => (
     <div key={movie.id} className='movie' onClick={() => handleMovieClick(movie)}>
       <img
         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
         alt={movie.title}
       />
       <h3>{movie.title}</h3>
       </div>
       ))}
         </div>
         </div>

       <div id="thriller-movies" className="thriller-movies">
       <h2>Thriller Movies</h2>
       <div className="movie-list">
         {thrillerMovies.map((movie) => (
           <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie)}>
             <img
               src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
               alt={movie.title}
             />
             <h3>{movie.title}</h3>
           </div>
         ))}
       </div>
     </div>
     {selectedMovie && (
     <MovieModal isOpen={true} onClose={handleCloseModal} movie={selectedMovie} />
     )}
   </div>
 
 )
}
export default HomePage;
