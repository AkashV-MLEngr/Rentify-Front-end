import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { PropertyDetailsType } from '../../types/types';
import { linkAddProperty } from '../api_links';

interface PropertyFormModalProps {
    show: boolean;
    handleClose: () => void;
    userId: number;
  }

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({ show, handleClose, userId }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
    const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsType>({
        title: '',
        description: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        price: 0,
        near_by: '',
        seller_id: userId,
    });

    useEffect(() => {
        setPropertyDetails((prevState) => ({
            ...prevState,
            seller_id: userId,
        }));
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPropertyDetails({
            ...propertyDetails,
            [name]: value,
        });
    };

    const handleAddDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await axios.post(linkAddProperty, propertyDetails);
            console.log('Status:', response.data);
            if (response.status === 201){
                setAlertMessage('Property added successfully');
                setAlertVariant('success')
            }
        } catch (error){
            console.log('there was an error:', error);
            if (axios.isAxiosError(error) && error.response){
                setAlertMessage('An error occurred while creating the user.');
                setAlertVariant('danger');
            } else {
                setAlertMessage('An error occurred while creating the user.');
                setAlertVariant('danger');
        }
    };
    handleClose();




}
  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={handleAddDetails} className="container mt-5">
                  <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={propertyDetails.title}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={propertyDetails.description}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="location" className="form-label">Location</label>
                      <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={propertyDetails.location}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="area" className="form-label">Area</label>
                      <input
                          type="text"
                          className="form-control"
                          id="area"
                          name="area"
                          value={propertyDetails.area}
                          onChange={handleChange}
                          required />
                  </div>
                 
                  <div className="mb-3">
                      <label htmlFor="bedrooms" className="form-label">bedrooms</label>
                      <select
                          className="form-select"
                          id="bedrooms"
                          name="bedrooms"
                          value={propertyDetails.bedrooms}
                          onChange={handleChange}
                          required
                      >
                          <option value="1BHK">1BHK</option>
                          <option value="2BHK">2BHK</option>
                          <option value="3BHK">3BHK</option>
                          <option value="4BHK">4BHK</option>
                          <option value="5BHK">5BHK</option>
                          <option value="6BHK">6BHK</option>
                      </select>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                      <input
                          type="text"
                          className="form-control"
                          id="bathrooms"
                          name="bathrooms"
                          value={propertyDetails.bathrooms}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          value={propertyDetails.price}
                          onChange={handleChange}
                          required />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="near_by" className="form-label">Nearby</label>
                      <input
                          type="text"
                          className="form-control"
                          id="near_by"
                          name="near_by"
                          value={propertyDetails.near_by}
                          onChange={handleChange}
                          required />
                  </div>

              </form>
      </Modal.Body><Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={handleAddDetails}>
                  Post
              </Button>
          </Modal.Footer>
    </Modal>
  )
}

export default PropertyFormModal