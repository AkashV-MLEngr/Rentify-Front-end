import React from 'react'
import SellerNavbar from '../components/seller/SellerNavbar'
import SellerProperties from '../components/seller/SellerProperties'
import { useLocation } from 'react-router-dom';

interface LocationState {
  userId: number;
}

const SellerDashbord: React.FC = ()  => {
  const location = useLocation();
  const userId = (location.state as LocationState)?.userId;
  
  return (
    <>
    <SellerNavbar userId={userId}/>
    
    
    <SellerProperties userId={userId} show={false} handleClose={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    </>
  )
}

export default SellerDashbord