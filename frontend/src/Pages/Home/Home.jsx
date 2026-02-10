import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import categories from '../../Data/CategoriesData';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (id) => {
    // Navigates to the subcategory list for this specific category
    // navigate(`/services/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-container">

      <section className="home-hero">
        <div className="hero-content">
          <h1>Quality services, <span className="highlight">on demand</span></h1>
          <p>Find the best student housing, tutors, and professionals in Dhulikhel.</p>
          <form className="search-bar-mock" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What service are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
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