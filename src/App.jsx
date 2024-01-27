import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { Auth } from './components/auth';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
function App() {
  const [users,setUsers] = useState([])
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    about:""
  })
  const {name,email,password,about} = user;
 
  return (
    <BrowserRouter>

    <div className="App">
      <Routes>
        <Route>
          <Route exact path='/' Component={Auth}/>
          <Route exact path='/home' Component={Home}/>
     
      </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
