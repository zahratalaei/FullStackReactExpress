import './App.css';

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import {Routes, Route} from 'react-router-dom'
import AddNewPost from './Pages/AddNewPost';
import Post from './Pages/Post';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './helper/AuthContext';
function App() {
  
  const [auth,setAuth] = useState({username:"", id:0, status:false})
  useEffect(()=>{
    axios.get('http://localhost:4001/auth/auth',{
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res)=>{
      if(res.data.error){setAuth({...auth, status:false})
    }else{
      setAuth({username:res.data.username, id:res.data.id, status:true})
    }
    })
  },[])
  return (
    <div className="App">
      <AuthContext.Provider value={{auth, setAuth}}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/addNewPost' element={<AddNewPost/>} />
          <Route path='/post/:id' element={<Post/>} />
          <Route path='/signUp' element={<SignUp/>} />
          <Route path='/signIn' element={<SignIn/>} />
        </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
