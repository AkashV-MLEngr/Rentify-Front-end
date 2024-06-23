import React, { useState } from 'react'
import {Nav, Navbar, Modal, Button, Container} from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const CusNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="ms-2">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
          <Nav className="ml-auto me-2">
            <Button variant="outline-light" onClick={handleShowLoginModal}>
              Login
            </Button>
          </Nav>
          <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
        {/* </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="ml-auto me-2">
            <Button variant="outline-light" onClick={handleShowRegisterModal}>
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
    </>
  )
}

export default CusNavbar