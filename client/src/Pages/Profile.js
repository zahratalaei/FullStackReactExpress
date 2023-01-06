import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import idPhoto from "../images/defaultId.jpg"
import{Row, Col, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultImage from '../images/default.jpg'

const Profile = () => {
     const {id}= useParams()
     const[user, setUser] = useState({})
     const[posts, setPosts] = useState([])
     const[photo, setPhoto] = useState('')
     const[preview, setPreview] = useState()
     
     
     useEffect(()=>{
          axios.get(`http://localhost:4001/auth/${id}`,{headers:{
               accessToken: localStorage.getItem("accessToken")
          }}).then((res)=>{
               setUser(res.data.User)
               setPosts(res.data.PostsByUser)
          })
          
     },[])
     
     
     const uploadHandler = () => {
          let formData = new FormData()
          formData.append("photo",photo)
          
          axios.put(`http://localhost:4001/auth/updatePhoto`, formData,
          {headers:{
               accessToken: localStorage.getItem("accessToken")
          }}).then((res)=>{
               console.log(res.data);
               setPreview('')
          })
     }
     const onChangeInput = (e) =>{
          setPhoto(e.target.files[0])
           setPreview(URL.createObjectURL(e.target.files[0]))
     }
  return (
    <div className=''>
          <div className="photoContainer d-flex flex-column m-3">
          <Image src={!preview ? `http://localhost:3000/${user.photo}`:preview}  rounded className={`col-3 ${user.photo ? "d-block" : 'd-none'}`} />
          <Image src={preview ? preview : idPhoto} rounded className={`col-3 ${user.photo!=="" ? "d-none" : 'd-block'}`} />
          <form className='d-flex flex-column col-3 my-2'>
          <input type="file" name='photo' placeholder='upload photo' onChange={onChangeInput}
          />
          <button className='btn btn-primary mt-1' type='submit' onClick={uploadHandler}> Save Photo</button>
          </form>
          <Link className='btn btn-dark col-3'>Change Password</Link>
          </div>
          <div className="postsContainer">
               <Row xs={1} md={3} lg={4}>
          
               {posts.length > 0 && posts.map(post => (
                    <Col md={6} lg={4} sm={12} key={post.id}>
                         <Card className='shadow-lg mt-5 mx-3 rounded post' >
                              <Card.Img src={post.image!=='' ? `http://localhost:3000/${post.image}` : defaultImage} style={{ height: '12rem', objectFit:'cover'}}/>
                              <Card.Body>
                                   <Link  to={`/post/${post.id}`} className="text-secondary">
                                        <Card.Title className='ml-2'>{post.title.length <= 20 ? post.title :`${(post.title.slice(0,20))}...`}</Card.Title>
                                   <Card.Text>{(post.desc.length <= 125 ? post.desc : `${(post.desc).slice(0,125)}...`)}</Card.Text>
                                   </Link>
                              </Card.Body>
                              
                         </Card>
                    </Col>
               ))}
               </Row>
               </div>
               
               
    </div>
    
  )
}

export default Profile