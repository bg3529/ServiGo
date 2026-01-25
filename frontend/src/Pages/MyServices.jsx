import React from 'react';
import { Edit2, Trash2, X } from 'lucide-react';

const MyServices = ({ services = [], setServices }) => {

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Your Services ({services.length})
      </h3>

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4">
              {service.image && (
                <img src={service.image} alt={service.name} className="w-24 h-24 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <p className="text-emerald-600 font-medium">
                      Rs. {service.minPrice}-{service.maxPrice}
                    </p>
                    <p className="text-sm text-gray-600">Duration: {service.duration}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full">
                    Active
                  </span>
                </div>
                {service.description && (
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                )}
                {service.features?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
