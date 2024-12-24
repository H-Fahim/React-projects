/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import appwriteService from '../appwrite/config'



function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    appwriteService.getPosts()
      .then((response)=> {
        if (response && response.documents) {
          setPosts(response.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Home :: useEffect() :: getPosts()", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>; 
  

  if (posts.length === 0) {
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            <h1> Login to see Posts </h1>
        </div>
      </Container>
   </div>
  }
  return (
    <div className='w-full py-8'>
    <Container>
      <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div className='p-2 w-1/4' key={post.$id}>
              <PostCard {...post}  /> 
            </div>))}
      </div>
    </Container>

 </div>
  )
}

export default Home