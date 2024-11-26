// legal.js
import React from 'react';
import './legal.css';
import back from '../images/ShariaStocks-logo/back.svg'
import { useNavigate } from 'react-router-dom';

const LegalInformation = () => {
  const navigate = useNavigate();
  return (
    <div className="legal-container">
      <div className="legal-background" /> {/* Background image and overlay */}
      <div className='back-btn-section'>
            <img className='back-btn' src={back} alt="Go back" onClick={() => {
                 navigate(-1)
             }}/>
          </div>
      <div className="legal-info">
        <h1 className="legal-title">Legal Information</h1>
        <p className="legal-description">
          This page provides information about the legal terms and conditions of using our services.
          Please read these terms carefully before using our platform.
        </p>
        <h2 className="legal-subtitle">Terms of Service</h2>
        <p className="legal-text">
          By using our services, you agree to comply with the terms outlined in our Terms of Service.
        </p>
        <h2 className="legal-subtitle">Disclaimers</h2>
        <p className="legal-text">
          ShariaStock is not responsible for any financial decisions made based on the information provided 
          on our platform. Please consult with a financial advisor.
        </p>
      </div>
    </div>
  );
};

export default LegalInformation;