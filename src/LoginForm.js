import React, { useState } from 'react';
import {Link, Navigate} from 'react-router-dom' ;
import './App.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Footer from './Footer';

const LoginForm = ({isAuthenticated, setIsAuthenticated}) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);

 const handleSubmit = async(e) => {
  e.preventDefault();
  console.log('Email:', email);
  console.log('Password:', password);
  try{
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully:',email);
    setEmail('');
    setPassword('');
    setError(null);
    setIsAuthenticated(true); 

  } catch (error) {
    setError('Failed to sign in. Please check your crendentials.');
    console.error('Error Signing in:', error)
  }

 }

if(isAuthenticated){
  return <Navigate to="/profiles" />;
}
   
 return (
  <div className="login-page">
          <img src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png" alt="Netflix Logo" className="netflix-logo" />
     <div className="container">
         <div className="login-box">
             <center>
                 <form onSubmit={handleSubmit}>
                     <h2 style={{ textAlign: 'left', color: 'white' }}> Sign In </h2>
                     <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                     <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                     <button type="submit" className="signin-button">Sign In</button> <br></br>
                     <div className="form-row">
                         <div className="checkbox-and-remember">
                             <input type="checkbox" id="rememberMe" name="rememberMe" />
                             <label htmlFor="rememberMe" style={{ color: 'white', fontSize: '8px' }}>Remember me    </label>
                         </div>
                         <div className="need-help">
                             <a href="https://www.netflix.com/in/LoginHelp" style={{ color: 'white', fontSize: '8px' }}>Need Help?</a> <br />
                         </div>
                     </div><br /><br />
                   
                      <p style={{ color: 'white', fontSize: '12px' }}>New to Netflix? <Link to="/signup">Sign up now.</Link></p>
                      <p style={{ color: 'white', fontSize: '8px' }}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="https://www.netflix.com/in/">Learn more</a> </p>
                 </form>
                 {error && <p>{error}</p>}
              
             </center>
         </div>
     </div>
     <Footer />
     </div>
 )
}

export default LoginForm;


