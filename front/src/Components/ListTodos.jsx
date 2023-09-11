import axios from 'axios'
import { useState, useEffect } from 'react'

const apiURL = "http://localhost:5000/api/todos";

function ListTodos(){

    const [todos,setTodos]  = useState([])

    useEffect(()=>{
            async function getData(){
                const res = await axios.get(apiURL)
                setTodos(res.data)
            }
            getData()
    },[todos])

    const removeTodo = (id)=>{
        axios.delete(`${apiURL}/${id}`)
    }
    
    return (
    <>
        {todos.map((todo) => (
                <div key={todo.id}>
                    <h5>{todo.title}</h5>
                    {todo.description}
                    <button type='submit' onClick={()=>removeTodo(todo.id)}> Delete </button>
                    <hr/>
                </div>
            ))}
    </>
)}

export default ListTodos