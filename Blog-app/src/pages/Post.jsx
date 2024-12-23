/* eslint-disable no-unused-vars */
import React, {useEffect , useState}from 'react'
import { useParams , useNavigate, Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'


function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthour = post && userData ? post.userId === userData.$id : false
  const deletePost = async () => {
    appwriteService.deletePost(post.$id).then((status)=>{
      if(status){
        appwriteService.deleteFile(post.featuredImage);
        navigate('/') 
      }
    })
  } 
  const filePreview = post?.featuredImage
      ? appwriteService.getFilePreview(post.featuredImage) : null;


  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  })

  return post? (
    <div className='py-8'>
        <Container>
          <div className='flex justify-between items-center mb-6'>
            {filePreview && (
              <img src={filePreview}
              alt={post.title}
              className='rounded-xl'
              />
            )}
          </div>
          <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
            <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
            {isAuthour && (
              <div className="absolute right-6 p-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor='bg-green-500 className= mr-3'>Edit</Button>
                  </Link>
                  <Button bgColor='bg-red-500' onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>
          <div className='w-full mb-6'>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
            <div className= "browser-css">
              {parse(post.content)}
            </div>
          </div>
        </Container>
    </div>
) : null
}
export default Post