import React, { useState } from "react";

export default function LikeButton({ initialLikes, postId, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleClick = () => {
    const newLikeStatus = !isLiked;
    const updatedLikes = newLikeStatus ? likes + 1 : likes - 1;
  
    setIsLiked(newLikeStatus);
    setLikes(updatedLikes);
  
    // Update the likes in db.json
    fetch(`https://minestar.onrender.com/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then(res => res.json())
      .then(updatedPost => {
        if (onLike) {
          onLike(postId, updatedPost.likes); // optional callback
        }
      });
  };
  

  return (
    <div className="likes">
    <button onClick={handleClick} className='like-button' > {isLiked ? "❤️" : "🤍"} </button>
    <p>{likes} likes</p>
    </div>
  );
}