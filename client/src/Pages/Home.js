import React, { useContext } from 'react'
import PostCard from '../components/PostCard'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Row,Col, Container} from 'react-bootstrap'
import { AuthContext } from '../helper/AuthContext'
const Home = () => {
     const [posts,setPosts] = useState([])
     const [likedPostsByUser, setLikedPostsByUser] = useState([])
     const {auth} = useContext(AuthContext)

     
  useEffect(()=>{
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`,{headers:{
      accessToken: localStorage.getItem("accessToken")
    }})
    .then(res=>{
      
      if(!res.data.error)
     { setPosts(res.data.posts)
      setLikedPostsByUser(res.data.likedPostsByUser.map((like)=>(like.PostId)))}else{setPosts([])}
      }
      )

  },[])
console.log(posts);
  
  return (
    <Container fluid={"md"} className="mt-5">
    <Row xs={1} md={3} lg={4}>
    
        {posts && posts.length > 0 && posts.map(post => (
           <Col md={6} lg={4} sm={12} key={post.id}>
          <PostCard post={post} auth={auth} setPosts={setPosts} />
           </Col>
        ))}
        </Row>
      
        </Container>
  )
}

export default Home