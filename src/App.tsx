import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerDashbord from './pages/SellerDashboard';
import LandingView from './pages/LandingView';
import BuyerDashboard from './pages/BuyerDashboard';


const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/api/properties" element={<BuyerDashboard />} />
          <Route path="/api/seller-dashboard" element={<SellerDashbord />} />
        </Routes>
      </Router>
      </div>
    
  );
};
export default App;