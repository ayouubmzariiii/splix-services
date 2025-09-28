'use client';

import { Service } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Star, Loader2, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate a brief loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem(service);
    setIsLoading(false);
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const discountPercentage = service.originalPrice 
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 h-[420px] w-full flex flex-col transform hover:-translate-y-1">
      {/* Popular Badge */}
      {service.popular && (
        <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start shadow-sm">
          ⭐ Popular
        </div>
      )}

      {/* Service Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 relative bg-gray-50 rounded-xl p-3 shadow-sm">
          <Image 
            src={service.icon} 
            alt={`${service.name} logo`}
            fill
            className="object-contain p-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'block';
              }
            }}
          />
          <div className="text-3xl hidden flex items-center justify-center w-full h-full">🔧</div>
        </div>
      </div>

      {/* Service Info */}
      <div className="text-center mb-6 flex-grow flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            ${service.price}
          </span>
          {service.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${service.originalPrice}
              </span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 font-medium">per year</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading || showSuccess}
        className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
          showSuccess 
            ? 'bg-green-600 text-white' 
            : isLoading 
              ? 'bg-blue-400 text-white cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Adding...</span>
          </>
        ) : showSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}