import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
import ForgotPassword from './ForgotPassword';
import './Login.css'



const Login = () => {

axios.defaults.withCredentials = true ;

  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoBack = () => {
    navigate('/Register'); 
  };

  

  const SubmitLogin = () => {

    console.log("the button is clicked")
    axios.post('http://localhost:3001/loginForm', { Password, Email })
     .then((response) => {
    console.log("Received a POST request on /loginForm")    
        if (response.data === "No record existed") {
          setErrorMessage("Email not valid"); // Display error message
        } else if (response.data === "The password is incorrect") {
          setErrorMessage("Incorrect Password");
        } else if (response.data === "Success") {
          window.location.href="/"// Redirect if login is successful
        }
      })
      .catch(err => {
        console.log("Error occurred:", err);
        if (err.response) {
          console.log("Error response data:", err.response.data);
          console.log("Error status:", err.response.status);
        }
      });
  };

  const ForgotPassword = () => {

          navigate('/ForgotPassword'); // Redirect if login is successful
      
  };

  return (
    <div className="create-post-container">
        <Navbar />
  
    <div className='center'>
      <h1>Login Page</h1>
      Email:<input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      Password:<input type="text" onChange={(e) => setPassword(e.target.value)} />
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button  className='LoginButton'onClick={SubmitLogin}>Login</button>
      <button  className='LoginButton'onClick={ForgotPassword}>Forgot Password?</button>
      <button onClick={handleGoBack}>Go Back to Registration</button>
    </div>
    </div>
  );
};

export default Login;
