import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinOff, ArrowLeft, Home as HomeIcon } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-illustration">
                    <div className="floating-icon">
                        <MapPinOff size={100} strokeWidth={1.5} />
                    </div>
                    <div className="shadow"></div>
                </div>

                <h1 className="notfound-title">404</h1>
                <h2 className="notfound-subtitle">Lost in the Service Map?</h2>
                <p className="notfound-text">
                    The page you're looking for seems to have vanished or moved to a different neighborhood.
                </p>

                <div className="notfound-actions">
                    {/* <button
                        className="btn-primary"
                        onClick={() => navigate('/home')}
                    >
                        <HomeIcon size={18} />
                        Back to Home
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
