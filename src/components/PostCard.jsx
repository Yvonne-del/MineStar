import React from 'react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import EmojiPicker from './EmojiPicker';

const PostCard = ({image, likes, caption, id, setPosts, posts}) => {

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDelete = (postId) => {
    fetch(`https://minestar.onrender.com/${postId}`, {
      method: "DELETE"
    })
    .then(() => {
      setPosts(posts.filter(post => post.id !== postId));
    });
  };
  return (
    <div className='postcard' >
      <div className='profile'>
        <div className='userprofilepic'></div><p>@Username</p>
      </div>
      <img src={image} alt="post image" className='post-image' />
      <div className='caption-area'>
        <div className='captionbuttons'>
        <div className='left-buttons'>
          <LikeButton initialLikes={likes} postId={id} onLike={()=> handleLike(id)} />
          <EmojiPicker postId={id} currentReactions={posts.reactions} />
        </div>
        <DeleteButton onDelete={() => handleDelete(id)}  />
        </div>
        <div className='caption'>
        <p>{caption}</p>
        </div>

      </div>
     
    </div>
  )
}

export default PostCard
