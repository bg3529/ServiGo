import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api';
import ProviderCard from '../../Components/ProviderCard/ProviderCard';
import { Briefcase, Upload, DollarSign, Clock, FileText, User } from 'lucide-react';
import toast from 'react-hot-toast';
import './BecomeProvider.css';

const BecomeProvider = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    const [providerCardData, setProviderCardData] = useState({
        name: currentUser?.name || currentUser?.username || "Your Name",
        image: null,
        rating: "New",
        experience: "0 years",
        description: "",
        price: "",
        category: "Cleaning" // Default category
    });

    const categories = [
        "Cleaning",
        "Plumbing",
        "Electrical",
        "Moving",
        "Painting",
        "Carpentry",
        "Gardening",
        "Beauty",
        "Tutoring"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProviderCardData({ ...providerCardData, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProviderCardData({ ...providerCardData, image: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the API
            await AuthService.becomeProvider(providerCardData);

            // Update local storage user data
            const updatedUser = { ...currentUser, is_provider: true };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success("Congratulations! You are now a service provider.");

            // Navigate to dashboard
            setTimeout(() => {
                navigate('/dashboard');
                window.location.reload(); // Reload to refresh navbar
            }, 1500);
        } catch (error) {
            console.error("Error becoming provider:", error);
            toast.error(error.response?.data?.error || "Failed to submit application. Please try again.");
        }
    };

    return (
        <div className="become-provider-page">
            <div className="provider-hero">
                <div className="hero-content">
                    <h1>Become a Service Provider</h1>
                    <p>Join our network of elite professionals and grow your business with ServiGo.</p>
                </div>
            </div>

            <div className="provider-registration-container">
                <div className="registration-split-layout">
                    {/* Form Side */}
                    <div className="registration-form-side">
                        <div className="form-header">
                            <h2>Provider Application</h2>
                            <p>Fill out the details below to create your professional profile</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label><Upload size={18} /> Profile Photo</label>
                                <div className="file-upload-wrapper">
                                    <input type="file" onChange={handleImage} accept="image/*" className="file-input" />
                                    <div className="file-upload-placeholder">
                                        {providerCardData.image ? 'Change Photo' : 'Click to Upload Profile Photo'}
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label><User size={18} /> Business / Display Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={providerCardData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John's Plumbing Services"
                                    required
                                />
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label><Briefcase size={18} /> Category</label>
                                    <select name="category" value={providerCardData.category} onChange={handleChange}>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label><Clock size={18} /> Experience</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={providerCardData.experience}
                                        onChange={handleChange}
                                        placeholder="e.g. 5 years"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label><DollarSign size={18} /> Starting Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={providerCardData.price}
                                    onChange={handleChange}
                                    placeholder="e.g. $50/hr"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label><FileText size={18} /> Description</label>
                                <textarea
                                    name="description"
                                    maxLength="200"
                                    value={providerCardData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your services, expertise, and what makes you stand out..."
                                    rows="4"
                                    required
                                ></textarea>
                                <span className="char-count">{providerCardData.description.length}/200</span>
                            </div>

                            <button type="submit" className="final-submit-btn">
                                Submit Application
                            </button>
                        </form>
                    </div>

                    {/* Preview Side */}
                    <div className="preview-side">
                        <div className="preview-sticky">
                            <span className="preview-label">LIVE PREVIEW</span>
                            <p className="preview-hint">This is how your card will appear to customers</p>
                            <div className="card-wrapper">
                                <ProviderCard provider={{
                                    ...providerCardData,
                                    image: providerCardData.image || "https://via.placeholder.com/150",
                                    bio: providerCardData.description
                                }} onBook={() => toast('This is a preview mode')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeProvider;
