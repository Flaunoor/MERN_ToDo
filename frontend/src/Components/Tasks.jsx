import React from 'react'
import deleteIcon from '../Media/delete.png' ;
import {useEffect} from 'react';
import {useTodosContext} from '../hooks/useTodosContext';
import {useAuthContext} from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


import './Tasks.scss';
const Tasks = () => {
    const {todos , dispatch} = useTodosContext()
    const {user} = useAuthContext()

    const handleDelete = async(todoID) =>{
        const response = await fetch(`/api/todos/${todoID}`, {
            method: 'DELETE',
            headers:  {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TODO', payload: json})
        }
        if(!response.ok){
            console.log('error handling delete ')
        }
    }
   
    
  useEffect(()=>{
        const fetchTodos = async()=>{
            const response = await fetch('/api/todos',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok){
                dispatch({type: 'SET_TODO' , payload : json})
            }
        }
        if(user){
            fetchTodos()
        }
    },[dispatch, user])

  



  return (
    <div className='app__tasks'>
        <p>Tasks</p>
        <div className='sort-filter-div'>
            <select  className='filter-select'>
            <option value="0">Filter</option>
            <option value='Internal'> All </option>
            <option value="External"> Done </option>
            <option value="External"> Undone </option>
            </select>
            
            <select className='sort-select'>
            <option value="">Sort</option>
            <option value=""> Date </option>
            <option value=""> Priority </option>
            </select>
        </div>
       
        <table className='tasks-table'>
            
            {todos && todos.map((todo)=>(
               
                <tr>
                    <td>
                    <input type="checkbox" />
                    </td>
                    <td>{todo.title}</td>
                    <td><div className='type'>{todo.type}</div></td>
                    <td><div className='priority'>{todo.priority}</div></td>
                    <td>{todo.hours}h</td>
                    <td>{formatDistanceToNow(new Date(todo.createdAt), {addSuffix:true})}</td>
                    <td><button onClick={() => handleDelete(todo._id)}> <img src={deleteIcon} /></button></td>

                    
                </tr>
            ))}
        </table> {}
    </div>
  )
}

export default Tasks