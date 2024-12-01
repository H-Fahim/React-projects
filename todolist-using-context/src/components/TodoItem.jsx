import React, { useState } from 'react'
import { useTodo } from '../context'

function TodoItem({todo}) {
    const [isToDoEditable, setIsToDoEditable] =useState(false)

    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodo =  () =>{
        updateTodo(todo.id , {...todo, todo: todoMsg})
        setIsToDoEditable(false)
    }
    const toggle = ()=>{
        toggleComplete(todo.id)
    }

  return (
    <div     className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#9698ff]"}`}
    >
     <input type="checkbox"
        className='cursor-pointer'
        checked= {todo.completed}
        onChange={toggle}
     />
     <input type="text"
         className={`border outline-none w-full bg-transparent rounded-lg ${isToDoEditable ? "border-black/10 px-2" : "border-transparent"}`}
         value={todoMsg}
         onChange={(e)=> setTodoMsg(e.target.value)}
         readOnly= {!isToDoEditable}
          />
          <button
           className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
           onClick={() => {
             if (todo.completed)return
             if (isToDoEditable){
                editTodo()
            } else setIsToDoEditable ((prev) => !prev)
            }}
            disabled = {todo.completed}
          > {isToDoEditable ? "📁": "✏️"} </button>
          <button
           className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
           onClick={() => deleteTodo(todo.id)}
          >❌</button>
     
     </div>
  )
}

export default TodoItem