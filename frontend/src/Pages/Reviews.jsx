import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

export default function ReviewsSection() {
  const [filter, setFilter] = useState('all');
  
  const reviews = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      service: "Laptop Repair",
      rating: 5,
      date: "2026-01-15",
      comment: "Excellent service! Shanaya fixed my laptop quickly and professionally. The issue was resolved completely and the price was very reasonable. Highly recommended!",
      helpful: 12
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      service: "Software Installation",
      rating: 5,
      date: "2026-01-10",
      comment: "Very knowledgeable and efficient. Installed all the software I needed and even gave me tips on how to optimize my system. Great experience!",
      helpful: 8
    },
    {
      id: 3,
      customerName: "Anil Thapa",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
      service: "Laptop Repair",
      rating: 4,
      date: "2026-01-05",
      comment: "Good service overall. The repair took a bit longer than expected but the quality of work was excellent. Would use again.",
      helpful: 5
    },
    {
      id: 4,
      customerName: "Sunita Rai",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita",
      service: "Software Installation",
      rating: 5,
      date: "2025-12-28",
      comment: "Absolutely fantastic! Very professional and patient. Explained everything clearly and made sure I understood how to use the new software.",
      helpful: 15
    },
    {
      id: 5,
      customerName: "Deepak Magar",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak",
      service: "Laptop Repair",
      rating: 5,
      date: "2025-12-20",
      comment: "Best laptop repair service in town! Fixed my charging port issue perfectly. Very reasonable pricing and quick turnaround time.",
      helpful: 10
    },
    {
      id: 6,
      customerName: "Kamala Gurung",
      customerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamala",
      service: "Software Installation",
      rating: 4,
      date: "2025-12-15",
      comment: "Professional and courteous. Did a clean installation and removed all the unnecessary bloatware. Happy with the service.",
      helpful: 6
    }
  ];

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filter));

  const ratingBreakdown = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reviews</h1>
          <p className="text-gray-600">What your customers are saying about your services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating}</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">Based on {reviews.length} reviews</p>
            </div>

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${(ratingBreakdown[rating] / reviews.length) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {ratingBreakdown[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilter(rating.toString())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === rating.toString()
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating} Stars ({ratingBreakdown[rating]})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.customerImage}
                  alt={review.customerName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{review.customerName}</h3>
                      <p className="text-sm text-gray-500">{review.service}</p>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">No reviews found for this rating.</p>
          </div>
        )}
      </div>
    </div>
  );
}