import React, { useEffect } from 'react';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';
import Navbar from './Navbar'


const ResetPassword = () => {


    axios.defaults.withCredentials = true ;

    const navigate = useNavigate();
    const {id , token} = useParams();
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
   
  
    
  
   

    const Send = () => {
        axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password: password })
         .then((response) => 
            
            { console.log(response)
                if (response.data === "Success") {
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
      <Navbar />
        <div className='center'>
        <h1>Reset Password Page</h1>
        New Password:<input type="text" onChange={(e) => setpassword(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button  className='LoginButton'onClick={Send}>Send</button>
    
      </div> 
      </div>
    );
}

export default ResetPassword;