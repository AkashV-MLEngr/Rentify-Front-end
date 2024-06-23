import React from 'react';
import {InputGroup, Form, Col, Button} from 'react-bootstrap';


function SearchForm() {
  return (
    <div className='container mt-5 p-5'>
      <header className='text-center'>
        <h1 className='text-muted fw-normal'>World's Largest NoBrokerage Property Site</h1>
      </header>
      <Form className='p-5 mt-5'>
      <InputGroup className="mb-1">
      <Form.Control as={Col} >
          <Form.Select name='bedrooms' defaultValue="bedrooms">
            <option value="">BHK Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
            <option value="5BHK">5BHK</option>
            <option value="6BHK">6BHK</option>
          </Form.Select>
        </Form.Control>
        <Form.Control as={Col} >
          <Form.Select name='city' defaultValue="city">
            <option value="">City</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Patna">Patna</option>
            <option value="Delhi">Delhi</option>
            <option value="Tiruchirappalli">Tiruchirappalli</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kochi">Kochi</option>
          </Form.Select>
        </Form.Control>
        
      </InputGroup>
        <InputGroup className="mb-3">
        
          <Form.Control 
            name='search'
            placeholder="Search"
            aria-label="Search"
          />
          <Button type="submit" className='btn btn-secondary'>Sign in</Button>
        </InputGroup>
      </Form>
    </div>
  
  );
}

export default SearchForm;
