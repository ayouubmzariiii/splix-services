'use client';

import { Service } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(service);
  };

  const discountPercentage = service.originalPrice 
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 p-6">
      {/* Popular Badge */}
      {service.popular && (
        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-4">
          Popular
        </div>
      )}

      {/* Service Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 relative">
          <Image 
            src={service.icon} 
            alt={`${service.name} logo`}
            fill
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'block';
              }
            }}
          />
          <div className="text-2xl hidden flex items-center justify-center w-full h-full">🔧</div>
        </div>
      </div>

      {/* Service Info */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {service.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <span className="text-2xl font-bold text-gray-900">
            ${service.price}
          </span>
          {service.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${service.originalPrice}
              </span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500">per month</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}