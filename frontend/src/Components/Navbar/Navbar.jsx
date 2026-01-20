import React from 'react';
import { User, Calendar, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        
        <Link to="/home" className="logo-section">
          <div className="logo-icon">
            <img src="./images/servigologo.png" alt="ServiGo Logo" />
          </div>
        </Link>

        <nav className="desktop-nav">
          <Link to="/profile" className="nav-item">
            <User size={20} />
            <span>My Profile</span>
          </Link>

          <Link to="/my-bookings" className="nav-item">
            <Calendar size={20} />
            <span>My Bookings</span>
          </Link>

          <button onClick={handleLogout} className="nav-item logout-btn">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>

      </div>
    </header>
  );
}