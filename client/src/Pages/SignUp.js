import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const SignUp = () => {
     const initialValues = {
          username:'',
          password:'',
          photo:''
     }
     const validationSchema = Yup.object().shape({
          username: Yup.string().required().max(15).min(3),
          password: Yup.string().required().min(4).max(20),
          
     })
     const onSubmit = (data)=>{
           axios.post('http://localhost:4001/auth',data)
          .then(res =>{
               console.log("signed in")
          })

     }
  return (
    <div className='d-flex justify-content-center mt-3'>
     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
     <Form className='d-flex flex-column justify-content-center col-sm-8 col-md-6 col-lg-4 rounded border border-3 border-primary p-2'>
               <label htmlFor='username'>Username: </label>
               <ErrorMessage component="span" name="username" />
               <Field name="username" autoComplete="off"  />
               
               <label htmlFor='password'>Password: </label>
               <ErrorMessage component='span' name="password" />
               <Field name="password" autoComplete="off" type="password"/>

               <button className='mt-2 btn btn-primary' type='submit'>Sign up!</button>
          </Form>
     </Formik>
    </div>
  )
}

export default SignUp