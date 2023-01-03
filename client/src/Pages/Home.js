import React from 'react'
import PostCard from '../components/PostCard'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Row,Col, Container} from 'react-bootstrap'

const Home = () => {
     const [posts,setPosts] = useState([])
     console.log();
  useEffect(()=>{
    
    axios.get('http://localhost:4001/posts')
    .then(res=>{
      setPosts(res.data)
      console.log(res);
      })
  },[])
  return (
    <Container fluid={"md"} className="mt-5">
    <Row xs={1} md={3} lg={4}>
    
        {posts.length > 0 && posts.map(post => (
           <Col md={6} lg={4} sm={12} key={post.id}>
          <PostCard post={post}/>
           </Col>
        ))}
        </Row>
      
        </Container>
  )
}

export default Home