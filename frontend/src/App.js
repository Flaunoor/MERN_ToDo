import './App.css';
import Home from './Containers/Home/Home.jsx';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import Navbar from './Components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import {BrowserRouter, Routes , Route, Navigate} from 'react-router-dom'


function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route
            path='/'
            element = { user ? <Home/> : <Navigate to={"/login"}/> }
          />  
          <Route
            path='/signup'
            element = {!user ? <Signup/> : <Navigate to={"/login"}/> }
          />  
          <Route
            path='/login'
            element = {!user ?  <Login/> : <Navigate to={"/"}/> }
          />  

        </Routes>
        

      </BrowserRouter>  
      
    </div>
  );
}

export default App;
