import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/home.jsx'
import About from './components/About/about.jsx'
import User from './components/User/user.jsx'
import Github ,   {githubInfoLoader} from './components/Github/github.jsx';
import Contact from './components/Contact/contact.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element ={<Layout/>}>
    <Route path='' element= {<Home/>}></Route>
    <Route path='about' element= {<About/>}></Route>
    <Route path='user/' element = {<User/>}>
      <Route path = ":userid"></Route>
    </Route>
    <Route loader = {githubInfoLoader} path='github' element={<Github/>}></Route>
    <Route path='contact' element= {<Contact/>}></Route>




    <Route path='*' element={<div className='text-center text-5xl py-10'>NOt Found</div>}></Route>
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
