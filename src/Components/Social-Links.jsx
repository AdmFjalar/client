import React from "react";

const SocialLinks = ({
  imageSources = [
    "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/github-512.png",
    "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/linkedin-square-512.png",
  ],
  hrefValues = [
    "https://github.com/AdmFjalar/",
    "https://linkedin.com/in/olivergronkrans/",
  ],
  socialMediaName = ["Github", "LinkedIn"],
}) => {
  // Check if the length of imageSources and hrefValues is the same
  if (imageSources.length !== hrefValues.length) {
    console.error(
      "The length of imageSources and hrefValues should be the same."
    );
    return null;
  }

  return (
    <ul className="social-links">
      {imageSources.map((imageSrc, index) => (
        <li key={index}>
          <a href={hrefValues[index]} target="_blank" rel="noopener noreferrer">
            <img
              className="social-logo"
              src={imageSrc}
              alt={socialMediaName[index]}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
