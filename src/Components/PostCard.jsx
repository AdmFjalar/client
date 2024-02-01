// PostCard Component (PostCard.js)
import React from "react";

const PostCard = ({
  post,
  handleCardClick,
  selectedPost,
  truncateDescription,
  formatLastUpdated,
  Capitalize,
}) => {
  post.genres.sort();

  return (
    <div
      key={post._id}
      onClick={() => handleCardClick(post)}
      className={`post-card ${selectedPost === post ? "selected" : ""}`}
    >
      <img src={post.imagelink} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{truncateDescription(post.description)}</p>
      <p>{Capitalize(post.genres.join(", "))}</p>
      <p>{formatLastUpdated(post.lastupdated)}</p>
    </div>
  );
};

export default PostCard;
