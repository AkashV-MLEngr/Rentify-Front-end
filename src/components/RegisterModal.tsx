import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RegistrationData } from '../types/types';
import axios from 'axios';
import { linkUserRegister } from './api_links';

interface RegisterModalProps {
  show: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, handleClose }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    user_type: 1,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(linkUserRegister, formData);
      console.log('User registered:', response.data);
      if (response.status === 208) {
        setAlertMessage('User Already exists!');
        setAlertVariant('danger')
      }
       else {
        setAlertMessage('Account created successfully');
        setAlertVariant('success')
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 208) {
          setAlertMessage('User already exists!');
          setAlertVariant('danger');
        } else {
          setAlertMessage('An error occurred while creating the user.');
          setAlertVariant('danger');
        }
      } else {
        setAlertMessage('An error occurred while creating the user.');
        setAlertVariant('danger');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={handleRegister} className="container mt-5">
                  <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input
                          type="tel"
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="user_type" className="form-label">User Type</label>
                      <select
                          className="form-select"
                          id="user_type"
                          name="user_type"
                          value={formData.user_type}
                          onChange={handleChange}
                          required
                      >
                          <option value="1">Buyer</option>
                          <option value="2">Seller</option>
                      </select>
                  </div>
                  
              </form>
      </Modal.Body><Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={handleRegister}>
                  Register
              </Button>
          </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
