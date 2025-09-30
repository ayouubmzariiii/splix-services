'use client';

import { useState, useEffect } from 'react';
import { X, Flame, Sparkles, Check, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { getServicesData } from '@/data/services';
import { Service } from '@/types';
import { getDealsData, Deal } from '@/data/deals';

interface HotDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HotDealsModal({ isOpen, onClose }: HotDealsModalProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [dealServices, setDealServices] = useState<Service[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  // Get current deal
  const currentDeal = deals[currentDealIndex];

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentDeal && services.length > 0) {
      // Find services for current deal
      const currentDealServices = services.filter(service => 
        currentDeal.serviceIds.includes(service.id)
      );
      setDealServices(currentDealServices);
    }
  }, [currentDeal, services]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [servicesData, dealsData] = await Promise.all([
        getServicesData(),
        getDealsData()
      ]);
      
      setServices(servicesData);
      setDeals(dealsData);
      setCurrentDealIndex(0); // Reset to first deal
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToDeal = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDealIndex(prev => prev > 0 ? prev - 1 : deals.length - 1);
    } else {
      setCurrentDealIndex(prev => prev < deals.length - 1 ? prev + 1 : 0);
    }
  };

  const goToDeal = (index: number) => {
    setCurrentDealIndex(index);
  };

  // Calculate deal values
  const originalTotal = dealServices.reduce((sum, service) => sum + (service.originalPrice || service.price), 0);
  const dealPrice = currentDeal?.dealPrice || 0;
  const savings = originalTotal - dealPrice;
  const discountPercentage = currentDeal?.discountPercentage || 0;

  const copyPromoCode = () => {
    if (currentDeal?.promoCode) {
      navigator.clipboard.writeText(currentDeal.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addDealServices = () => {
    dealServices.forEach(service => {
      addItem(service);
    });
    onClose();
    // Redirect to cart
    window.location.href = '/cart';
  };

  if (!isOpen) return null;

  if (loading || !currentDeal) {
    return (
      <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading amazing deals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        {deals.length > 1 && (
          <>
            <button
              onClick={() => navigateToDeal('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateToDeal('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}

        <div className="p-8">
          {/* Deal Indicators */}
          {deals.length > 1 && (
            <div className="flex justify-center space-x-2 mb-6">
              {deals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToDeal(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentDealIndex 
                      ? 'bg-purple-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-8 h-8 text-red-500 animate-bounce" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                {currentDeal.badge}
              </h2>
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-sm">Limited Time Offer!</p>
          </div>

          {/* Deal Content */}
          <div className="text-center mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              {dealServices.map((service, index) => (
                <div key={service.id} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-lg">{service.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {currentDeal.name}
            </h3>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-green-600">{discountPercentage}% OFF</span>
              <span className="text-lg text-gray-500 line-through">${originalTotal.toFixed(2)}/year</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">Only ${dealPrice.toFixed(2)}/year!</p>
            <p className="text-sm text-gray-600 mt-1">Save ${savings.toFixed(2)} annually!</p>
            
            {/* Features */}
            <div className="mt-4 text-left">
              <ul className="text-sm text-gray-600 space-y-1">
                {currentDeal.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                <p className="font-mono font-bold text-gray-800">{currentDeal.promoCode}</p>
              </div>
              <button
                onClick={copyPromoCode}
                className="flex items-center space-x-1 bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={addDealServices}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🚀 Get This Deal Now!
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Valid until {currentDeal.validUntil.toLocaleDateString()} • No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}