import React from 'react';
import { Calendar, DollarSign, Star } from 'lucide-react';

const Dashboard = () => {
  // Sample data
  const stats = {
    totalEarnings: 45000,
    completedJobs: 156,
    pendingBookings: 8,
    averageRating: 4.8
  };

  const recentBookings = [
    {
      id: 1,
      service: 'Laptop Repair',
      customer: 'Priya Sharma',
      date: '2026-01-20',
      time: '10:00 AM',
      price: 1500,
      status: 'Pending'
    },
    {
      id: 2,
      service: 'Software Installation',
      customer: 'Anil Thapa',
      date: '2026-01-20',
      time: '2:00 PM',
      price: 500,
      status: 'Pending'
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Earnings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Rs. {stats.totalEarnings.toLocaleString()}</p>
        </div>

        {/* Completed Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Completed Jobs</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stats.completedJobs}</p>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Pending Bookings</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingBookings}</p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Average Rating</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stats.averageRating}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{booking.service}</h3>
                    <p className="text-sm text-gray-500 mt-1">Customer: {booking.customer}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {booking.time}
                      </span>
                      <span className="text-green-600 font-medium">Rs. {booking.price}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;