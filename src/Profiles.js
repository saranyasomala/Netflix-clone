import React from 'react';
import { Navigate } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';

const profiles = [
   { image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117', name: 'Profile 1'},
   { image: 'https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg', name: 'Profile 2' },
   { image: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg', name: 'Profile 3'},
   { image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png', name: 'profile 4'},
   { image: 'https://pbs.twimg.com/media/FbVymwQWQAI9VwR?format=jpg&name=360x360', name: 'Kids' }
];

const Profiles = ({isAuthenticated, setIsAuthenticated}) => {

    if (!isAuthenticated) {
        return <Navigate to="/loginForm" />;
       }
       
    return (
        <div className="profile-container">
            <img src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png" alt="Netflix Logo" className="netflix-logo" />
            <h1 className="profile-title"> Who's watching ?</h1>
            <div className="profile-boxes-container">
                {profiles.map((profile, index) => (
                    <Link to="/home" key={index}>
                    <div className="profile-box" key={index}>
                    <img src={profile.image} alt={profile.name} />
                    <p className="profile-name">{profile.name}</p>
                    </div>
                    </Link>
                ))}
            </div>
        <button className= "manage-profiles"> Manage Profiles</button>
        </div>
    )
}

export default Profiles;