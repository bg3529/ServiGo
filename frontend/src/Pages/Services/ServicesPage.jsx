import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Home, ChevronRight, Search, Filter, Wrench, Sparkles, Truck, Zap, Coffee, MoreHorizontal, X } from 'lucide-react';
import { ServiceService } from '../../services/api';
import ProviderCard from '../../Components/ProviderCard/ProviderCard';
import BookingModal from '../../Components/BookingForm/BookingModal';
import './ServicesPage.css';

// Map common category names to Lucide icons
const categoryIcons = {
    'Cleaning': Sparkles,
    'Plumbing': Wrench,
    'Electrical': Zap,
    'Moving': Truck,
    'Painting': Wrench,
    'Repair': Wrench,
    'Other': MoreHorizontal
};

export default function ServicesPage() {
    // Data state
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    // New filters
    const [locationFilter, setLocationFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Initial load: Fetch categories & parse URL params
    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        const cat = params.get('category');
        const sort = params.get('sort') || 'newest';

        const loc = params.get('location') || '';
        const minP = params.get('min_price') || '';
        const maxP = params.get('max_price') || '';
        const minR = params.get('min_rating') || '';

        setSearchQuery(q);
        if (cat) setSelectedCategory(cat);
        setSortBy(sort);

        setLocationFilter(loc);
        setMinPrice(minP);
        setMaxPrice(maxP);
        setMinRating(minR);

        fetchServices(q, cat, sort, loc, minP, maxP, minR);
    }, [location.search]);

    const fetchCategories = async () => {
        try {
            const data = await ServiceService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to load categories", err);
        }
    };

    const fetchServices = async (query, category, sort, loc, minP, maxP, minR) => {
        setLoading(true);
        try {
            const params = {
                search: query,
                ordering: getSortParam(sort),
            };
            if (category) params.category = category;
            if (loc) params.location = loc;
            if (minP) params.min_price = minP;
            if (maxP) params.max_price = maxP;
            if (minR) params.min_rating = minR;

            const data = await ServiceService.getServices(params);
            setServices(data.results || data);
            setError(null);
        } catch (err) {
            console.error("Error fetching services:", err);
            setError("Failed to load services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getSortParam = (sortStr) => {
        switch (sortStr) {
            case 'price_low': return 'price';
            case 'price_high': return '-price';
            case 'rating': return '-rating';
            case 'oldest': return 'created_at';
            default: return '-created_at'; // newest
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters(searchQuery, selectedCategory, sortBy, locationFilter, minPrice, maxPrice, minRating);
    };

    const handleCategoryClick = (catId) => {
        const newCat = selectedCategory === catId ? null : catId;
        setSelectedCategory(newCat);
        applyFilters(searchQuery, newCat, sortBy, locationFilter, minPrice, maxPrice, minRating);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortBy(newSort);
        applyFilters(searchQuery, selectedCategory, newSort, locationFilter, minPrice, maxPrice, minRating);
    };

    const applyFilters = (q, cat, sort, loc, minP, maxP, minR) => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (cat) params.set('category', cat);
        if (sort !== 'newest') params.set('sort', sort);

        if (loc) params.set('location', loc);
        if (minP) params.set('min_price', minP);
        if (maxP) params.set('max_price', maxP);
        if (minR) params.set('min_rating', minR);

        navigate(`/services?${params.toString()}`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory(null);
        setSortBy('newest');
        navigate('/services');
    };

    const handleBooking = (service) => {
        const formattedProvider = {
            ...service,
            name: service.provider?.full_name || 'Service Provider',
            image: service.primary_image || (service.images && service.images[0]?.image) || 'https://via.placeholder.com/300',
            rating: service.rating || 5.0,
            reviewCount: service.total_reviews || 0,
            price: service.price,
            priceUnit: service.price_unit || 'hr',
            categoryName: service.category?.name,
            description: service.description
        };
        setSelectedService(formattedProvider);
        setIsModalOpen(true);
    };

    // Helper to get icon for category
    const getCategoryIcon = (catName) => {
        // Simple fuzzy match or fallback
        const Icon = categoryIcons[catName] || categoryIcons[Object.keys(categoryIcons).find(k => catName.includes(k))] || categoryIcons['Other'];
        return <Icon size={20} />;
    };

    return (
        <div className="services-page">
            <nav className="breadcrumb-nav">
                <Link to="/home" className="breadcrumb-link"><Home size={14} /> Home</Link>
                <ChevronRight size={14} className="sep" />
                <span className="breadcrumb-active">Search Results</span>
            </nav>

            <div className="services-header">
                <h1>Find Your Service</h1>
                <form onSubmit={handleSearchSubmit} className="services-search-container">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for services (e.g. cleaning, plumbing)..."
                    />
                    <button type="submit">Search</button>
                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={() => { setSearchQuery(''); applyFilters('', selectedCategory, sortBy); }}
                            style={{ right: '110px', background: 'transparent', color: '#999', width: 'auto', padding: '0 10px' }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </form>
            </div>

            <div className="services-grid-container">
                {/* Filters Bar */}
                <div className="filters-bar">
                    <div className="categories-scroll">
                        <button
                            className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(null)}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-chip ${selectedCategory == cat.id ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat.id)}
                            >
                                {cat.icon ? <img src={cat.icon} alt="" className="cat-icon-img" /> : getCategoryIcon(cat.name)}
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="filters-right">
                        <button
                            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={18} /> Filters
                        </button>

                        <div className="sort-filter">
                            <select value={sortBy} onChange={handleSortChange} className="sort-select">
                                <option value="newest">Newest First</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Expanded Filters Area */}
                {showFilters && (
                    <div className="expanded-filters">
                        <div className="filter-group">
                            <label>Location</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    placeholder="Enter city or area..."
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Price Range</label>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    min="0"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Rating</label>
                            <select
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                            >
                                <option value="">Any Rating</option>
                                <option value="4">4 Stars & Up</option>
                                <option value="3">3 Stars & Up</option>
                                <option value="2">2 Stars & Up</option>
                            </select>
                        </div>

                        <div className="filter-actions">
                            <button
                                className="apply-btn"
                                onClick={() => applyFilters(searchQuery, selectedCategory, sortBy, locationFilter, minPrice, maxPrice, minRating)}
                            >
                                Apply
                            </button>
                            <button
                                className="reset-btn"
                                onClick={() => {
                                    setLocationFilter('');
                                    setMinPrice('');
                                    setMaxPrice('');
                                    setMinRating('');
                                    // Don't apply immediately, let user decide or apply clearFilters() if they want total reset
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Finding the best services for you...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => fetchServices(searchQuery, selectedCategory, sortBy)}>Try Again</button>
                    </div>
                ) : services.length > 0 ? (
                    <div className="services-grid">
                        {services.map(service => (
                            <ProviderCard
                                key={service.id}
                                provider={{
                                    ...service,
                                    name: service.provider?.full_name || 'Service Provider',
                                    image: service.primary_image || (service.images && service.images[0]?.image) || 'https://via.placeholder.com/300',
                                    rating: service.rating || 5.0,
                                    reviewCount: service.total_reviews || 0,
                                    price: service.price,
                                    priceUnit: service.price_unit || 'hr',
                                    categoryName: service.category?.name,
                                    description: service.description
                                }}
                                onBook={() => handleBooking(service)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <div className="no-res-icon">🔍</div>
                        <h3>No services found</h3>
                        <p>We couldn't find any services matching your criteria.</p>
                        <button onClick={clearFilters} className="clear-filters-btn">Clear all filters</button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <BookingModal
                    provider={selectedService}
                    onClose={() => setIsModalOpen(false)}
                    onConfirmBooking={() => {
                        setIsModalOpen(false);
                        // Ideally trigger a toast here
                    }}
                />
            )}
        </div>
    );
}
