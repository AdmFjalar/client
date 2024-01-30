// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

// Define the BlogPosts component
const BlogPosts = () => {
  // Initialize state variables for the posts and the selected post
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Use the useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/posts")
      .then((response) => {
        // Set the posts state variable to the data received from the API
        setPosts(response.data);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Function to handle when a card is clicked
  const handleCardClick = (post) => {
    // Set the selected post state variable to the post that was clicked
    document.body.style.overflow = "hidden";
    setSelectedPost(post);
  };

  // Function to handle closing the overlay
  const closeOverlay = () => {
    // Clear the selected post state variable
    document.body.style.overflow = "auto";
    setSelectedPost(null);
  };

  // Function to truncate the description to a maximum of 150 characters
  const truncateDescription = (description) => {
    const maxLength = 150;
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  // Function to format the last updated timestamp
  const formatLastUpdated = (timestamp) => {
    const lastUpdated = moment(timestamp);
    const daysAgo = moment().diff(lastUpdated, "days");
    if (daysAgo < 365) {
      return `${daysAgo} days ago`;
    } else {
      const yearsAgo = Math.floor(daysAgo / 365);
      return `${yearsAgo} years ago`;
    }
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Return the JSX to render
  return (
    <div className="post-cards">
      {/* Map over the posts array to create a card for each post */}
      {posts.reverse().map((post) => (
        <div
          key={post._id}
          onClick={() => handleCardClick(post)}
          className={`post-card ${selectedPost === post ? "selected" : ""}`}
        >
          <img src={post.imagelink} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{truncateDescription(post.description)}</p>
          <p>
            <i>{Capitalize(post.genres.join(", "))}</i>
          </p>
          <p>{formatLastUpdated(post.lastupdated)}</p>
        </div>
      ))}

      {selectedPost && (
        <div className="background-overlay" onClick={closeOverlay}></div>
      )}

      {selectedPost && (
        <div className="post-overlay">
          <div className="selected-post">
            <div className="close-button" onClick={closeOverlay}>
              &#10006; {/* Unicode character for a cross */}
            </div>
            <img src={selectedPost.imagelink} alt={selectedPost.title} />
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.description}</p>
            <p className="selected-post-genres">
              <i>{Capitalize(selectedPost.genres.join(", "))}</i>
            </p>
            <ul>
              <li>
                <a href={selectedPost.githublink}>View on GitHub</a>
              </li>
              <li>
                <p>{formatLastUpdated(selectedPost.lastupdated)}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the BlogPosts component
export default BlogPosts;
