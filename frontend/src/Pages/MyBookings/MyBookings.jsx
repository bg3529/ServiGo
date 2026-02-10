import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, XCircle, Clock3, User, ChevronRight, AlertTriangle, X } from 'lucide-react';
import { BookingService } from '../../services/api';
import { toast } from 'react-hot-toast';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  // Cancellation Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [submittingCancel, setSubmittingCancel] = useState(false);

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

  const handleCancelClick = (id) => {
    setCancelingId(id);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    setSubmittingCancel(true);
    try {
      await BookingService.cancelBooking(cancelingId, cancelReason);
      toast.success("Booking cancelled successfully");
      setShowCancelModal(false);
      fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking", error);
      toast.error(error.response?.data?.error || "Failed to cancel booking");
    } finally {
      setSubmittingCancel(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (!booking?.status) return false;
    const isHistory = ['completed', 'cancelled', 'rejected'].includes(booking.status.toLowerCase());
    return activeTab === 'history' ? isHistory : !isHistory;
  });

  const getStatusIcon = (status) => {
    if (!status) return <AlertCircle size={14} />;
    switch (status.toLowerCase()) {
      case 'confirmed': return <CheckCircle size={14} />;
      case 'pending': return <Clock3 size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
    } catch {
      return 'Date TBD';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time TBD';
    try {
      const [hours, minutes] = timeString.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch {
      return timeString || 'Time TBD';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Keep track of your upcoming and past services.</p>
      </div>

      <div className="bookings-tabs">
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
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
          History
          {!loading && (
            <span className="tab-count">
              {bookings.filter(b => b.status && ['completed', 'cancelled', 'rejected'].includes(b.status.toLowerCase())).length}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading your bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <div className="empty-icon-box">
            <Calendar size={32} />
          </div>
          <h3>No bookings found</h3>
          <p>
            {activeTab === 'active'
              ? "You don't have any active appointments scheduled."
              : "Your booking history is currently empty."}
          </p>
          {activeTab === 'active' && (
            <button className="explore-btn" onClick={() => window.location.href = '/services'}>
              Explore Services
            </button>
          )}
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-image-container">
                <img
                  src={booking.service_details?.primary_image || 'https://via.placeholder.com/300?text=ServiGo'}
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
                  <div className="provider-info-group">
                    {booking.service_details?.provider?.profile_image && (
                      <img
                        src={booking.service_details.provider.profile_image}
                        alt={booking.provider_full_name}
                        className="provider-card-avatar"
                      />
                    )}
                    <div>
                      <h3 className="service-title">{booking.service_details?.title || 'Service Title'}</h3>
                      <p className="provider-name">
                        by <strong>{booking.provider_full_name || booking.provider_name || 'Professional'}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="booking-price">Rs. {booking.total_price}</div>
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
                      onClick={() => handleCancelClick(booking.id)}
                    >
                      Cancel
                    </button>
                  )}

                  {booking.status.toLowerCase() === 'confirmed' && (
                    <button className="review-btn" disabled>
                      Chat with Provider
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

      {/* Custom Cancellation Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content cancel-modal">
            <button className="close-x" onClick={() => setShowCancelModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-inner">
              <div className="cancel-header">
                <div className="warning-icon-box">
                  <AlertTriangle size={32} />
                </div>
                <h2>Cancel Booking?</h2>
                <p>Please let us know why you need to cancel this service.</p>
              </div>

              <div className="form-group">
                <label>Reason for Cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g., Change of plans, emergency, etc."
                  rows="4"
                  className="cancel-textarea"
                ></textarea>
              </div>

              <div className="cancel-actions">
                <button
                  className="confirm-cancel-btn"
                  onClick={confirmCancel}
                  disabled={submittingCancel}
                >
                  {submittingCancel ? 'Cancelling...' : 'Yes, Cancel Booking'}
                </button>
                <button
                  className="keep-booking-btn"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}