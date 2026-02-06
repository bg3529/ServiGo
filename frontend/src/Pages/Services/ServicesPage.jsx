import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Home, ChevronRight, Search, Filter } from 'lucide-react';
import api from '../../services/api';
import ProviderCard from '../../Components/ProviderCard/ProviderCard';
import BookingModal from '../../Components/BookingForm/BookingModal';
import './ServicesPage.css';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Extract query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        setSearchQuery(q);
        fetchServices(q);
    }, [location.search]);

    const fetchServices = async (query) => {
        setLoading(true);
        try {
            // Use the search endpoint we confirmed exists in backend
            const response = await api.get(`/services/services/search/?q=${encodeURIComponent(query)}`);
            setServices(response.data.results || response.data); // Handle paginated or list response
            setError(null);
        } catch (err) {
            console.error("Error fetching services:", err);
            setError("Failed to load services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = (service) => {
        // Adapter to match ProviderCard expectation (if needed) or pass service directly
        // ProviderCard expects 'provider' object. 
        // The backend returns Service objects which contain provider info.
        // We might need to adapt the data structure if ProviderCard is strict.
        // Looking at ProviderCard usage in ProviderListPage: it passes whole 'pro' object.

        // For now, let's assume we pass the service object as the provider for booking
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="services-page-container">
            <nav className="breadcrumb-nav">
                <Link to="/home" className="breadcrumb-link"><Home size={14} /> Home</Link>
                <ChevronRight size={14} className="sep" />
                <span className="breadcrumb-active">Search Results</span>
            </nav>

            <div className="services-header">
                <h1>Find Your Service</h1>
                <form onSubmit={handleSearchSubmit} className="search-bar-active">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for services..."
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="services-content">
                {loading ? (
                    <div className="loading-state">Loading services...</div>
                ) : error ? (
                    <div className="error-state">{error}</div>
                ) : services.length > 0 ? (
                    <div className="services-grid">
                        {services.map(service => (
                            <ProviderCard
                                key={service.id}
                                provider={{
                                    ...service,
                                    // Map backend fields to what ProviderCard might expect if different
                                    name: service.provider?.first_name ? `${service.provider.first_name} ${service.provider.last_name}` : service.provider?.username || 'Provider',
                                    image: service.primary_image || 'https://via.placeholder.com/150',
                                    rating: service.rating || 5.0,
                                    reviewCount: service.total_reviews || 0,
                                    price: service.price,
                                    priceUnit: service.price_unit,
                                    categoryName: service.category?.name,
                                    description: service.description
                                }}
                                onBook={() => handleBooking(service)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No services found for "{searchQuery}"</h3>
                        <p>Try checking your spelling or search for something else.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <BookingModal
                    provider={selectedService} // Verify if BookingModal expects service or provider
                    onClose={() => setIsModalOpen(false)}
                    onConfirmBooking={() => {
                        setIsModalOpen(false);
                        // Add booking logic or refresh
                    }}
                />
            )}
        </div>
    );
}
