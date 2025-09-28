'use client';

import { useState } from 'react';
import { X, Copy, Check, Flame, Sparkles, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import servicesConfig from '@/config/services-config.json';

interface HotDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HotDealsModal({ isOpen, onClose }: HotDealsModalProps) {
  const [copied, setCopied] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  if (!isOpen) return null;

  // Get dynamic pricing from config
  const hotDeal = servicesConfig.deals.hotDeal;
  const spotifyService = services.find(service => service.id === '1');
  const netflixService = services.find(service => service.id === '2');
  
  const originalTotal = hotDeal.originalTotal;
  const dealPrice = hotDeal.dealPrice;
  const savings = originalTotal - dealPrice;
  const discountPercentage = Math.round((savings / originalTotal) * 100);

  const copyPromoCode = () => {
    navigator.clipboard.writeText('HOTDEAL25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addBothServices = () => {
    // Find services from the dynamic services data
    const spotifyService = services.find(service => service.id === '1');
    const netflixService = services.find(service => service.id === '2');

    if (spotifyService) {
      addItem(spotifyService, true);
    }

    if (netflixService) {
      addItem(netflixService, true);
    }

    onClose();
    // Redirect to cart page to show the deal
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl z-10">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl animate-pulse"></div>
        <div className="absolute inset-1 bg-white rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-8 h-8 text-red-500 animate-bounce" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                🔥 HOT DEAL ALERT! 🔥
              </h2>
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-sm">Limited Time Offer!</p>
          </div>

          {/* Deal Content with Service Icons */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-xl p-4 mb-4">
              {/* Service Icons */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                {/* Netflix Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Netflix</span>
                </div>

                {/* Plus Sign */}
                <div className="text-3xl font-bold text-purple-600">+</div>

                {/* Spotify Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-2 shadow-lg">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Spotify</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Ultimate Entertainment Combo
              </h3>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-green-600">{discountPercentage}% OFF</span>
                <span className="text-lg text-gray-500 line-through">${originalTotal.toFixed(2)}/year</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">Only ${dealPrice.toFixed(2)}/year!</p>
              <p className="text-sm text-gray-600 mt-1">Save ${savings.toFixed(2)} annually!</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={addBothServices}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🚀 Get This Deal Now!
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Limited time offer • No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}