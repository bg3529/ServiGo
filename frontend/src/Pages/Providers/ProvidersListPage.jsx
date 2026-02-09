import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import providers from '../../Data/ProvidersData';
import subCategories from '../../Data/SubCategoriesData';
import categories from '../../Data/CategoriesData';
import ProviderCard from '../../Components/ProviderCard/ProviderCard';
import BookingModal from '../../Components/BookingForm/BookingModal';
import './ProvidersListPage.css';

export default function ProviderListPage() {
  const { subId } = useParams();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSub = subCategories.find(s => s.id === parseInt(subId));
  const parentCat = categories.find(c => c.id === currentSub?.categoryId);

  const filteredProviders = providers.filter(
    (pro) => pro.subCategoryId === parseInt(subId)
  );

  const handleOpenBooking = (provider) => {
    setSelectedProvider({
      ...provider,
      categoryName: parentCat?.name,
      subCategoryName: currentSub?.name
    });
    setIsModalOpen(true);
  };

  return (
    <div className="list-container">
      <nav className="breadcrumb-nav">
        <Link to="/home" className="breadcrumb-link"><Home size={14} /> Home</Link>
        <ChevronRight size={14} className="sep" />
        <Link to={`/services/${parentCat?.id}`} className="breadcrumb-link">
          {parentCat?.name}
        </Link>
        <ChevronRight size={14} className="sep" />
        <span className="breadcrumb-active">{currentSub?.name}</span>
      </nav>

      <div className="subcat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1>{currentSub?.name} Professionals</h1>
        <p>Expert providers for {currentSub?.name} in {parentCat?.name}.</p>
      </div>

      <div className="grid-layout-pro">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((pro) => (
            <ProviderCard
              key={pro.id}
              provider={pro}
              onBook={() => handleOpenBooking(pro)}
            />
          ))
        ) : (
          <div className="no-providers">
            <p>No professionals found for this service yet.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <BookingModal
          provider={selectedProvider}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}