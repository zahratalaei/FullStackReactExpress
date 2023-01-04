import React, { useContext } from 'react'
import {Outlet,Link, useNavigate} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { AuthContext } from '../helper/AuthContext';

const Layout = () => {
  const {auth,setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const signOut = () =>{
    localStorage.removeItem("accessToken")
    setAuth({username:"",id:0,status:false})
    navigate('/signIn')
  }

  return (
    <>
    <Navbar sticky='top' variant='dark' bg="dark" expand="sm">
     <Container>
          <Navbar.Brand>Codes up</Navbar.Brand>
          <Nav className='me-auto d-flex flex-row justify-content-evenly' >
            {(localStorage.getItem("accessToken")) ?
              <>               
               <Nav.Link eventKey="1" as={Link} to="/" >Home</Nav.Link>
               <Nav.Link eventKey="2" as={Link} to="/addNewPost">Add new post</Nav.Link>
               </>
               :
               <>
               <Nav.Link eventKey="1" as={Link} to="/signUp">Sign up</Nav.Link>
               <Nav.Link eventKey="2" as={Link} to="signIn" >Sign in</Nav.Link>
               </>}
          </Nav>
               <div className='d-flex flex-row '>
                <Link to="/" className='p-2'><h5>{auth.username}</h5></Link>
                {(localStorage.getItem("accessToken")) && <button className='float-end rounded-4 btn btn-light' onClick={signOut}><h5>Sign out</h5></button>}
               </div>
     </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}

export default Layout