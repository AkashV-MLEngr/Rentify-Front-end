import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { linkGetAllProperties, linkGetSellarDetails } from '../api_links';
import axios from 'axios';
import {Card, Row, Col, CardBody, Button} from 'react-bootstrap';
import ShowSellerDetails from './ShowSellerDetails';

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
  seller_id: number;
};

const PropertiesList:React.FC = () => {
  const [showSellerDetails, setShowSellerDetails] = useState<boolean>(false);

  const handleShowSellerDetails = () => setShowSellerDetails(true);
  const handleCloseSellerDetails = () => setShowSellerDetails(false);

    const [getAllProperties, setGetAllProperties] = React.useState<propertyProps[]>();

    React.useEffect(() => {
        fetchGetAllProperties();
    }, []);
    // fetch data using axios
    const fetchGetAllProperties = () =>{
        axios.get(linkGetAllProperties)
        .then((response) => {
            console.log(response.data)
            setGetAllProperties(response.data)
        })
        .catch((error) =>{
            console.error("somthing went wrong", error)
        })
    };

    


  return (
    <Row xs={1} md={2} className="g-4 mt-1">
        {getAllProperties && getAllProperties.map((property, index) =>(
            <Col key={index}>
          <Card key={property.id}>
            <Row className='g-0' style={{ width: '540px' }}>
                <Col className='col-md-4'>
            <Card.Img className='img-fluid rounded-start' src="/images/img.jpg" />
            </Col>
            <Col className='col-md-8'>
            <CardBody>
              <Card.Title>{property.title}, ₹{property.price}</Card.Title>
              <Card.Text>{property.location} | {property.bedrooms} | sq.ft.{property.area}
              <br/><span className='text-muted'>Nearby:</span> {property.near_by}
              </Card.Text>
              <Card.Text>              
                {property.description}<br/>
                <Button variant="info"  onClick={handleShowSellerDetails}>
                  I'm interest
                </Button>
                <ShowSellerDetails 
                show={showSellerDetails}
                handleClose={handleCloseSellerDetails}
                sellerId = {property.seller_id}
                />
              </Card.Text>
              </CardBody>
            </Col>
            </Row>
          </Card>
           {/* ))} */}
        </Col>
      ))}
    </Row>
   
  );
}

export default PropertiesList