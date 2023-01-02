import React from 'react'
import {Card} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import defaultImage from '../images/default.jpg'
const PostCard = ({post}) => {
      
  return (
   
     <Card className='shadow-lg mt-5 mx-3 rounded post' >
          <Card.Img src={post.image!=='' ? post.image : defaultImage} style={{ height: '12rem', objectFit:'cover'}}/>
          <Card.Body>
               <Link  to={`/post/${post.id}`} className="text-secondary">
                    <Card.Title className='ml-2'>{post.title.length <= 20 ? post.title :`${(post.title.slice(0,20))}...`}</Card.Title>
               <Card.Text>{(post.desc.length <= 125 ? post.desc : `${(post.desc).slice(0,125)}...`)}</Card.Text>
               </Link>
          </Card.Body>
          <Card.Footer>
               {/* <Link>
               {post.author}
               </Link> */}
               <a href="#" class="icon-link mr-3"><i class="fa fa-pencil-square-o"></i>{post.author}</a>
               </Card.Footer>
          
     </Card>

  )
}

export default PostCard