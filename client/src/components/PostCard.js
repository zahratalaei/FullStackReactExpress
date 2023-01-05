import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import defaultImage from '../images/default.jpg'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import axios from 'axios'

const PostCard = ({post,auth}) => {
     const [likesArray, setLikesArray] = useState(post.Likes)
     const[likedPost, setLikedPost] =useState([])
     
     
     const likeAPost = (id) =>{
          axios.post(`http://localhost:4001/likes`,{postId:id},{headers:{
            accessToken:localStorage.getItem("accessToken")
          }} ).then((res)=>{
               console.log(res.data);
               setLikedPost(res.data)
            if(res.data == null){
               setLikesArray([...likesArray,{PostId:id, UserId:auth.id}])
          }else{
               setLikesArray(likesArray.filter(like => {return like.UserId !== auth.id} ))
          }
            
          })
         }

  return (
   
     <Card className='shadow-lg mt-5 mx-3 rounded post' >
          <Card.Img src={post.image!=='' ? post.image : defaultImage} style={{ height: '12rem', objectFit:'cover'}}/>
          <Card.Body>
               <Link  to={`/post/${post.id}`} className="text-secondary">
                    <Card.Title className='ml-2'>{post.title.length <= 20 ? post.title :`${(post.title.slice(0,20))}...`}</Card.Title>
               <Card.Text>{(post.desc.length <= 125 ? post.desc : `${(post.desc).slice(0,125)}...`)}</Card.Text>
               </Link>
               <div className='float-end'>
               <label htmlFor="">{likesArray.length}</label> 
          <ThumbUpIcon onClick={()=>{likeAPost(post.id)}} className={likesArray.find(like => like.UserId === auth.id) ? "liked" : "unliked"}/>
               </div>
          </Card.Body>
          <Card.Footer>
               {/* <Link>
               {post.author}
               </Link> */}
               <a href="#" className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i>{post.author}</a>
               </Card.Footer>
          
     </Card>

  )
}

export default PostCard