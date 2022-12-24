import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavBar() {
  return (
    <>
    <div className = "my-nav-bar">
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <img
                src="/be_logo_white_4.png"
                width="60"
                height="40"
                className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Accounts" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/account/add">Add Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/account/details">
                    Get Details
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Container>
        </Navbar>
    </div>
      
    </>
  )
}

export default MyNavBar