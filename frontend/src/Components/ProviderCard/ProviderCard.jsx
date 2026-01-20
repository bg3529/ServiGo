import React from 'react';
import './ProviderCard.css';

export default function ProviderCard({ provider, onBook }) {
  return (
    <div className="pro-card-v" onClick={onBook}>
      <div className="pro-img-wrapper">
        <img src={provider.image} alt={provider.name} />
        <span className="pro-top-badge">Top Rated</span>
      </div>
      
      <div className="pro-content-v">
        <h3 className="pro-title-v">{provider.name}</h3>
        
        <div className="pro-meta-v">
          <span className="pro-star"><span className="star-icon">★</span> {provider.rating}</span>
          <span className="pro-experience">8 years experience</span>
        </div>

        <p className="pro-desc-v">{provider.description}</p>
        
        <div className="pro-footer-v">
          <div className="pro-price-v">
            <span className="price-label-v">Starting from</span>
            <span className="price-val-v">{provider.price}</span>
          </div>
          <button className="pro-btn-v">Book Now</button>
        </div>
      </div>
    </div>
  );
}