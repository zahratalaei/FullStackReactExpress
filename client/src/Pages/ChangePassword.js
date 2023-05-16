import axios from 'axios'
import React,{useState} from 'react'

const ChangePassword = () => {
     const [oldPassword,setOldPassword] = useState()
     const [newPassword, setNewPassword] = useState()

     const changePassword = () => {
          axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/changePassword`,{oldPassword:oldPassword, newPassword:newPassword} , {headers:{
               accessToken: localStorage.getItem('accessToken')
          }}).then((res)=>{
               if(res.data.error){
                    alert(res.data.error)
               }else{
                    alert(res.data)
                    setNewPassword('')
                    setOldPassword('')
               }
          })
     }

  return (
    <div className='col-4 d-flex flex-column mx-auto mt-3'>
     <h3>Change Password</h3>

     <input type="password" className='mb-2 form-control' value={oldPassword} placeholder='Old password ...' onChange={(e)=> setOldPassword(e.target.value)} />
     <input type="password" className='mb-2 form-control' value={newPassword} placeholder='New password ...' onChange={(e)=> setNewPassword(e.target.value)} />
     <button className='btn btn-primary' onClick={changePassword} >Save changes</button>
    </div>
  )
}

export default ChangePassword