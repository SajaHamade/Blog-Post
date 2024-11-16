import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userContext } from './App';
import Navbar from './Navbar';

import './Post.css'

function Post() {
  const user = useContext(userContext)
  const {id} = useParams();
  
  const [file, setFile] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {
    axios.get(`http://localhost:3001/getPost/${id}`)
      .then(
        (post) => {
          setFile(post.data.image);
          setTitle(post.data.title);
          setDescription(post.data.description)
        }
      ).catch(
        err => console.log("an error occurred", err)
      ) 
  }, [id])

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/DeletePost/${id}`).then(
      res => console.log(res), 
      window.location.href="/"
    ).catch(err => console.log(err))
  }

  return (
    <div className="post-page-container">
      <Navbar />
      <div className="post-content">
        <img src={`http://localhost:3001/Images/${file}`} alt="Post" className="post-image" />
        <h3 className="post-title">{title}</h3>
        <p className="post-description">{description}</p>
      
        {user.Name && (
          <div className="post-actions">
            <button onClick={handleDelete} className="delete-btn">Delete</button>
            <Link to={`/EditPost/${id}`} className="edit-link">Edit</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post
