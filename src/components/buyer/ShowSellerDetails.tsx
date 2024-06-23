import React, { useState } from 'react'
import { Modal, Button, Card, CardHeader, CardBody, CardFooter, Row } from 'react-bootstrap';
import Alerts from '../Alert';
import axios from 'axios';
import { linkGetSellarDetails } from '../api_links';

interface SellerDetailModalProps {
    show: boolean;
    handleClose: () => void;
    sellerId:number;
  }
interface SellerDetailTypes {
    first_name:string;
    last_name:string;
    email:string;
    phone_number:string;
}

const ShowSellerDetails: React.FC<SellerDetailModalProps> = ({ show, handleClose, sellerId}) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertVariant, setAlertVariant] = useState<string | undefined>(undefined);

    const [getSellerDetails, setGetSellerDetails] = React.useState<SellerDetailTypes[]>([]);

    React.useEffect(() => {
        if(show){
            fetchGetSellerDetails();
        }
        
    }, [show]);
    // fetch data using axios
    const fetchGetSellerDetails = () =>{
        axios.get(linkGetSellarDetails.replace('id',`${sellerId}`))
        .then((response) => {
            console.log(response.data)
            setGetSellerDetails(response.data)
        })
        .catch((error) =>{
            console.error("somthing went wrong", error)
        })
    };
   
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Seller Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
      <Alerts alertMessage={alertMessage} alertVariant={alertVariant} setAlertMessage={setAlertMessage}/>
      </div>
      <Row>
        {getSellerDetails && getSellerDetails.map((detail, index) =>(
            <Card key={index}>
                <CardHeader>
                    {detail.first_name} {detail.last_name}
                </CardHeader>
                <CardBody>
                    Email: {detail.email}
                    Phone Number: {detail.phone_number}
                </CardBody>
                <CardFooter>
                <Button variant="outline-info">
                        I'm interest
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    
                </CardFooter>
            </Card>
        ))}
      </Row>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
          
        
      </Modal.Footer>
    </Modal>
  )
}

export default ShowSellerDetails