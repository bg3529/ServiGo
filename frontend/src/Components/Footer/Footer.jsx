import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Smartphone, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">

        {/* Brand & Newsletter Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="/images/servigologo.png" alt="ServiGo" onError={(e) => { e.target.style.display = 'none' }} />
            <span>ServiGo</span>
          </div>
          <p className="brand-desc">
            Your trusted marketplace for all service needs. Connecting you with top-rated professionals instantly.
          </p>

          <div className="newsletter-box">
            <h4>Subscribe to our newsletter</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Enter your email" />
              <button><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><Link to="/services">All Services</Link></li>
            <li><Link to="/services?category=Cleaning">Home Cleaning</Link></li>
            <li><Link to="/services?category=Plumbing">Plumbing</Link></li>
            <li><Link to="/services?category=Electrical">Electrical</Link></li>
            <li><Link to="/services?category=Moving">Moving & Packers</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer-col">
          <h3>Connect</h3>
          <ul className="contact-list">
            <li><Mail size={16} /> support@servigo.com</li>
            <li><Smartphone size={16} /> +977 123 456 7890</li>
            <li><MapPin size={16} /> Dhulikhel, Kavre</li>
          </ul>

          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          &copy; {new Date().getFullYear()} ServiGo. All rights reserved.
        </div>
        <div className="legal-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}