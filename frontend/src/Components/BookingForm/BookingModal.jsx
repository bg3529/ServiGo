import React, { useState } from 'react';
import './BookingModal.css';

export default function BookingModal({ provider, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      alert("Please select both a date and a time slot.");
      return;
    }

    setIsSuccess(true);
    setTimeout(() => onClose(), 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isSuccess && <button className="close-x" onClick={onClose}>&times;</button>}
        
        {isSuccess ? (
          <div className="success-view">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your request has been sent to <strong>{provider.name}</strong>.</p>
            <p className="success-note">Closing in a moment...</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="category-path">
                <span>{provider.categoryName || "Service"}</span> 
                <span className="path-separator">/</span>
                <span>{provider.subCategoryName || "Booking"}</span>
              </div>
              <h2>Book Appointment</h2>
              <p>With <strong>{provider.name}</strong></p>
            </div>

            <form className="booking-form" onSubmit={handleConfirm}>
              <div className="form-group">
                <label>Appointment Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <select 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific details for the professional..."
                  rows="3"
                ></textarea>
              </div>

              <div className="booking-summary-box">
                <div className="summary-item">
                  <span>Service Fee</span>
                  <span>Rs. {provider.price}</span>
                </div>
                <div className="summary-total">
                  <span>Total Payable</span>
                  <span>Rs. {provider.price}</span>
                </div>
              </div>

              <button 
                type="submit" 
                className={`confirm-btn ${(!formData.date || !formData.time) ? 'disabled' : ''}`}
              >
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}