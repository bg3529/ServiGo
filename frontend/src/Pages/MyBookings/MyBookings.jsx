import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { BookingService } from '../../services/api';
import { toast } from 'react-hot-toast';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await BookingService.getBookings();
      setBookings(data.results || data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      toast.error("Could not load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    const reason = window.prompt("Are you sure you want to cancel this booking? Please provide a reason:");
    if (reason === null) return; // User clicked Cancel

    try {
      await BookingService.cancelBooking(id, reason);
      toast.success("Booking cancelled successfully");
      fetchBookings(); // Refresh list
    } catch (error) {
      console.error("Failed to cancel booking", error);
      toast.error(error.response?.data?.error || "Failed to cancel booking");
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (!booking?.status) return false;
    const isHistory = ['completed', 'cancelled', 'rejected'].includes(booking.status.toLowerCase());
    return activeTab === 'history' ? isHistory : !isHistory;
  });

  const getStatusIcon = (status) => {
    if (!status) return <AlertCircle size={16} />;
    switch (status.toLowerCase()) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'pending': return <Clock3 size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      // Basic check if it's HH:MM:SS
      const [hours, minutes] = timeString.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch {
      return timeString || 'N/A';
    }
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Manage your appointments and view history</p>
      </div>

      <div className="bookings-tabs">
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Bookings
          {!loading && (
            <span className="tab-count">
              {bookings.filter(b => b.status && !['completed', 'cancelled', 'rejected'].includes(b.status.toLowerCase())).length}
            </span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Booking History
          {!loading && (
            <span className="tab-count">
              {bookings.filter(b => b.status && ['completed', 'cancelled', 'rejected'].includes(b.status.toLowerCase())).length}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="skeleton-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line medium"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <div className="empty-icon-box">
            <Calendar size={48} />
          </div>
          <h3>No {activeTab} bookings</h3>
          <p>
            {activeTab === 'active'
              ? "You don't have any upcoming appointments."
              : "You haven't completed any services yet."}
          </p>
          {activeTab === 'active' && (
            <button className="explore-btn" onClick={() => window.location.href = '/services'}>
              Find a Service
            </button>
          )}
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-image-container">
                <img
                  src={booking.service_details?.primary_image || 'https://via.placeholder.com/150'}
                  alt={booking.service_details?.title}
                  className="booking-image"
                />
                <div className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                  {getStatusIcon(booking.status)}
                  <span>{booking.status}</span>
                </div>
              </div>

              <div className="booking-content">
                <div className="booking-main-info">
                  <h3 className="service-title">{booking.service_details?.title || 'Service Title'}</h3>
                  <p className="provider-name">by {booking.provider_name || booking.service_details?.provider?.username || 'Provider'}</p>
                  <p className="booking-price">Rs. {booking.total_price}</p>
                </div>

                <div className="booking-details-grid">
                  <div className="detail-item">
                    <Calendar size={16} className="detail-icon" />
                    <span>{formatDate(booking.booking_date)}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} className="detail-icon" />
                    <span>{formatTime(booking.booking_time)}</span>
                  </div>
                  {booking.customer_address && (
                    <div className="detail-item full-width">
                      <MapPin size={16} className="detail-icon" />
                      <span>{booking.customer_address}</span>
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  {activeTab === 'active' && ['pending', 'confirmed'].includes(booking.status.toLowerCase()) && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}

                  {booking.status.toLowerCase() === 'completed' && (
                    <button className="review-btn">
                      Leave a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}