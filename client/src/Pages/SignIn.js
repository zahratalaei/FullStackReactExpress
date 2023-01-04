import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helper/AuthContext'

const SignIn = () => {
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const {setAuth} = useContext(AuthContext)

     const navigate = useNavigate()
     const signIn = ()=>{
          const data = {username:username, password:password}
          axios.post('http://localhost:4001/auth/signIn',data)
          .then((res)=>{
               if(res.data.error){
                    alert(res.data.error)
               }else{
                    localStorage.setItem("accessToken",res.data.token)  
                    setAuth({username:res.data.username, id:res.data.id, status:true})          
               }
               navigate('/')
          })
          
     }
  return (
    <div className='d-flex justify-content-center mt-3'>
     <div className="signInContainer d-flex flex-column justify-content-center col-sm-8 col-md-6 col-lg-4 rounded border border-3 border-primary p-2">
          <label htmlFor="username">Username:</label>
          <input type="text" className='p-1 rounded' onChange={(e)=>{setUsername(e.target.value)}} />
          
          <label htmlFor="password">Password:</label>
          <input type="password" className='p-1 rounded' onChange={(e)=>{setPassword(e.target.value)}} />

          <button className='mt-2 btn btn-primary' type='submit' onClick={signIn}>Sign In!</button>
     </div>
    </div>
  )
}

export default SignIn