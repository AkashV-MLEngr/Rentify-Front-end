import React from 'react'
import {Nav, Navbar, Button, Form, FormControl, InputGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import axios from 'axios';
import { linkUserLogout } from '../api_links';



const BuyerNavbar = () => {
//     const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
//   const [showPropertyFormModal, setShowPropertyFormModal] = useState<boolean>(false);
  const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.get(linkUserLogout);
            console.log('Status:', response.data);
            if (response.status === 200) {
                // setAlertMessage('Logged out successfully');
                // setAlertVariant('success');
                navigate('/');
            }
        } catch (error) {
            console.log('there was an error:', error);
            if (axios.isAxiosError(error) && error.response) {
                // setAlertMessage('An error occurred while logging out.');
                // setAlertVariant('danger');
            } else {
                // setAlertMessage('An error occurred while logging out.');
                // setAlertVariant('danger');
            }
        }
    };

     
    
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="ms-2">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center" >
        <Nav className="ml-auto me-2">
        <Form >
            <Form.Group >
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    className='my-custom-class'
                />
                <InputGroup.Text style={{ cursor: 'pointer' }}>
                        <FaSearch />
                    </InputGroup.Text>
                    </InputGroup>
            </Form.Group>
        </Form>
        </Nav>         
        
        </Navbar.Collapse>
        <Button variant="outline-danger" className="me-1" onClick={handleLogout}>
              Logout
        </Button>
      </Navbar>
    </>
  )
}

export default BuyerNavbar