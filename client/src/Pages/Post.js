import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import axios from 'axios'
import defaultImage from '../images/default.jpg'
import idPhoto from "../images/defaultId.jpg"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { AuthContext } from '../helper/AuthContext'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
const Post = () => {
    const {id} = useParams()
    const[post,setPost] = useState({})
    const[comments,setComments] = useState([])
    const[newComment,setNewComment] = useState('')
    const[likedPost,setLikedPost] = useState([])
    const{auth} = useContext(AuthContext)
    const navigate = useNavigate()
     useEffect(()=>{
          axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/post/${id}`)
          .then(res => setPost(res.data))
          axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`)
          .then(res => setComments(res.data))
          axios.get(`${process.env.REACT_APP_SERVER_URL}/likes/${id}`,)
          .then((res)=>{
            setLikedPost( res.data.map(like=>{return like.UserId}) )
           })
          
     },[]) 
     console.log(likedPost)

    //add comment
     const addComment = ()=>{
      axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/addComment`,{
        commentBody:newComment,
        PostId:id,
      },{
        headers:{
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((res) =>{
        if(res.data.error){
          alert(res.data.error)
        }else{
          const commentToAdd = {commentBody:newComment, username:auth.username}
          console.log(commentToAdd)
          setComments([...comments,commentToAdd])
         
          setNewComment('')
        }
      } )
      
     }
     //delete comment
     const deleteComment = (id)=>{
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`,{headers:{
        accessToken: localStorage.getItem("accessToken")
      }})
      .then(() =>{
        setComments(comments.filter((comment)=>{
          return comment.id !== id
        }))
      } )
     }
     //delete post
     const deletePost = (id) => {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/post/${id}`,{headers:{
        accessToken: localStorage.getItem("accessToken")
      }})
      .then((res)=>{
        console.log("deleted post")
        navigate('/')
      })

     }

     //edit post
     const editPost = (option) =>{
      console.log("edit")
      if(option === "title"){
        const newTitle = prompt("Write new title", post.title)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/title`,{newTitle:newTitle, id:id},{headers:{
          accessToken: localStorage.getItem('accessToken')
        }}).then(()=>{
          setPost({...post, title:newTitle})
        })
      }else{
        const newDesc = prompt("Write new description", post.desc)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/desc`,{newDesc:newDesc,id:id},{headers:{
          accessToken: localStorage.getItem('accessToken')
        }}).then(()=>{
          setPost({...post, desc:newDesc})
        })
      }

     }

     //like a post
     const likeAPost = (id) =>{
      axios.post(`${process.env.REACT_APP_SERVER_URL}/likes`,{postId:id},{headers:{
        accessToken:localStorage.getItem("accessToken")
      }} ).then(()=>{
        if(likedPost.includes(auth.id)){
          setLikedPost(likedPost.filter(e=>( e !== auth.id)))
        }else{
          setLikedPost([...likedPost, auth.id])
        }
        
      })
     }

  return (
    <div className='container-sm mt-3'>
     <div className='post border rounded'>
        <Image src={post.image!=="" ? `http://localhost:3000/${post.image}` :defaultImage } rounded responsive="true" className='w-100'/>
        <div className=' d-flex flex-row justify-content-between'  ><p onClick={()=>{auth.username === post.author && editPost("title")}}>{post.title}</p><div className='likesContainer'>
          <label htmlFor="">{likedPost.length}</label> 
          <ThumbUpIcon onClick={()=>{likeAPost(post.id)}} className={likedPost.includes(auth.id) ? "liked" :"unliked"}/>
        </div>
        </div>
        <p className='' onClick={()=>{auth.username === post.author && editPost("desc")}} >{post.desc}</p>
        <div className="post-footer d-flex justify-content-between ">
          <a href="#" className="mr-3 fw-bold">
          {/* <a href="#" className="icon-link mr-3"> */}
            {/* <i className="fa fa-pencil-square-o"></i> */}
            <HistoryEduIcon />
            {post.author}</a>
          {auth.username === post.author && <button className='btn btn-danger btn-sm float-end' onClick={()=>deletePost(post.id)}>Delete post</button>}
        </div>
      </div>
      <div className="comment mt-4">
        {/* <h6>Leave your comment</h6> */}
        <div className="form-outline col-6 col-sm-10">
          <input type="text" className="form-control" id='addANote'
              rows="4" placeholder='Leave your comment...' value={newComment}
              onChange={(e)=>{setNewComment(e.target.value)}}
              />
          <button className='btn btn-sm btn-primary mt-1 float-end' onClick={addComment}>Add</button>
        </div>
        <div className="listOfComments mt-5">
          {comments.length > 0 && comments.map((comment) =>(
            <div key={comment.index} className="border border-3 col-6 col-sm-10 px-2 rounded mt-1 py-1">
              <img src={idPhoto} width="30" className="user-img rounded-circle mr-2"></img>
              <span >
                <small className="fw-bold text-primary mx-1">{comment.username}</small>
                <small className="fw-bold">{comment.commentBody}</small>
                {auth.username === comment.username && <button className='btn btn-close float-end mt-1' 
                aria-label="Close" data-toggle="tooltip" title="Remove"
                onClick={()=>deleteComment(comment.id)}></button>}
              </span>
            </div>
          ))}
        </div>
      </div>     
    </div>
  )
}

export default Post