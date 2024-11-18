import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('grey')

  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className=' flex flexwrap justify-center gap3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          <button  style={{backgroundColor: 'red'}} onClick = {()=> setColor('red')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Red</button>
          <button  style={{backgroundColor: 'green'}} onClick = {()=> setColor('green')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Green</button>
          <button  style={{backgroundColor: 'blue'}} onClick = {()=> setColor('blue')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Blue</button>
          <button  style={{backgroundColor: 'orange'}} onClick = {()=> setColor('orange')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Orange</button>
          <button  style={{backgroundColor: 'violet'}} onClick = {()=> setColor('violet')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Violet</button>
          <button  style={{backgroundColor: 'yellow'}} onClick = {()=> setColor('yellow')} className='outline-none px-4 py-1 rounded-full  shadow-lg text-black'>Yellow</button>
        </div>
      </div>
    </div>
  )
}

export default App