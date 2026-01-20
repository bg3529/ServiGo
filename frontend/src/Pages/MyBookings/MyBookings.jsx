import React from 'react';
import { Calendar, Clock, Package, Trash2 } from 'lucide-react';
import './MyBookings.css';

export default function MyBookings({ bookings = [], onCancel }) {
  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your upcoming and past service appointments</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-box">
            <Package size={48} />
          </div>
          <h3>No Bookings Found</h3>
          <p>You haven't scheduled any services yet. Explore our categories to get started.</p>
          <button className="explore-btn" onClick={() => window.location.href = '/home'}>
            Explore Services
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card-item">
              <div className="card-top">
                <div className="provider-info">
                  <h3>{booking.providerName}</h3>
                  <span className="service-tag">{booking.serviceType}</span>
                </div>
                <div className="status-badge-container">
                  <span className={`status-pill ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="card-middle">
                <div className="detail-row">
                  <Calendar size={16} />
                  <span>{booking.date}</span>
                </div>
                <div className="detail-row">
                  <Clock size={16} />
                  <span>{booking.time}</span>
                </div>
              </div>

              <div className="card-bottom">
                <div className="price-info">
                  <span className="label">Total Amount</span>
                  <span className="amount">{booking.price}</span>
                </div>
                <button 
                  className="cancel-booking-btn"
                  onClick={() => {
                    if(window.confirm("Are you sure you want to cancel this booking?")) {
                      onCancel(booking.id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                  <span>Cancel Booking</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}