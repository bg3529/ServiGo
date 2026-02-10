import React from 'react';
import { Star, MapPin, BadgeCheck, Tag, Clock, ShieldCheck } from 'lucide-react';
import './ProviderCard.css';

export default function ProviderCard({ provider, onBook }) {
  // Defensive check for tags array
  const tags = Array.isArray(provider.tags) ? provider.tags : [];

  // Use profile image as primary if available, otherwise fallback to service image
  const displayImage = provider.provider?.profile_image || provider.image;
  const isProfilePhoto = !!provider.provider?.profile_image;

  return (
    <div className="pro-card-v" onClick={onBook}>
      <div className="pro-img-wrapper">
        <img
          src={displayImage}
          alt={provider.name}
          className={isProfilePhoto ? 'provider-main-photo' : 'service-main-photo'}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300?text=ServiGo';
          }}
        />

        <div className="pro-card-overlay">
          <div className="pro-rating-badge">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{provider.rating || '5.0'}</span>
          </div>

          {provider.is_verified && (
            <div className="verified-pill" title="Verified Professional">
              <ShieldCheck size={14} />
              <span>Verified</span>
            </div>
          )}
        </div>

        <div className="pro-price-tag">
          <span className="price-num">Rs. {provider.price}</span>
          <span className="price-unit">/{provider.priceUnit}</span>
        </div>
      </div>

      <div className="pro-content-v">
        <div className="pro-info-section">
          <div className="pro-title-row">
            <h3 className="pro-title-v">{provider.name}</h3>
            <span className={`availability-dot ${provider.is_available ? 'online' : 'offline'}`}></span>
          </div>
          <p className="pro-service-name">{provider.title}</p>
        </div>

        <div className="pro-loc-row">
          <MapPin size={14} />
          <span>{provider.location || 'Kathmandu, Nepal'}</span>
        </div>

        <div className="pro-footer-v">
          <div className="pro-stat">
            <Clock size={14} />
            <span>{provider.reviewCount || 0} reviews</span>
          </div>
          <button className="pro-book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
}