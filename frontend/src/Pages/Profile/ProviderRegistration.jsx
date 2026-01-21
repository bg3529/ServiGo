import React, { useState } from 'react';
import ProviderCard from '../../Components/ProviderCard/ProviderCard';
import './ProviderRegistration.css';

const ProviderRegistration = ({ currentUser }) => {
  const [providerCardData, setProviderCardData] = useState({
    name: currentUser?.name || "Professional Name",
    image: "https://via.placeholder.com/150",
    rating: "5.0",
    experience: "0 years experience",
    description: "Write a short bio about your services here...",
    price: "Rs. 0"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProviderCardData({ ...providerCardData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProviderCardData({ ...providerCardData, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="provider-registration-container">
      <h3>Provider Registration</h3>
      <div className="registration-split-layout">
        <div className="registration-form-side">
          <div className="input-group">
            <label>Provider Photo</label>
            <input type="file" onChange={handleImage} accept="image/*" />
          </div>
          <div className="input-group">
            <label>Business Name</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Starting Price</label>
              <input type="text" name="price" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Experience</label>
              <input type="text" name="experience" onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" maxLength="120" onChange={handleChange}></textarea>
          </div>
          <button className="final-submit-btn">Apply Now</button>
        </div>

        <div className="preview-side">
          <span className="preview-label">LIVE PREVIEW</span>
          <ProviderCard provider={providerCardData} onBook={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProviderRegistration;