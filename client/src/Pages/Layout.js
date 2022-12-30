import React from 'react'
import {Outlet,Link} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap';
const Layout = () => {
  
  return (
    <>
    <Navbar sticky='top' variant='dark' bg="dark" expand="sm">
     <Container>
          <Navbar.Brand>Codes up</Navbar.Brand>
          <Nav className='me-auto d-flex flex-row justify-content-evenly' >
               <Nav.Link eventKey="1" as={Link} to="/" >Home</Nav.Link>
               <Nav.Link eventKey="2" as={Link} to="/addNewPost">Add new post</Nav.Link>
               <Nav.Link eventKey="3" as={Link} to="/signUp">Sign up</Nav.Link>
               <Nav.Link eventKey="4" as={Link} to="signIn" >Sign in</Nav.Link>
          </Nav>
     </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}

export default Layout