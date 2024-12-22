/* eslint-disable no-unused-vars */
import React, {useState}from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useEffect } from 'react'
import Container from '../components/Container'
import PostForm from '../components/Post-Form/PostForm'



function EditPost() {
  const [post, setPost] = useState()
  const navigate = useNavigate()
  const {slug} = useParams()

  useEffect(() => {
    slug? appwriteService.getPost(slug)
     .then((post)=>{ post? setPost(post) 
       : navigate('/')}) 
     : navigate('/')
  }, [slug, navigate])


  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost