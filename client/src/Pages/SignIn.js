import axios from 'axios'
import React, { useState } from 'react'

const SignIn = () => {
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const signIn = ()=>{
          const data = {username:username, password:password}
          axios.post('http://localhost:4001/auth/signIn',data)
          .then((res)=>{
               if(res.data.error){
                    alert(res.data.error)
               }else{
                    localStorage.setItem("accessToken",res.data)
               }
          })
          console.log("signed")
     }
  return (
    <div className='d-flex justify-content-center mt-3'>
     <div className="signInContainer 2022-12-30 10:21:39d-flex flex-column justify-content-center col-sm-8 col-md-6 col-lg-4 rounded border border-3 border-primary p-2">
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