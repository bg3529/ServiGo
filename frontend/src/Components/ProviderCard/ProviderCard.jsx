import React from 'react';
import { Star, MapPin, BadgeCheck, Tag, Clock } from 'lucide-react';
import './ProviderCard.css';

export default function ProviderCard({ provider, onBook }) {
  // Defensive check for tags array
  const tags = Array.isArray(provider.tags) ? provider.tags : [];

  return (
    <div className="pro-card-v" onClick={onBook}>
      <div className="pro-img-wrapper">
        <img src={provider.image} alt={provider.name} onError={(e) => e.target.style.display = 'none'} />
        <span className="pro-top-badge">Top Rated</span>
        {provider.is_verified && (
          <span className="verified-badge" title="Verified Provider">
            <BadgeCheck size={16} fill="#3b82f6" color="white" />
          </span>
        )}
      </div>

      <div className="pro-content-v">
        <div className="pro-header">
          <h3 className="pro-title-v">{provider.name}</h3>
          {provider.is_available ? (
            <span className="status-dot online" title="Available Now"></span>
          ) : (
            <span className="status-dot offline" title="Unavailable"></span>
          )}
        </div>

        <div className="pro-meta-v">
          <span className="pro-star"><Star size={14} fill="#FFD700" color="#FFD700" /> {provider.rating} ({provider.reviewCount})</span>
          {provider.location && (
            <span className="pro-loc"><MapPin size={14} /> {provider.location}</span>
          )}
        </div>

        <p className="pro-desc-v">{provider.description}</p>

        {tags.length > 0 && (
          <div className="pro-tags">
            <Tag size={12} className="tag-icon" />
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="pro-tag">{typeof tag === 'string' ? tag : tag.name}</span>
            ))}
            {tags.length > 3 && <span className="pro-tag-more">+{tags.length - 3}</span>}
          </div>
        )}

        <div className="pro-footer-v">
          <div className="pro-price-v">
            <span className="price-label-v">Starting from</span>
            <span className="price-val-v">Rs. {provider.price}/{provider.priceUnit}</span>
          </div>
          <button className="pro-btn-v">Book Now</button>
        </div>
      </div>
    </div>
  );
}