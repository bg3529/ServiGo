import React, { useState, useEffect, useRef } from 'react';
import { User, Calendar, LogOut, Search, HelpCircle, Menu, X, ChevronDown, Bell, LayoutDashboard, Briefcase, Info, Plus } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthService, NotificationService } from '../../services/api';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotiDropdownOpen, setIsNotiDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notiDropdownRef = useRef(null);

  // Fetch notifications and upcoming bookings
  const fetchData = async () => {
    if (!AuthService.getCurrentUser()) return;
    try {
      // Fetch regular notifications
      const notiData = await NotificationService.getNotifications();
      setNotifications(notiData);
      setUnreadCount(notiData.filter(n => !n.is_read).length);

      // Fetch upcoming bookings as "necessary" alerts
      try {
        const upcomingData = await BookingService.getUpcomingBookings();
        setUpcomingBookings(upcomingData);
      } catch (err) {
        console.error("Failed to fetch upcoming bookings:", err);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notiDropdownRef.current && !notiDropdownRef.current.contains(event.target)) {
        setIsNotiDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotiDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    AuthService.logout();
    toast.success("Successfully logged out");
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">

        {/* Logo */}
        <Link to="/home" className="logo-section">
          <div className="logo-icon">
            <img src="/images/servigologo.png" alt="ServiGo" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <span className="logo-text">ServiGo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link to="/services" className={`nav-item ${isActive('/services')}`}>
            <Search size={18} />
            <span>Services</span>
          </Link>

          <Link to="/my-bookings" className={`nav-item ${isActive('/my-bookings')}`}>
            <Calendar size={18} />
            <span>Bookings</span>
          </Link>

          <Link to="/about" className={`nav-item ${isActive('/about')}`}>
            <Info size={18} />
            <span>About Us</span>
          </Link>

          <Link to="/help" className={`nav-item ${isActive('/help')}`}>
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>

          {!AuthService.getCurrentUser()?.is_provider && (
            <Link to="/become-provider" className={`nav-item ${isActive('/become-provider')}`}>
              <Briefcase size={18} />
              <span>Become a Provider</span>
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Notification Bell */}
          <div className="profile-dropdown-container" ref={notiDropdownRef}>
            <button
              className="icon-btn"
              onClick={() => setIsNotiDropdownOpen(!isNotiDropdownOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-dot"></span>}
            </button>

            {isNotiDropdownOpen && (
              <div className="dropdown-menu notifications-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={handleMarkAllRead} className="mark-all-btn">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {/* Upcoming Necessary Alerts */}
                  {upcomingBookings.length > 0 && (
                    <div className="upcoming-alerts-section">
                      <div className="section-divider">Upcoming Bookings</div>
                      {upcomingBookings.map(booking => (
                        <div key={booking.id} className="notification-item upcoming" onClick={() => navigate(`/my-bookings`)}>
                          <div className="notification-icon upcoming">
                            <Calendar size={18} />
                          </div>
                          <div className="notification-info">
                            <div className="notification-title">Reminder: {booking.service_details?.title}</div>
                            <div className="notification-message">
                              Scheduled for {new Date(booking.booking_date).toLocaleDateString()} at {new Date(booking.booking_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="notification-status-badge">{booking.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Regular Notifications */}
                  {notifications.length > 0 ? (
                    <>
                      {upcomingBookings.length > 0 && <div className="section-divider">Older Notifications</div>}
                      {notifications.map(noti => (
                        <div
                          key={noti.id}
                          className={`notification-item ${!noti.is_read ? 'unread' : ''}`}
                          onClick={() => handleMarkAsRead(noti.id)}
                        >
                          <div className="notification-icon">
                            <Bell size={18} />
                          </div>
                          <div className="notification-info">
                            <div className="notification-title">{noti.title}</div>
                            <div className="notification-message">{noti.message}</div>
                            <div className="notification-time">{formatTime(noti.created_at)}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    upcomingBookings.length === 0 && (
                      <div className="no-notifications">
                        No notifications yet
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="profile-dropdown-container" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="user-avatar-placeholder">
                <User size={20} />
              </div>
              <ChevronDown size={14} className={`chevron ${isProfileDropdownOpen ? 'rotate' : ''}`} />
            </button>

            {isProfileDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <User size={16} /> Profile
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link to="/my-bookings" className="dropdown-item">
                  <Calendar size={16} /> My Bookings
                </Link>
                <Link to="/services" className="dropdown-item">
                  <Briefcase size={16} /> Services
                </Link>
                <Link to="/about" className="dropdown-item">
                  <Info size={16} /> About Us
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-nav-item">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/services" className="mobile-nav-item">
            <Search size={20} /> Services
          </Link>
          <Link to="/my-bookings" className="mobile-nav-item">
            <Calendar size={20} /> My Bookings
          </Link>
          <Link to="/about" className="mobile-nav-item">
            <Info size={20} /> About Us
          </Link>
          <Link to="/help" className="mobile-nav-item">
            <HelpCircle size={20} /> Help
          </Link>
          <Link to="/profile" className="mobile-nav-item">
            <User size={20} /> Profile
          </Link>
          <button onClick={handleLogout} className="mobile-nav-item logout">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      )}
    </header>
  );
}