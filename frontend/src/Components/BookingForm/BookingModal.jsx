import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, MessageSquare, Hourglass, X } from 'lucide-react';
import { BookingService } from '../../services/api';
import { toast } from 'react-hot-toast';
import './BookingModal.css';

export default function BookingModal({ provider, onClose, onConfirmBooking }) {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: 1,
    address: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.date || !formData.time || !formData.address || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const bookingDate = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        service: provider.id,
        booking_date: bookingDate.toISOString(),
        duration: parseInt(formData.duration),
        customer_address: formData.address,
        contact_phone: formData.phone,
        notes: formData.notes
      };

      const response = await BookingService.createBooking(payload);

      setIsSuccess(true);
      toast.success("Booking request sent successfully!");
      if (onConfirmBooking) onConfirmBooking(response);

      setTimeout(() => {
        onClose();
        navigate('/my-bookings');
      }, 3000);
    } catch (err) {
      console.error("Booking failed", err);
      setError(err.response?.data?.detail || err.response?.data?.error || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const match = price.match(/(\d+(?:\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  };

  const numericPrice = getNumericPrice(provider.price);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isSuccess && (
          <button className="close-x" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        )}

        <div className="modal-inner">
          {isSuccess ? (
            <div className="success-view">
              <div className="success-icon">✓</div>
              <h2>Booking Confirmed!</h2>
              <p>Your request has been sent to <strong>{provider.name}</strong>.</p>
              <p className="success-note">Redirecting to your bookings...</p>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <span className="modal-badge">{provider.categoryName || "Premium Service"}</span>
                <div className="provider-profile-header">
                  {provider.provider?.profile_image && (
                    <img
                      src={provider.provider.profile_image}
                      alt={provider.provider.full_name}
                      className="provider-header-avatar"
                    />
                  )}
                  <div className="provider-header-info">
                    <h2>Book Service</h2>
                    <p>with <strong>{provider.name}</strong></p>
                  </div>
                </div>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <form className="booking-form" onSubmit={handleConfirm}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <div className="input-wrapper">
                      <Calendar className="input-icon" size={18} />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <div className="input-wrapper">
                      <Clock className="input-icon" size={18} />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Duration (Hours)</label>
                  <div className="input-wrapper">
                    <Hourglass className="input-icon" size={18} />
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      max="24"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Address</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Where should the professional arrive?"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Contact Phone</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Instructions</label>
                  <div className="input-wrapper">
                    <MessageSquare className="input-icon" style={{ top: '14px' }} size={18} />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific details you want to share..."
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <div className="booking-summary-box">
                  <div className="summary-item">
                    <span>Service Rate</span>
                    <span>Rs. {numericPrice}/{provider.priceUnit || 'hr'}</span>
                  </div>
                  <div className="summary-total">
                    <span>Estimated Total</span>
                    <span>Rs. {numericPrice * formData.duration}</span>
                  </div>
                </div>

                <button type="submit" className="confirm-btn" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}