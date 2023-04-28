import axios from 'axios'
import React, { useEffect, useState, useContext} from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import idPhoto from "../images/defaultId.jpg"
import{Row, Col, Card, Modal,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultImage from '../images/default.jpg'
import { AuthContext } from '../helper/AuthContext';

const Profile = () => {
     const {id}= useParams()
     const[user, setUser] = useState({})
     const[posts, setPosts] = useState([])
     const[photo, setPhoto] = useState('')
     const[preview, setPreview] = useState('')
     const[show, setShow] = useState(false)
     const {setAuth} = useContext(AuthContext)
     const handleCloseModal = () => setShow(false);
     const handleShowModal = () => setShow(true);
     const navigate = useNavigate()
     const handleDelete = (id) =>{
          axios.delete(`http://localhost:4001/auth/${id}`,{headers:{accessToken: localStorage.getItem("accessToken")}})
          .then(res=>{
               console.log("user deleted");
               localStorage.removeItem("accessToken")
               setAuth({username:"",id:0,status:false})
               navigate('/')
          })
          console.log("deleted");

          setShow(false)
     }

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
     
     console.log(preview);
  return (
    <div className='p-5'>
          <div className='d-flex flex-md-row flex-sm-column'>
               <div className="photoContainer d-flex flex-column m-3 col-md-3 col-sm-6">
                    <Image src={preview ? preview : idPhoto} rounded className={` ${user.photo!=="" ? "d-none" : 'd-block'} responsive`} style={{height:"300px", maxWidth:"400px",objectFit:"cover"}} />
                    <Image src={!preview ? `http://localhost:3000/${user.photo}`: preview}  rounded className={` ${user.photo ? "d-block" : 'd-none'} responsive`} style={{height:"300px", maxWidth:"400px",objectFit:"cover"}} />
               </div>
               <div className='col-md-4 col-sm-8 d-flex flex-column justify-content-end'>
                    <form className=' m-3' onSubmit={uploadHandler}>
                         <label htmlFor="photo" className='form-label'>Change your photo</label>
                         <input type="file" name='photo' placeholder='upload photo' onChange={onChangeInput}
                         className='form-control' accept='.jpg, .png'
                         />
                         <button className='btn btn-primary mt-1 float-end' type='submit' disabled={!preview} > Save Photo</button>
                    </form>
                    <Link className='btn btn-primary m-3' to={'/changePassword'}>Change Password</Link>
                    <Link className='btn btn-danger m-3' onClick={handleShowModal}>Delete Account</Link>
               </div>
          </div>
          <hr />
          <div className="postsContainer mt-3">
               <h3>Posts created by {user.username}</h3>
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
               {/* Add modal to delete account */}
               <Modal show={show} onHide={handleCloseModal}>
               {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
               </Modal.Header> */}
               <Modal.Body>Are you sure you want to delete your account? This action is permanent and cannot be undone.</Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>handleDelete(id)} >
                    Delete
                    </Button>
               </Modal.Footer>
               </Modal>
               
    </div>
    
  )
}

export default Profile