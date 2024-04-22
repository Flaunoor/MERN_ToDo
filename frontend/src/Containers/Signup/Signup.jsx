import React from 'react'
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link } from 'react-router-dom'
import './Signup.scss'
import logo_todo from '../../Media/logo1.png'
const Signup = () => {
    const [username ,setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup, isLoading, error} = useSignup()

    const handleSignup = async(e) =>{
        e.preventDefault()
        await signup (email, password)
        setEmail("")
        setPassword("")
        setUsername("")

       
    }
  return (
    <div className='app__signup'>
      <div className='logo'>
       <img src={logo_todo} alt='logo ' />
      </div>
      <h1>Welcome to ScheDo</h1>
      <h4>Create an account to save all schedulas and access them from anywhere</h4>
        
      <form onSubmit={handleSignup} className="user__form">
        
        <input type="text"
            placeholder='Username'
        
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className='user__inputField'
        />
        <input type="email"
            placeholder='Email'
            
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            className='user__inputField'
        />
        <input type="password"
            placeholder='Password'
        
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            className='user__inputField'
        />
        <button type='submit' className='user__submitButton'>
          SIGN UP
        </button>
        {error &&  <div className='error'>{error}</div>}     
      </form>
      <p>Already have an account <Link to='/login' className='link'>log in</Link></p>
      <p> © 2024 -- All rights reserved </p>
    </div>
    
   

  )
}

export default Signup