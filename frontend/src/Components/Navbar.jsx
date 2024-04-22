import React from 'react'
import profile from '../Media/social.png'
import logo from '../Media/logo1.png'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


import log_out from '../Media/log-out.png'
import './Navbar.scss'
const Navbar = () => {
  const {logout} = useLogout()
  
  const handleLogout = ()=>{
   logout()
  }
  return (
    <div className='app__navbar'>

      <div className='logo-div'>
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <div>Get things done</div>
      </div>
      
      <div className='user-div'>
        <img src={profile} alt="profile pic" /> 
        <div className='logout' onClick={handleLogout}><img src={log_out} alt="logout" /></div>
      </div>

    
    </div>
  )
}

export default Navbar