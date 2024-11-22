import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function github() {
    const data = useLoaderData()



    // const [data, setData] = useState([])
    // useEffect(()=> {
    //     fetch("https://api.github.com/users/H-Fahim")
    //     .then((response)=> response.json())
    //     .then(data=> {
    //         console.log(data)
    //         setData(data)
    //     })

    // },[])

  return (
    <div className='text-center m-5 bg-gray-400 py-5 text-5xl'>Github <br />
    Followers: {data.followers} <br />
    Name : {data.name}  <br />
    <img src={data.avater_url} width={300} alt="" />
    </div>
  )
}

export default github

export const githubInfoLoader = async ()=>{
    const response = await fetch("https://api.github.com/users/H-Fahim")
    return response.json()
}