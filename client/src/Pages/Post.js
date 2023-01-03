import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import axios from 'axios'
import defaultImage from '../images/default.jpg'
import idPhoto from "../images/defaultId.jpg"
import { AuthContext } from '../helper/AuthContext'

const Post = () => {
    const {id} = useParams()
    const[post,setPost] = useState({})
    const[comments,setComments] = useState([])
    const[newComment,setNewComment] = useState('')
    const{auth} = useContext(AuthContext)
    const navigate = useNavigate()
     useEffect(()=>{
          axios.get(`http://localhost:4001/posts/post/${id}`)
          .then(res => setPost(res.data))
          axios.get(`http://localhost:4001/comments/${id}`)
          .then(res => setComments(res.data))
          
     },[]) 
    //add comment
     const addComment = ()=>{
      axios.post(`http://localhost:4001/comments/addComment`,{
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
          const commentToAdd = {commentBody:newComment,username:auth.username}
          console.log(commentToAdd)
          setComments([...comments,commentToAdd])
         
          setNewComment('')
        }
      } )
      
     }
     //delete comment
     const deleteComment = (id)=>{
      axios.delete(`http://localhost:4001/comments/${id}`,{headers:{
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
      axios.delete(`http://localhost:4001/posts/post/${id}`,{headers:{
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
        const newTitle = prompt("Write new title",post.title)
        axios.put(`http://localhost:4001/posts/title`,{newTitle:newTitle, id:id},{headers:{
          accessToken: localStorage.getItem('accessToken')
        }}).then(()=>{
          setPost({...post, title:newTitle})
        })
      }else{
        const newDesc = prompt("Write new description", post.desc)
        axios.put(`http://localhost:4001/posts/desc`,{newDesc:newDesc,id:id},{headers:{
          accessToken: localStorage.getItem('accessToken')
        }}).then(()=>{
          setPost({...post, desc:newDesc})
        })
      }

     }
  return (
    <div className='container mt-3'>
     <div className='post'>
        <Image src={post.image!=="" ? `http://localhost:3000/${post.image}` :defaultImage } rounded responsive="true" className='col-10'/>
        <div className='col-10'  onClick={()=>{auth.username === post.author && editPost("title")}}><h2>{post.title}</h2></div>
        <p className='col-10' onClick={()=>{auth.username === post.author && editPost("desc")}} >{post.desc}</p>
        <div className="post-footer d-flex justify-content-between col-10">
          <a href="#" className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i>{post.author}</a>
          {auth.username === post.author && <button className='btn btn-danger btn-sm float-end' onClick={()=>deletePost(post.id)}>Delete post</button>}
        </div>
      </div>
      <div className="comment mt-4">
        <h6>Leave your comment</h6>
        <div className="form-outline col-6 col-sm-10">
          <input type="text" className="form-control" id='addANote'
              rows="4" placeholder='Comment...' value={newComment}
              onChange={(e)=>{setNewComment(e.target.value)}}
              />
          <button className='btn btn-sm btn-outline-primary mt-1 float-end' onClick={addComment}>Add</button>
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