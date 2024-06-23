import React from 'react'
import { Alert } from 'react-bootstrap';
import { AlertsProps } from '../types/types';



const Alerts: React.FC<AlertsProps> = ({alertMessage, alertVariant, setAlertMessage}) => {
  return (
    <div className='container-fluid mt-2'>
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage}
        </Alert>
      )}
    </div>
  )
}

export default Alerts