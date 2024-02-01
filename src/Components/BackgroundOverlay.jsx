import React from "react";

const BackgroundOverlay = ({ selectedPost, closeOverlay }) => {
  return (
    selectedPost && (
      <div className="background-overlay" onClick={closeOverlay}></div>
    )
  );
};

export default BackgroundOverlay;
