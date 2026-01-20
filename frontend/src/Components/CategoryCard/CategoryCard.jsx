import React from 'react';
import './CategoryCard.css';

export default function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={() => onClick(category.id)}>
      <div className={`category-icon-wrapper ${category.color}`}>
        <span className="category-emoji">{category.icon}</span>
      </div>
      <h3 className="category-title">{category.name}</h3>
      <p className="category-subtitle">Explore Services</p>
    </div>
  );
}