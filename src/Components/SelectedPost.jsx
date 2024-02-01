// SelectedPost Component (SelectedPost.js)
import React, { useEffect } from "react";
import CloseButton from "./CloseButton";

const SelectedPost = ({
  selectedPost,
  closeOverlay,
  formatLastUpdated,
  Capitalize,
}) => {
  // useEffect hook at the top level
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleEscapeKey);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeOverlay]);

  // Check if selectedPost is null before accessing its properties
  if (!selectedPost) {
    return null;
  }

  selectedPost.genres.sort();

  // Render the component
  return (
    <div className="post-overlay">
      <div className="selected-post">
        <CloseButton closeOverlay={closeOverlay} />
        <img src={selectedPost.imagelink} alt={selectedPost.title} />
        <h2>{selectedPost.title}</h2>
        <p>{selectedPost.description}</p>
        <p>{Capitalize(selectedPost.genres.join(", "))}</p>
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
  );
};

export default SelectedPost;
