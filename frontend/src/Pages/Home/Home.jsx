import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import categories from '../../Data/CategoriesData';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    // Navigates to the subcategory list for this specific category
    navigate(`/services/${id}`);
  };

  return (
    <div className="home-container">
     
      <section className="home-hero">
        <div className="hero-content">
          <h1>Quality services, <span className="highlight">on demand</span></h1>
          <p>Find the best student housing, tutors, and professionals in Dhulikhel.</p>
          <div className="search-bar-mock">
            <input type="text" placeholder="What service are you looking for?" readOnly />
            <button>Search</button>
          </div>
        </div>
      </section>

      
      <section className="categories-section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p>Choose a category to find specific services</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onClick={handleCategoryClick} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}