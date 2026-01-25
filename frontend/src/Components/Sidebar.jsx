import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Wrench, Star, CalendarCheck, PlusCircle, User } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'addservices', icon: PlusCircle, label: 'Add Services', path: '/add-services' }, // Removed /dashboard prefix
    { id: 'services', icon: Wrench, label: 'My Services', path: '/my-services' },       // Removed /dashboard prefix
    { id: 'bookings', icon: Calendar, label: 'Bookings', path: '/bookings' },           // Removed /dashboard prefix
    { id: 'reviews', icon: Star, label: 'Reviews', path: '/reviews' },                 // Removed /dashboard prefix
  ];
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEditProfile = () => {
    navigate('/dashboard/my-profile');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen pb-6 px-6 pt-0">
      {/* Profile Section */}
      <div className="mb-8 text-center mt-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-400">
          <img 
            src="./images/serviceprovider.png"
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">Shanaya Maverick</h3>
        <div className="flex items-center justify-center gap-1 text-green-600 text-sm mt-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Verified</span>
        </div>
        <button 
          onClick={handleEditProfile}
          className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 mx-auto"
        >
          <User className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-green-50 text-green-600 font-medium' 
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;