import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import subcategories from '../../Data/SubCategoriesData';
import categories from '../../Data/CategoriesData';
import SubCategoryCard from '../../Components/SubCategoryCard/SubCategoryCard';
import './SubCategoryPage.css';

export default function SubCategoryPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const currentCat = categories.find(c => c.id === parseInt(id));

  const filteredSubCategories = subcategories.filter(
    (sub) => sub.categoryId === parseInt(id)
  );

  return (
    <div className="list-container">
      <nav className="breadcrumb-nav">
        <Link to="/home" className="breadcrumb-link"><Home size={14}/> Home</Link>
        <ChevronRight size={14} className="sep" />
        <span className="breadcrumb-active">{currentCat?.name} Services</span>
      </nav>

      <div className="subcat-header">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          ← Back to Categories
        </button>
        <h1>{currentCat?.name}</h1>
        <p>Select a specific service in {currentCat?.name} to see available professionals.</p>
      </div>

      <div className="grid-layout">
        {filteredSubCategories.map((sub) => (
          <SubCategoryCard 
            key={sub.id} 
            subItem={sub} 
            onClick={(subId) => navigate(`/providers/${subId}`)} 
          />
        ))}
      </div>
    </div>
  );
}