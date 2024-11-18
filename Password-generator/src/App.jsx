import { useCallback, useState,useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  
  const passref = useRef(null)

  const generatePass = useCallback (()=>{
    let pass = ''
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1 ; i < length ; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed])

  const copyPassToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
    passref.current?.select()
  }

  useEffect(()=>{
    generatePass()
  },[length,numAllowed,charAllowed])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
     bg-gray-800 text-blue-500' >
      <h1 className='text-white text-center my-3 text-3xl'
      >Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb 4'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3 '
        placeholder='password'
        readOnly
        ref={passref}
        />
        <button 
        onClick={copyPassToClipboard}
        className='outline-none bg-blue-700
         text-white px-3 py-0.5 shrink-0'>Copy</button>

      </div>
      <div
        className='flex text-sm gap-x-3 '
        >
          <div className='flex items-center gap-x-0'>
            <input 
            type="range" 
            min={8}
            max={50}
            value={length}
            onChange={(e)=> setLength(e.target.value)}
            className='cursor-pointer'
            name=''
            id=''
            />
            <label htmlFor="length">Length: {length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked= {numAllowed}
            onChange={()=>{setNumAllowed((prev) =>!prev)}}
            />
            <label htmlFor="number">Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked= {charAllowed}
            onChange={()=>{setCharAllowed((prev) =>!prev)}}
            />
            <label htmlFor="Characters">Charecters</label>

      </div>

        </div>
    </div>
    </>
  )
}

export default App
