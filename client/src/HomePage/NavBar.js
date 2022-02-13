import React from 'react'
import {Nav,Navbar,Container, Button,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function NavBar({student}) {
    const logout = () =>{
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light"> 
                <Container>
                <Navbar.Brand as={Link} to='/'><img className="logo" src="https://gomycodewebsite.blob.core.windows.net/website/img/black_Logo_342868e838_129748d4cd.svg" alt='logo' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"> 
                    </Nav>
                    <Nav>
                    {student.lastname ? 
                        <div> 
                            <NavDropdown title={`${student.lastname} ${student.firstname}`} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    {student.lastname} {student.firstname} <br />
                                    <span>{student.email}</span>
                                </NavDropdown.Item>
                                {student.number ? <NavDropdown.Item>{student.number}</NavDropdown.Item> : ''}
                                {student.formation ? <NavDropdown.Item><NavDropdown.Item>{student.formation}</NavDropdown.Item></NavDropdown.Item> : ''}  
                                
                                <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item> 
                            </NavDropdown>
                        </div>
                     :    
                        <div className="d-flex">
                         <Nav.Link as={Link} to='/login' href="#deets"><Button variant="outline-danger">login</Button></Nav.Link>
                         <Nav.Link as={Link} to='/signUp' href="#memes"><Button variant="outline-danger">SignUp</Button></Nav.Link>
                        </div>
                    } 
        

                    </Nav> 
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
