import React from 'react'
import { useState } from 'react'

import { useLogin } from '../../hooks/useLogin'

import { Link } from 'react-router-dom'
import './Login.scss'
import logo_todo from '../../Media/logo1.png'
const Login = () => {
    
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin()

    const handleLogin = async(e) =>{
        e.preventDefault()
        await login(email, password)
        setEmail("")
        setPassword("")

    }
  return (
    <div className='app__login'>
        <div className='logo'>
         <img src={logo_todo} alt='logo ' />
        </div>
        <h1>Welcome Back to ScheDo</h1>
        <h4>Log In and access them from anywhere</h4>
        
        <form onSubmit={handleLogin} className="user__form">
        
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
                LOG IN
            </button>
            {error &&  <div className='error'>{error}</div>}     
        </form>
        <p>If you don't have an account <Link to='/signup' className='link'>Sign Up</Link></p>
        <p> © 2024 -- All rights reserved </p>
  </div>
  
  )
}

export default Login