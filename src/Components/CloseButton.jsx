import React from "react";

const CloseButton = ({ closeOverlay }) => {
  return (
    <div className="close-button" onClick={closeOverlay}>
      &#10006;
    </div>
  );
};

export default CloseButton;
