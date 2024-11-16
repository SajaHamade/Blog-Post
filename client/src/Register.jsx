import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './Navbar'
import './App.css'
import './Login.css'
function Register() { 
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const SignUp = () => {
    axios.post('http://localhost:3001/Register', { Name, Password, Email })
      .then((response) => {
        if (response.data === "User already exists") {
          setErrorMessage("Username already exists"); // Display error message
        } else {
          navigate('/Login'); // Redirect to the success page
        }
      }).catch(err => console.log(err));
  }

  const Login = () => {
    navigate('/Login');
  }

  return (
    <div className="create-post-container">
        <Navbar />
      <div className = "center">
        <label >Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} className='input-field' />
        <br />
        <label >Email:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} className='input-field' />
        <br />
        <label >Password:</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} className='input-field' />
        <br />
        <button  onClick={SignUp}>Sign Up</button>
        {errorMessage && <p >{errorMessage}</p>}
        <br />
        <button onClick={Login}>Login</button>
      </div>
    </div>
  );
}

export default Register;
