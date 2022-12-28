import React from 'react'
import {Card} from 'react-bootstrap'
import { Link} from 'react-router-dom'

const PostCard = ({post}) => {
     
  return (
   
     <Card className='shadow-lg mt-5 mx-3 rounded post' >
          <Card.Img src={post.image} style={{ height: '10rem', objectFit:'cover'}}/>
          <Card.Body>
               <Link  to={`/post/${post.id}`}>
                    <Card.Title className='ml-2'>{post.title.length <= 20 ? post.title :`${(post.title.slice(0,20))}...`}</Card.Title>
               </Link>
               <Card.Text>{(post.desc.length <= 125 ? post.desc : `${(post.desc).slice(0,125)}...`)}</Card.Text>
          </Card.Body>
          <Card.Footer>
               <Link>
               {post.author}
               
               </Link></Card.Footer>
          
     </Card>

  )
}

export default PostCard