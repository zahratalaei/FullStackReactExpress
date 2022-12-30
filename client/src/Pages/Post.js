import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import axios from 'axios'

const Post = () => {
     const {id} = useParams()
     const[post,setPost] = useState({})
     const[comments,setComments] = useState([])
     const[newComment,setNewComment] = useState('')


     useEffect(()=>{
          axios.get(`http://localhost:4001/posts/post/${id}`)
          .then(res => setPost(res.data))
          axios.get(`http://localhost:4001/comments/${id}`)
          .then(res => setComments(res.data))
          
     },[])
    //add comment
     const addComment = ()=>{
      axios.post(`http://localhost:4001/comments/addComment`,{commentBody:newComment,commenter:"Zahra",PostId:id})
      .then((res) =>{
        const commentToAdd = {commentBody:newComment,author:"Zahra"}
        setComments([...comments,commentToAdd])
        setNewComment('')
      } )

     }
     //delete comment
     const deleteComment = ()=>{
      
     }
  return (
    <div className='container mt-3'>
     <div className='post'>
     <Image src={`http://localhost:3000/${post.image}`} rounded responsive="true" className='col-10'/>
     <h2>{post.title}</h2>
     <p>{post.desc}</p>
     <label htmlFor="">Created by: {post.author}</label>
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
          
          {comments.map((comment) =>(
            <div key={comment.id} className="border border-3 col-6 col-sm-10 px-2 rounded mt-1 py-1">
              <img src="https://i.imgur.com/hczKIze.jpg" width="30" className="user-img rounded-circle mr-2"></img>
              <span >
                <small className="fw-bold text-primary mx-1">{comment.commenter}</small>
                <small className="fw-bold">{comment.commentBody}</small>
                <button className='btn btn-close float-end mt-1' 
                aria-label="Close" data-toggle="tooltip" title="Remove"
                onClick={deleteComment}></button>
              </span>
            </div>
          ))}
        </div>
      </div>     
    </div>
  )
}

export default Post