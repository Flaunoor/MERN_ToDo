import React from 'react'
import { useState } from 'react';
import calender from '../Media/calendar.png'
import addIcon from '../Media/add.png';
import {useTodosContext} from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';
import "./TodoForm.scss"

const Todo_Form = () => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [title,setTitle] = useState('');
  const [type,setType] = useState('');
  const [priority,setPriority] = useState('');
  const [hours,setHours] = useState('');
  const [error,setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async(e) =>{
    e.preventDefault();


    if(!user){
      setError('You must be logged in')
      return
    }
    const todo  = {title, type , priority, hours}

    const response = await fetch('/api/todos',
    {
      method: 'POST',
      body:JSON.stringify(todo),
      headers:{
        'Content-type' : 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields);
    }
    if(response.ok){
      setError(null);
      console.log('new todo added')
      setTitle('');
      setHours('');
      setPriority('Priority');
      setType('Type')
      setEmptyFields('')

      dispatch({type:'CREATE_TODO' , payload : json})
    }
  }

  return (
    <form className='app__form' onSubmit={handleSubmit}>

      <div className='app__task-input'>
        <img src={addIcon} alt="add"/>
        <input type='text' placeholder='Add new ...' 
          value={title} 
          onChange={(e)=> setTitle(e.target.value)} 

        />
      </div>

      <div className='app__task-details'>
        <select  className={ emptyFields.includes('type') ? 'error'  : 'in-ex-select' }  value={type} onChange={(e)=> setType(e.target.value)} >
          <option>Type</option>
          <option value='Internal'> Internal </option>
          <option value="External"> External </option>
        </select>
        
        <select className= { emptyFields.includes('priority') ? 'error'  : 'priority-select'} value={priority} onChange={(e)=> setPriority(e.target.value)}>
          <option value="">Priority</option>
          <option value="Low"> Low </option>
          <option value="Medium"> Medium </option>
          <option value="High"> High </option>
        </select>

        <input type='text' placeholder='Hours'
          className={emptyFields.includes('hours') ? 'error-h' : 'hour-input'}
          value={hours} 
          onChange={(e)=> setHours(e.target.value)} 
         
        
        /> {/**hour of task when should u do it*/}
        <button className='calendar-btn'><img src={calender}/></button>
        <button className='app__add-button'>ADD</button>
      </div>
      {error && <div className='error-msg'>{error}</div>}

      

    </form>
  )
}

export default Todo_Form