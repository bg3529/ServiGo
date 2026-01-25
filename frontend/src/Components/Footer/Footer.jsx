import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">
            <img src="./images/servigologo.png" alt="ServiGo" />
           
          </div>
          <p>Your trusted service marketplace for all of life's needs.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>Email: support@servigo.com</p>
          <p>Phone: +977 1234567890</p>
          <p>Address: Dhulikhel, Kavre</p>
        </div>
      </div>
      <div className="copyright"> 
        &copy; 2026 ServiGo. All rights reserved.
      </div>
    </footer>
  );
}