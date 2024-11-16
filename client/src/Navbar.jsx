import React, { useState, useEffect , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from './App';

function Navbar() {
    
    const navigate = useNavigate();
    axios.defaults.withCredentials = true ;
    const user = useContext(userContext)

    const handlelogout = () => {
      axios.get('http://localhost:3001/logout')
        .then(response => {
          if (response.data==="Success"){
          window.location.href="/"
          }
        
        })
        .catch(err => console.log(err));
    };



    return (
      <div className="navbar">
          <h3>SportsPost</h3>
          <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/Contact">Contact Us</Link></div>
             { user.Name ? 
              <Link to="/CreatePost" >Create Post</Link> :
              <p></p>}

            {
            user.Name ? 
            <div>
                <button onClick={handlelogout} className='register-btn'>Logout</button>  
                

                </div>
          
           :   <div> 
            
            <Link to="/Register" className="register-btn">Login /Sign Up</Link> 

           </div>
            }
      </div>
  );
}

export default Navbar;
