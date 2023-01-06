import React, { useState } from 'react'

const UpdateProfile = () => {
     const [oldPassword,setOldPassword] = useState()
     const [newPassword, setNewPassword] = useState()

     const updateProfile = () => {
          
     }

  return (
    <div className='col-4 d-flex flex-column mx-auto'>
     <h1>Update your Profile</h1>
     
     <label for="formFile" className="form-label mt-3">Upload your photo</label>
     <input className="form-control mb-2" type="file" id="formFile"/>

     <input type="password" className='mb-2' value={oldPassword} placeholder='Old password ...' onChange={(e)=> setOldPassword(e.target.value)} />
     <input type="password" className='mb-2' value={newPassword} placeholder='New password ...' onChange={(e)=> setNewPassword(e.target.value)} />
     <button className='btn btn-primary' onClick={updateProfile}>Save changes</button>
    </div>
  )
}

export default UpdateProfile