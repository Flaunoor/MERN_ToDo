import React from 'react'
import TodoForm from '../../Components/TodoForm'
import Tasks from '../../Components/Tasks'
import Navbar from '../../Components/Navbar';
import RandomT from '../../Components/RandomT';
import './Home.scss'
const Home = () => {
  return (
    <div className='app__home'>
        <Navbar/>
        <div className='app__home__feed'>

          <div className='app__home-tasks'>
            <TodoForm/>
            <Tasks/> 
          </div>

          <div className='app__home-thoughts'>
            <RandomT/>
          </div>


        </div>
        
        
    </div>
  )
}

export default Home