import React from 'react'
import { useState, useEffect } from 'react'


import thoughtIcon from '../Media/thought.png';
import lampIcon from '../Media/lamp.png';
import add from '../Media/add+.png';
import deleteIcon from '../Media/deleteTH.png';

import { useAuthContext } from '../hooks/useAuthContext';
import { useThoughtsContext } from '../hooks/useThoughtsContext';



import './RandomT.scss'

const RandomT = () => {
  const {thoughts ,dispatch } = useThoughtsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [error,setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleAddIdea = async(e) =>{

    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return
    }
    const idea  = {title}

    const response = await fetch('/api/thought',
    {
      method: 'POST',
      body:JSON.stringify(idea),
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
      console.log('new idea added')
      setTitle('')
      setEmptyFields('')

      dispatch({type:'CREATE_THOUGHT' , payload : json})
    }
  }

  const handleDelete = async(thoughtID) =>{

    const response = await fetch(`/api/thought/${thoughtID}`, {
      method: 'DELETE',
      headers:  {'Authorization': `Bearer ${user.token}`}
    })

    console.log('inside the delete function')

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_THOUGHT', payload: json})
      console.log('delete success')
    }

    if(!response.ok){
        console.log('error handling delete ')
    }
  }


  useEffect(()=>{
    const fetchThoughts = async()=>{
        const response = await fetch('/api/thought',{
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if(response.ok){
            dispatch({type: 'SET_THOUGHT' , payload : json})
        }
    }
    if(user){
      fetchThoughts()
    }
},[dispatch, user])

console.log(thoughts)
  
  return (
    <div className='app__randomT'>

      <div className='app__tandomT-title'>
          <div>Random Thoughts</div>
          <img src={lampIcon} alt="lamp" />
      </div>

      <div className='app__randomT-input'>
        <img src={thoughtIcon} alt="thought"/>
        <input type='text' placeholder='Add new ...' 
          value={title} 
          onChange={(e)=> setTitle(e.target.value)} 
        />
        <div className='add-thought-btn' onClick={handleAddIdea} >
          <img src={add} alt="add" />
        </div>

      </div>
      
        {
          thoughts && thoughts.map((thought, index)=>(
            
            <div className='app__idea'>
              <div className='app__singleThought' key={index}>
                <p>{thought.title}</p>
              </div>
              <div onClick={() => handleDelete(thought._id)}><img src={deleteIcon} alt="delete" /></div>
            </div>
        
          ))
        }

      {error && <div className='error-msg'>{error}</div>}
    </div>
  )
}

export default RandomT