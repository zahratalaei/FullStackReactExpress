import React from 'react'
import {Outlet,Link, useNavigate} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap';

const Layout = () => {
  const navigate = useNavigate()
  const signOut = () =>{
    localStorage.removeItem("accessToken")
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
               <div>
                {(localStorage.getItem("accessToken")) && <button className='float-end' onClick={signOut}>Sign out</button>}
               </div>
     </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}

export default Layout