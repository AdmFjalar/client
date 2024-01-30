import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './Components/About';
import BlogPosts from './Components/BlogPosts';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // useEffect(() => {
  //   // Function to make the API call
  //   const callAPI = async () => {
  //     try {
  //       const response = await fetch("http://localhost:9000/api/posts");
  //       const data = await response.json(); // Assuming the response is in JSON format

  //       // Check if the response is an array and contains expected properties
  //       if (Array.isArray(data) && data.every(post => post.title && post.imagelink)) {
  //         setBlogPosts(data);
  //       } else {
  //         console.warn("Invalid data format received from the API.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Call the API when the component mounts
  //   callAPI();
  // }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // const openOverlay = (post) => {
  //   setSelectedPost(post);
  // };

  // const closeOverlay = () => {
  //   setSelectedPost(null);
  // };

  return (
    <div className="App">
      <Header/>
      <section class="main-section">
        {/* {blogPosts.length === 0 && (
            <strong>No posts found</strong>
          )}

          {blogPosts.length > 0 && (
            <div className="card-container">
              {blogPosts.map((post, index) => (
                <div key={index} className="card" onClick={() => openOverlay(post)}>
                  <h2>{post.title}</h2>
                  <img src={post.imagelink} alt={post.title} />
                </div>
              ))}
            </div>
          )}

          {selectedPost && (
            <div className="overlay" onClick={closeOverlay}>
              <div className="overlay-content">
                <h2>{selectedPost.title}</h2>
                <img src={selectedPost.imagelink} alt={selectedPost.title} />
                <p>{selectedPost.description}</p>
                <a href={selectedPost.githublink} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </div>
            </div>
          )} */}

          <BlogPosts/>
          <About/>
      </section>
      <Footer/>
    </div>
  );
}

export default App;