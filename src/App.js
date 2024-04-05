import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Footer from './Footer';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import Profiles from './Profiles';
import TVShowsPage from './TVShowsPage';

const App = () => {
  const[isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth=localStorage.getItem('isAuthenticated');
    if (storedAuth==='true'){
      setIsAuthenticated(true);
      
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
    
 return (
  <Router>
  <div className ="App">
  <Routes>
  <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
  <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
  <Route path="/home" element={<HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} fallbackPath="/login" />} />
  <Route path="/loginForm" element={<LoginForm setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
  <Route path="/profiles" element={<Profiles isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} ></Route>
  <Route path="/tvshows" element={<TVShowsPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
  </Routes>
  </div>
  </Router>
 )
}

export default App;
