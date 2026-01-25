import React, { useState } from 'react';
import { User, Calendar, Check, XCircle, Clock } from 'lucide-react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      serviceName: 'Laptop Repair',
      customerName: 'Priya Sharma',
      date: '2026-01-20',
      time: '10:00 AM',
      price: 1500,
      status: 'pending'
    },
    {
      id: 2,
      serviceName: 'Software Installation',
      customerName: 'Anil Thapa',
      date: '2026-01-20',
      time: '2:00 PM',
      price: 500,
      status: 'pending'
    }
  ]);

  const handleBookingAction = (id, action) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: action } : booking
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h2>

        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {booking.serviceName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Customer: {booking.customerName}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar size={16} className="text-emerald-600" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={16} className="text-emerald-600" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="text-emerald-600 font-semibold">
                      Rs. {booking.price}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : booking.status === 'accepted'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {booking.status === 'pending' ? 'Pending' : booking.status === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              </div>

              {booking.status === 'pending' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleBookingAction(booking.id, 'accepted')}
                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    <Check size={20} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleBookingAction(booking.id, 'rejected')}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={20} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;