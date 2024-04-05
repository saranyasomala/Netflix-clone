import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase';
import { Link } from 'react-router-dom';
import './App.css';
import Footer from './Footer';

const SignupPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const handleSignup = async (e) => {
       e.preventDefault();
       try {
           await createUserWithEmailAndPassword(auth, email, password);
           console.log('New user accunt created successfully:', email);
           setEmail('');
           setPassword('');
           setError(null);

       } catch (error) {
           setError('Failed to create user account. Please try again later.');
           console.error('Error creating user account: ',error);
       }
   };
   return (
       <div className="login-page">
           <img src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png" alt="Netflix Logo" className="netflix-logo" />
       <div className="login-page">
           <div className="signup-box">
               <center>
                   <form onSubmit = {handleSignup} >
                       <h2 style={{textAlign: 'left',color:'white'}}>Sign Up</h2>
                       <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> <br/>
                       <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                       <button type="submit" className="signup-button">Sign Up</button> <br/>
                       {error && <p> {error}</p>}
                   </form>
                   <p style={{ color: 'white', fontSize: '12px' }}>Already have an account? <Link to="/">Sign in</Link></p>
 
               </center>
           </div>
       </div>
       <Footer />
       </div>
   )
}


export default SignupPage;
