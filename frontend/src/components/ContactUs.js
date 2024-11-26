import React, { useState } from 'react';
import './contactus.css';
import back from '../images/ShariaStocks-logo/back.svg';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number
    if (name === 'phone') {
      const phoneRegex = /^[0-9]{10,15}$/; // Allows 10-15 digits
      if (!phoneRegex.test(value) && value !== '') {
        setErrors({ ...errors, phone: 'Enter a valid phone number (10-15 digits).' });
      } else {
        setErrors({ ...errors, phone: '' });
      }
    }

    // Validate email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
      if (!emailRegex.test(value) && value !== '') {
        setErrors({ ...errors, email: 'Enter a valid email address.' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for errors before submitting
    if (errors.phone || errors.email) {
      alert('Please correct the errors before submitting.');
      return;
    }

    try {
      const response = await fetch('api/auth/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the message.');
    }
  };

  return (
    <div className="contact-page">
      <div className="left-section">
        <div className="back-btn-section">
          <img
            className="back-btn"
            src={back}
            alt="Go back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>

        <div className="text-container">
          <h1>We'd love to</h1>
          <h1>hear from you</h1>
        </div>
        <div className="circle-design"></div>
      </div>

      <div className="right-section">
        <h2>Contact us</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="contact-details">
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit →</button>
        </form>

        <div className="email-section">
          <p className="email-label">Email us</p>
          <p>enquiries@shariastock.com</p>
        </div>

        <div className="social-links">
          <a href="mailto:enquiries@shariastock.com" target="_blank" rel="noopener noreferrer">
            enquiries@shariastock.com
          </a>
          <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
