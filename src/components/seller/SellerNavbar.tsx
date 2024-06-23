import React, { useState } from 'react'
import {Nav, Navbar, Button} from 'react-bootstrap';
import PropertyFormModal from './AddPropertyForm';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { linkUserLogout } from '../api_links';

interface LocationState {
  userId: number;
}

const SellerNavbar: React.FC<LocationState> = ({ userId }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
  const [showPropertyFormModal, setShowPropertyFormModal] = useState<boolean>(false);

  const handleShowPropertyFormModal = () => setShowPropertyFormModal(true);
  const handleClosePropertyFormModal = () => setShowPropertyFormModal(false);

  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
        const response = await axios.get(linkUserLogout);
        console.log('Status:', response.data);
        if (response.status === 200) {
            setAlertMessage('Logged out successfully');
            setAlertVariant('success');
            navigate('/');
        }
    } catch (error) {
        console.log('there was an error:', error);
        if (axios.isAxiosError(error) && error.response) {
            setAlertMessage('An error occurred while logging out.');
            setAlertVariant('danger');
        } else {
            setAlertMessage('An error occurred while logging out.');
            setAlertVariant('danger');
        }
    }
};

  return (
    <>
    <Navbar bg="dark" variant="dark">
        <div className='container'>
        <Navbar.Brand href="#home" className="ms-2">Rentify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center" >
          <Nav className="ml-auto me-2">
            <Button variant="outline-light" onClick={handleShowPropertyFormModal}>
              Add Property
            </Button>
          </Nav>
          <PropertyFormModal show={showPropertyFormModal} handleClose={handleClosePropertyFormModal} userId={userId} />
        </Navbar.Collapse>
        <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
        </div>
      </Navbar>
    </>
  )
}

export default SellerNavbar