/* eslint-disable no-unused-vars */
import React , {useState , useEffect} from 'react'
import appwriteService from '../appwrite/config'
import PostCard from '../components/PostCard'
import Container from "../components/container/Container"




function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPost([])
        .then((response)=> {
          if (response && response.documents) {
            setPosts(response.documents);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("AllPosts :: useEffect()", error);
          setLoading(false)
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

export default AllPosts