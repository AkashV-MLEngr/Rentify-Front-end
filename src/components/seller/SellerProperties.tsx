import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { linkDeleteProperty, linkGetAllProperties, linkGetSellerProperties } from '../api_links';
import axios from 'axios';
import {Card, Row, Col, Button, InputGroup, CardBody} from 'react-bootstrap';
import PropertyFormModal from './AddPropertyForm';
import EditPropertyFormModal from './PropertyFormModal';
import EditPropertyForm from './EditPropertyForm';
import Alerts from '../Alert';

interface SellerPropertiesProps {
  show: boolean;
  handleClose: () => void;
  userId: number;
}
interface DeletePostButtonProps {
  propertyId: number;
  onDeleteSuccess: () => void;
}
interface propertyProps{
    id:number;
    title:string;
    description:string;
    location:string;
    area:string;
    bedrooms:string;
    bathrooms:string;
    price:number;
    near_by:string;
    seller_id: Number;
};

const SellerProperties:React.FC<SellerPropertiesProps> = ({ userId }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);
    const [showPropertyFormModal, setShowPropertyFormModal] = useState<boolean>(false);
    const [editingProperty, setEditingProperty] = useState<propertyProps | undefined>(undefined);
    const [properties, setProperties] = useState<propertyProps[]>([]);

    useEffect(() => {
      fetchProperties();
    }, [userId]);
  
    const fetchProperties = async () => {
      try {
        const response = await axios.get<propertyProps[]>(`${linkGetSellerProperties.replace(':id', `${userId}`)}`);
        setProperties(response.data);
      } catch (error) {
        console.error('Something went wrong, please try again', error);
      }
    };
  
    const handleShowPropertyFormModal = (property?: propertyProps) => {
      setEditingProperty(property);
      setShowPropertyFormModal(true);
    };
  
    const handleClosePropertyFormModal = () => {
      setShowPropertyFormModal(false);
      setEditingProperty(undefined);
      fetchProperties(); // Refresh properties list after add/update
    };
    //     Delete Property
    const handleDelete = async (propertyId:number) => {
      try {
        await axios.delete(linkDeleteProperty.replace(':id',`${propertyId}`));
        setAlertMessage('Property deleted Successfully.');
        setAlertVariant('danger');
        window.location.reload();
        
      } catch (error) {
        console.error('Error deleting post:', error);
        setAlertMessage('Property delete error.');
        setAlertVariant('danger');
      }
    };

  return (
    <><div>
      <Alerts alertMessage={alertMessage} alertVariant={alertVariant} setAlertMessage={setAlertMessage} />
    </div>
    <div className='mt-3'>
        <Row xs={1} md={2} className="g-4">
          {properties && properties.map((property, index) => (
            <Col key={index}>
              <Card key={property.id}>
                <Row className='g-0' style={{ width: '595px' }}>
                  <Col className='col-md-4'>
                    <Card.Img className='img-fluid rounded-start' src="/images/img.jpg" />
                  </Col>
                  <Col className='col-md-8'>
                    <CardBody>
                      <Card.Title>{property.title}, ₹{property.price}</Card.Title>
                      <Card.Text>{property.location} | {property.bedrooms} | sq.ft.{property.area}
                        <br /><span className='text-muted'>Nearby:</span> {property.near_by}
                      </Card.Text>
                      <Card.Text>
                        {property.description}
                        <InputGroup className="m-1 ms-5 ">
                          <Button variant="outline-secondary" onClick={() => handleShowPropertyFormModal(property)}>
                            Edit
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleDelete(property.id)}>
                            Delete
                          </Button>
                        </InputGroup>
                      </Card.Text>

                    </CardBody>
                  </Col>
                </Row>
              </Card>
              {/* ))} */}
            </Col>
          ))}
        </Row>
        <EditPropertyForm
          show={showPropertyFormModal}
          handleClose={handleClosePropertyFormModal}
          userId={userId} />

      </div></>

  )
}

export default SellerProperties