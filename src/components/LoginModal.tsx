import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api_links';
import Alerts from './Alert';


interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_type, setUser_type] = useState<number | undefined>(undefined); 

    const navigate = useNavigate();


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await axiosInstance.post("/api/login", {
          email: email,
          password: password,
          user_type: user_type
        });
        console.log('User registered:', response.data);
        if (response.status === 201) {
          const userId = response.data['id']
          if (response.data.user_type === 1) {
            navigate('/api/properties')     
          } else if (response.data.user_type === 2) {
            navigate('/api/seller-dashboard', {state:{userId}})           
          }
        } else {
          setAlertMessage('Invalid Credentials.');
          setAlertVariant('danger');
        }
      } catch (error) {
        console.error('There was an error registering the user:', error);
        if (axios.isAxiosError(error) && error.response) {
          if (error.response?.status === 401) {
            setAlertMessage('Invalid Credentials.');
            setAlertVariant('danger');
          } else {
            setAlertMessage('An error occurred while Login.');
            setAlertVariant('danger');
          }
        } else {
          setAlertMessage('An error occurred while login.');
          setAlertVariant('danger');
        }
      }
    // handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
      <Alerts alertMessage={alertMessage} alertVariant={alertVariant} setAlertMessage={setAlertMessage}/>
      </div>
      <form onSubmit={handleLogin} className="container mt-5">
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label htmlFor="user_type" className="form-label">User Type</label>
          <select
            className="form-select"
            id="user_type"
            name="user_type"
            value={user_type}
            onChange={(e) => setUser_type(parseInt(e.target.value))}
            required
          >
            <option value="">Select User Type</option>
            <option value="1">Buyer</option>
            <option value="2">Seller</option>
          </select>
        </div>
        <Button variant="primary" type='submit'>Login</Button>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
          
        
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
