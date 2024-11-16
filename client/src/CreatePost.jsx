import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './CreatePost.css'

function CreatePost() {

    const [file, setFile] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const handleUpload = (e) => {
        const formdata = new FormData() //create a set of key-value pairs to represent form fields and their values
        formdata.append('file', file)
        formdata.append('title', title);
        formdata.append('description', description);
        axios.post('http://localhost:3001/upload', formdata)
        .then(res => console.log(res), 
        window.location.href="/")
        .catch(err => console.log(err))
    }

    return (
        <div className="create-post-container">
            <Navbar />
            <div className="create-post-form">
                <input 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])} 
                    className="file-input" 
                />
                <input  
                    type="text" 
                    placeholder="Enter title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="title-input"
                />
                <input  
                    type="text" 
                    placeholder="Description" 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="description-input"
                />
                <button onClick={handleUpload} className="upload-btn">Upload</button>
            </div>
        </div>
    )
}

export default CreatePost
