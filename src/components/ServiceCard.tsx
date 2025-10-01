'use client';

import { Service } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Loader2, Check } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
      {/* Service Icon */}
      <div className="w-16 h-16 mx-auto mb-4 relative flex items-center justify-center bg-gray-50 rounded-xl p-2">
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
        <div className="text-3xl hidden">🔧</div>
      </div>

      {/* Service Name */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {service.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ${service.price}
          </span>
          {service.originalPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ${service.originalPrice}
              </span>
              {discountPercentage > 0 && (
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </>
          )}
        </div>
        <p className="text-gray-600 text-sm">per year</p>
      </div>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div className="mb-6">
          <ul className="text-sm text-gray-600 space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading || showSuccess}
        className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 ${
          showSuccess 
            ? 'bg-green-600 text-white' 
            : isLoading 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
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