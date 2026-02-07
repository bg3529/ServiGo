import React from 'react';
import { Github, Users, Target, Heart } from 'lucide-react';
import './AboutUs.css';

export default function AboutUs() {
    const developers = [
        {
            name: 'Rajiv Anand Khanal',
            github: 'https://github.com/RajivAnandKhanal',
            username: 'RajivAnandKhanal'
        },
        {
            name: 'Nawaraj Pathak',
            github: 'https://github.com/navraj11-ku',
            username: 'navraj11-ku'
        },
        {
            name: 'Sudip Bayalkoti',
            github: 'https://github.com/Sudiip49',
            username: 'Sudiip49'
        },
        {
            name: 'Vipraja Dahal',
            github: 'https://github.com/viprajadahal',
            username: 'viprajadahal'
        },
        {
            name: 'Bandana Gyawali',
            github: 'https://github.com/bg3529',
            username: 'bg3529'
        }
    ];

    return (
        <div className="about-page">
            <div className="about-container">

                {/* Hero Section */}
                <section className="about-hero">
                    <div className="hero-icon">
                        <Heart size={48} />
                    </div>
                    <h1>About ServiGo</h1>
                    <p className="hero-subtitle">Connecting You with Trusted Professionals</p>
                </section>

                {/* Project Info */}
                <section className="project-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <Target size={32} />
                        </div>
                        <h2>Our Mission</h2>
                        <p>
                            A web platform that connects users with service providers such as plumbers,
                            electricians, tutors, and more. Allows users to search by category or location,
                            view ratings and reviews, and make service bookings directly through the platform.
                            We aim to simplify access to trusted professionals and streamline the process of
                            hiring skilled help.
                        </p>
                    </div>

                    <div className="info-card academic-card">
                        <div className="info-icon">
                            <Users size={32} />
                        </div>
                        <h2>Academic Project</h2>
                        <p>
                            This is a <strong>3rd Semester Project</strong> developed by a group of
                            Computer Engineering students from <strong>Kathmandu University</strong>.
                        </p>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-section">
                    <h2 className="section-title">Project Developers</h2>
                    <div className="developers-grid">
                        {developers.map((dev, index) => (
                            <div key={index} className="developer-card">
                                <div className="dev-avatar">
                                    <Users size={32} />
                                </div>
                                <h3>{dev.name}</h3>
                                <a
                                    href={dev.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    <Github size={18} />
                                    <span>@{dev.username}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Highlight */}
                <section className="features-highlight">
                    <h2>Platform Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-number">01</div>
                            <h3>Search by Category</h3>
                            <p>Find services across multiple categories easily</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">02</div>
                            <h3>Location-Based Search</h3>
                            <p>Discover service providers near you</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">03</div>
                            <h3>Ratings & Reviews</h3>
                            <p>Make informed decisions with user feedback</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">04</div>
                            <h3>Direct Bookings</h3>
                            <p>Book services seamlessly through our platform</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
