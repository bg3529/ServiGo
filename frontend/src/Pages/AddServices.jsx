import React, { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';

const AddServices = ({ services, setServices }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    image: null
  });

  const categories = [
    'Student Housing',
    'Tutoring',
    'Pet Care',
    'Health & Wellness',
    'Tech Services',
    'Automobiles/Transport',
    'Personal Service',
    'Home Improvement',
    'Food & Meal'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = () => {
    if (formData.name && formData.category && formData.price && formData.image) {
      setServices([
        ...services,
        {
          id: services.length + 1,
          ...formData,
          price: parseFloat(formData.price),
          rating: 5,
          reviewCount: 0,
          location: 'At Home',
          active: true
        }
      ]);
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        description: '',
        image: null
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="flex items-center gap-2 text-emerald-600 font-semibold mb-4 hover:text-emerald-700 transition-colors"
      >
        <Plus size={20} />
        <span>Add New Service</span>
      </button>

      {showAddForm && (
        <div className="space-y-4">
          {/* Service Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image *
            </label>
            <div className="flex items-center gap-4">
              {formData.image ? (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Service" 
                    className="w-full h-48 object-cover rounded-lg" 
                  />
                  <button
                    onClick={() => setFormData({ ...formData, image: null })}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">Upload Service Image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Laptop Repair"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>


          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (Rs.) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 2000.00"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of your service (as shown on the service card)"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Preview Card */}
          {formData.image && formData.name && (
            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
              <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
                <img 
                  src={formData.image} 
                  alt={formData.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{formData.name}</h3>
                  {formData.subcategory && (
                    <p className="text-xs text-gray-500 mb-2">{formData.subcategory}</p>
                  )}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">5</span>
                    <span className="text-xs text-gray-500">(0)</span>
                  </div>
                  {formData.price && (
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      Rs. {parseFloat(formData.price).toFixed(2)}
                    </p>
                  )}
                  {formData.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {formData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
           <button
            onClick={handleAddService}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Service
          </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({
                  name: '',
                  category: '',
                  subcategory: '',
                  price: '',
                  description: '',
                  image: null
                });
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddServices;