import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios"

import './App.css'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Post from './Post'
import { createContext } from "react"
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import Contact from './Contact';


export const userContext = createContext()

function MyStart() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getPosts')
    .then(res => setPosts(res.data)) // Set all images
    .catch(err => console.log(err));
}, []);

  return (
    <div className="my-start-container">
      <Navbar />
      <div className="posts-container">
        {posts.map((post, index) => (
          <Link to={`/Post/${post._id}`} key={index} className="post-link">
            <div className="post-card">
              <img src={`http://localhost:3001/Images/${post.image}`} alt={post.title} className="post-image" />
              <h3 className="post-title">{post.title}</h3>
              
            </div>
          </Link> 
        ))}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true ;
  
  useEffect(() => {
    axios.get('http://localhost:3001/home') 
    .then(user => {
      setUser(user.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <userContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<MyStart />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/Post/:id" element={<Post />} />
        <Route path="/EditPost/:id" element={<EditPost />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App
