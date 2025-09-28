'use client';

import { useState } from 'react';
import { reviews } from '@/data/reviews';
import { Star, Filter, User } from 'lucide-react';

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>('All');

  const services = ['All', ...Array.from(new Set(reviews.map(review => review.service)))];

  const filteredReviews = reviews.filter(review => {
    const matchesRating = selectedRating === null || review.rating === selectedRating;
    const matchesService = selectedService === 'All' || review.service === selectedService;
    return matchesRating && matchesService;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Rating Overview & Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Rating</h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating), 'lg')}
                <p className="text-sm text-gray-600 mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center text-sm">
                    <span className="w-3 text-gray-600">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current mx-1" />
                    <div className="flex-1 mx-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-gray-600 w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedRating(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedRating === null
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Ratings
                  </button>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center ${
                        selectedRating === rating
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {renderStars(rating, 'sm')}
                      <span className="ml-2">& up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Service</h4>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white"
                >
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Reviews ({filteredReviews.length})
              </h2>
            </div>

            {filteredReviews.length > 0 ? (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                          <p className="text-sm text-gray-600">{formatDate(review.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-sm text-gray-600 mt-1">{review.service}</p>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Helpful Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <button className="hover:text-blue-600 transition-colors">
                          👍 Helpful
                        </button>
                        <button className="hover:text-blue-600 transition-colors">
                          💬 Reply
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        Verified Purchase
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more reviews
                </p>
              </div>
            )}

            {/* Write Review CTA */}
            <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Share Your Experience
              </h2>
              <p className="text-gray-600 mb-6">
                Have you used our services? We&apos;d love to hear about your experience!
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}