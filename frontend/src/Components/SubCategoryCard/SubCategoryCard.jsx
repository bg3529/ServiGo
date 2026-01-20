import React from 'react';
import './SubCategoryCard.css';

export default function SubCategoryCard({ subItem, onClick }) {
  return (
    <div className="service-card" onClick={() => onClick(subItem.id)}>
      <div className="card-image-wrapper">
        <img src={subItem.image} alt={subItem.name} />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{subItem.name}</h3>
        <span className="card-subtitle">At Home Service & Care</span>
        
        <div className="card-rating">
          <span className="star-icon">★</span>
          5.0 <span className="review-count">(1)</span>
        </div>
        
        <div className="card-price">
          {subItem.providerCount || "10+"} Providers Available
        </div>
        
        <p className="card-description">
          {subItem.description}
        </p>
        
        <button className="view-btn">
          View Professionals
        </button>
      </div>
    </div>
  );
}