import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import './Post.css'

function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage, setOldImage] = useState(""); // For displaying the old image name or preview
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getPost/${id}`)
      .then((response) => {
        const fetchedPost = response.data;
        setTitle(fetchedPost.title || ""); 
        setDescription(fetchedPost.description || "");
        setOldImage(fetchedPost.image || "");
      })
      .catch((err) => console.log("An error occurred", err));
  }, [id]);

  const handleChanges = () => {
    const formData = new FormData();
    formData.append("title", title); 
    formData.append("description", description); 
    if (newImage) {
      formData.append("file", newImage);
    } else {
      formData.append("file", oldImage);
    }

    axios.put(`http://localhost:3001/editPost/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) =>
      console.log(response.data),
      window.location.href = "/"
    ).catch((err) =>
      console.log("Error uploading file:", err));
  };

  return (
    <div className="post-page-container">
      <Navbar />
      <div className="post-content">
        Title:<input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <br />  <br />
        Description:<input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        {oldImage && (
          <div className="image-preview-container">
            <p>Current Image:</p>
            <img
              src={`http://localhost:3001/Images/${oldImage}`}
              alt="Current Post"
              className="post-image"
            />
            <p>{oldImage}</p>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="file-input"
            />
          </div>
        )}
        <button onClick={handleChanges} className="submit-btn">Update</button>
      </div>
    </div>
  );
}

export default EditPost;
