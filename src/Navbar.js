import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import DropdownMenu from './DropdownMenu'; 
import MovieSearch from './MovieSearch';

const Navbar = ({ handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the visibility of MovieSearch
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/Profiles" className="navbar-logo">
          <img src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png" alt="Netflix Logo" />
        </Link>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/tvshows">TV Shows</Link></li>
          <li>
            <div className='dropdown'>
              <span className='dropdown-trigger' onClick={toggleDropdown}> Movies</span>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <DropdownMenu />
                </div>
              )}
            </div>
          </li>
          <li onClick={() => handleScrollToSection('popular-movies')}>
            New-Popular
          </li>
          <li><Link to="/mylist">My List</Link></li>
        </ul>
      </div>
      <div className="navbar-right" style={{ marginLeft: '50px' }}>
      <button onClick={toggleSearch} className="search-button">
  <span role="img" aria-label="Search">🔍</span>
</button>

      {isSearchOpen && <MovieSearch />}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
     
    </nav>
  );
};

export default Navbar;
