import React, { useEffect } from 'react'
import CusNavbar from '../components/Navbar'
import SearchForm from '../components/SearchForm'
import { useParams } from 'react-router-dom'; 


const LandingView: React.FC = () => {
  useParams();

  useEffect(() => {
    // This code prevents the user from navigating back using the back button
    window.history.pushState({}, '', window.location.href);
    window.onpopstate = function (event) {
      // eslint-disable-next-line no-restricted-globals
      history.go(1);
    };

    // Cleanup function to remove the event listener
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <>
    <CusNavbar />
    <SearchForm />
    </>
  )
}

export default LandingView
