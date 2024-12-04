import { useState } from 'react'
import './App.css'
import AddTodo from './components/addTodo'
import Todos from './components/todos'

function App() {

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col items-center justify-start text-white" >
      <h1 className='text-7xl color-white m-3'>Todo List</h1>
      <AddTodo/>
      <Todos/>
    </div>
  )
}

export default App
