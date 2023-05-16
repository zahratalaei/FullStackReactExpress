import React ,{useState,useContext} from 'react'
import{Formik,Form,Field,ErrorMessage} from 'formik'
// import {Button} from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../helper/AuthContext'


const AddNewPost = () => {
  const {auth} = useContext(AuthContext)
  const[image,setImage] = useState('')
  const navigate = useNavigate()
  const initialValues = {
    title:"",
    desc:"",
    image:""
  }

  const onSubmit = async(data)=>{
    
  let formData = new FormData()
  formData.append("title",data.title)
  formData.append("desc",data.desc)
  formData.append("author",auth.username)
  formData.append("UserId",auth.id)
  formData.append("image",image)
  
  
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts/addPost`,
   formData,{headers:{
    accessToken:localStorage.getItem('accessToken')
   }})
  .then((res) => {
    navigate("/")})
  }

  const  validationSchema = Yup.object().shape({
    title:Yup.string().required("You must input a Title") ,
    desc:Yup.string().required(),
    image:Yup.mixed().nullable()
  })
  return (
    <div className='d-flex justify-content-center mt-3'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='d-flex flex-column justify-content-center col-sm-8 col-md-6 col-lg-4 rounded border border-3 border-primary p-2' >
          <label htmlFor="title">Title: </label>
          <ErrorMessage component="span" name='title'/>
          <Field autoComplete='off' name="title" />
          
          <label htmlFor="desc">Description: </label>
          <ErrorMessage component="span" name='desc'/>
          <Field autoComplete='off' name="desc" />
          
          {/* <label htmlFor="author">Author: </label>
          <ErrorMessage component="span" name='author'/>
          <Field autoComplete='off' name="author" /> */}
          
          <label htmlFor="image">Image: </label>
          <ErrorMessage component="span" name='image'/>
          <input type="file" name='image' id='image' className='mb-2' onChange={(e)=>{  
           setImage(e.target.files[0])
          }} />
          {/* <Button type="submit" variant="primary" className='mt-2'>Create post</Button> */}
          <button className='btn btn-primary' type='submit'>Create Post</button>
        </Form>

      </Formik>
    
    
    </div>
  )
}

export default AddNewPost