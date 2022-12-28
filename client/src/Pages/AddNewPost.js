import React ,{useState}from 'react'
import{Formik,Form,Field,ErrorMessage} from 'formik'
// import {Button} from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const AddNewPost = () => {
  // const[title,setTitle] = useState('')
  // const[desc,setDesc] = useState('')
  // const[author,setAuthor] = useState('')
  const[image,setImage] = useState('')
  const navigate = useNavigate()
  const initialValues = {
    title:"",
    desc:"",
    author:"",
    image:''
  }

  const onSubmit = async(data)=>{
  let formData = new FormData()
  formData.append("title",data.title)
  formData.append("desc",data.desc)
  formData.append("author",data.author)
  formData.append("image",image)
  
  console.log(formData)
  await axios.post("http://localhost:4001/posts/addPost", formData)
  .then((res) => {
    navigate("/")})
  }

  const  validationSchema = Yup.object().shape({
    title:Yup.string().required("You must input a Title") ,
    desc:Yup.string().required(),
    author:Yup.string().min(3).max(15).required(),
    image:Yup.mixed().nullable()
  })
  return (
    <div className='d-flex justify-content-center mt-3'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='d-flex flex-column justify-content-center col-sm-8 col-md-6 col-lg-4 rounded border border-3 border-primary p-2' >
          <label htmlFor="title">Title: </label>
          <ErrorMessage component="span" name='title'/>
          {/* <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} /> */}
          <Field autoComplete='off' name="title" />
          
          <label htmlFor="desc">Description: </label>
          <ErrorMessage component="span" name='desc'/>
          {/* <input type="text" name="desc" onChange={(e)=>setDesc(e.target.value)} /> */}

          <Field autoComplete='off' name="desc" />
          
          <label htmlFor="author">Author: </label>
          <ErrorMessage component="span" name='author'/>
          {/* <input type="text" name="author" onChange={(e)=>setAuthor(e.target.value)} /> */}

          <Field autoComplete='off' name="author" />
          
          <label htmlFor="image">Image: </label>
          <ErrorMessage component="span" name='image'/>
          <input type="file" name='image' id='image' className='mb-2' onChange={(e)=>{  
           setImage(e.target.files[0])
          }} />
 
          {/* <Field autoComplete='off' name="image" type="file" /> */}
          {/* <Button type="submit" variant="primary" className='mt-2'>Create post</Button> */}
          <button type='submit'>Create Post</button>
        </Form>

      </Formik>
    
    
    </div>
  )
}

export default AddNewPost