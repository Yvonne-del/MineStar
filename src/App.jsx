import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Form from './components/Form'
import LikeFilter from './components/LikeFilter'
import PostList from './components/PostList'


function App() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    fetch("https://minestar.onrender.com/posts")
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(error => console.log("You missed something:" + error))
  }, [])

  function handleAddPost(newPost) {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }
  return (
    <Routes>
        <Route path="/" element={<PostList posts={posts} setPosts={setPosts} />} />
        <Route path="/form" element={<Form onAddPost={handleAddPost} />} />
        <Route path="/liked" element={<LikeFilter />} />
    </Routes>
  )
}

export default App
