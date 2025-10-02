'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { useHotDealsStore } from '@/store/hotDealsStore';
import { useCartStore } from '@/store/cartStore';
import { getServicesData } from '@/data/services';
import { getDealsData, Deal } from '@/data/deals';
import { Service } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HotDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HotDealsModal({ isOpen, onClose }: HotDealsModalProps) {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [servicesData, dealsData] = await Promise.all([
          getServicesData(),
          getDealsData()
        ]);
        setServices(servicesData);

        // Adjust Spotify + Netflix combo pricing: Spotify at our price + Netflix with 25% off
        const spotify = servicesData.find(s => s.id === '1');
        const netflix = servicesData.find(s => s.id === '2');
        const adjustedDeals = (spotify && netflix)
          ? dealsData.map((deal) => {
              const isSpotifyNetflixCombo = Array.isArray(deal.serviceIds)
                && deal.serviceIds.length === 2
                && deal.serviceIds.includes('1')
                && deal.serviceIds.includes('2');

              if (isSpotifyNetflixCombo) {
                const originalTotal = (spotify.originalPrice ?? spotify.price) + (netflix.originalPrice ?? netflix.price);
                const computedDealPrice = Number((spotify.price + netflix.price * 0.75).toFixed(2));
                const computedDiscount = Math.round(((originalTotal - computedDealPrice) / originalTotal) * 100);
                return {
                  ...deal,
                  name: deal.name || 'Netflix + Spotify Combo',
                  description: deal.description || 'Spotify at our price + Netflix at 25% off',
                  originalPrice: originalTotal,
                  dealPrice: computedDealPrice,
                  discountPercentage: computedDiscount,
                };
              }
              return deal;
            })
          : dealsData;

        setDeals(adjustedDeals);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data if database fails
        setDeals([
          {
            id: 'deal-1',
            name: 'Ultimate Streaming Bundle',
            description: 'Get Netflix, Spotify, and YouTube Premium together',
            serviceIds: ['1', '2', '4'],
            originalPrice: 300,
            dealPrice: 199,
            discountPercentage: 33,
            badge: 'BEST VALUE',
            promoCode: 'STREAM33',
            features: ['Netflix Premium', 'Spotify Premium', 'YouTube Premium'],
            priority: 1,
            isActive: true,
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            createdAt: new Date()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const currentDeal = deals[currentDealIndex];
  const dealServices = services.filter(service => 
    currentDeal?.serviceIds?.includes(service.id)
  );

  const nextDeal = () => {
    setCurrentDealIndex((prev) => (prev + 1) % deals.length);
  };

  const prevDeal = () => {
    setCurrentDealIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  const goToDeal = (index: number) => {
    setCurrentDealIndex(index);
  };

  const handleGetDeal = () => {
    // Add all services in the deal to cart
    dealServices.forEach(service => {
      // Mark items as added via Hot Deals to qualify for combo pricing
      addItem(service, true);
    });
    
    // Close modal and redirect to cart
    onClose();
    router.push('/cart');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2596be]"></div>
          </div>
        ) : (
          <>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/95 hover:bg-white rounded-full p-1.5 shadow-lg transition-all z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Navigation Arrows */}
            {deals.length > 1 && (
              <>
                <button
                  onClick={prevDeal}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-1.5 shadow-lg transition-all z-10"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextDeal}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-1.5 shadow-lg transition-all z-10"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </>
            )}

            <div className="p-6">
              {/* Deal Indicators */}
              {deals.length > 1 && (
                <div className="flex justify-center space-x-2 mb-4">
                  {deals.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDealIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentDealIndex
                          ? 'bg-[#2596be]'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#2596be] mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Hot Deal</h2>
                  <Sparkles className="w-5 h-5 text-[#2596be] ml-2" />
                </div>
                
                {currentDeal && (
                  <>
                    <div className="inline-block bg-gradient-to-r from-[#2596be] to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {currentDeal.badge}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {currentDeal.name}
                    </h3>
                  </>
                )}
              </div>

              {/* Services */}
              {dealServices.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-center space-x-4 mb-4">
                    {dealServices.map((service) => (
                      <div key={service.id} className="flex flex-col items-center">
                        <div className="w-12 h-12 relative flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 mb-2">
                          <Image 
                            src={service.icon} 
                            alt={`${service.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'block';
                              }
                            }}
                          />
                          <div className="text-lg hidden">🔧</div>
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {service.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {currentDeal && (
                <div className="bg-gradient-to-br from-[#2596be]/5 to-blue-50 rounded-xl p-4 mb-6 border border-[#2596be]/20">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${currentDeal.dealPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${currentDeal.originalPrice}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">
                      {currentDeal.discountPercentage}% OFF
                    </div>
                    <p className="text-sm text-gray-600">
                      Save ${(currentDeal.originalPrice - currentDeal.dealPrice).toFixed(2)}/year
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleGetDeal}
                className="w-full bg-gradient-to-r from-[#2596be] to-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:from-[#2596be]/90 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get This Deal
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}