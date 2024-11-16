import React, { useEffect } from 'react';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {


    axios.defaults.withCredentials = true ;

    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
   
  
    
  
   

    const Send = () => {
        axios.post('http://localhost:3001/forgot-password', { email: Email })
         .then((response) => 
            { if (response.data === "Success") {
              navigate('/Login'); // Redirect if login is successful
            }else if (response.data === "User doesn't exist") {
            setErrorMessage("Email not valid"); // Display error message
          } }
        )
        
          .catch(err => {
            console.log("Error occurred:", err);
          
      } )}
  

  
    return (
      
      <div className ='background' >
        <div className='center'>
        <h1>Forgot Password Page</h1>
        Email:<input type="text" onChange={(e) => setEmail(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button  className='LoginButton'onClick={Send}>Send</button>
    
      </div> 
      </div>
    );
}

export default ForgotPassword;