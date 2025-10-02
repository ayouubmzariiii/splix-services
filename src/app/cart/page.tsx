'use client';

import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getServices } from '@/lib/firestore';

export default function CartPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { 
    items, 
    total, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getItemCount,
    hasHotDealCombo,
    getHotDealDiscount,
    getDiscountedTotal,
    syncWithDatabase
  } = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync cart item prices with database once hydrated
  useEffect(() => {
    const syncPrices = async () => {
      try {
        const latest = await getServices();
        if (Array.isArray(latest) && latest.length > 0) {
          syncWithDatabase(latest);
        }
      } catch (error) {
        console.error('Failed to sync cart prices with database', error);
      }
    };

    if (isHydrated && items.length > 0) {
      syncPrices();
    }
  }, [isHydrated, items.length, syncWithDatabase]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <ShoppingBag className="w-24 h-24 text-blue-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-lg text-gray-700 mb-8">
                Discover amazing services and start building your perfect bundle
              </p>
              <Link
                href="/services"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-xl text-gray-700">
            {items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.service.id}
                  className={`p-8 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-6">
                    {/* Service Icon */}
                    <div className="w-16 h-16 relative flex items-center justify-center bg-gray-50 rounded-xl p-2">
                      <Image 
                        src={item.service.icon} 
                        alt={`${item.service.name} logo`}
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
                    
                    {/* Service Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {item.service.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {item.service.description}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-gray-900">
                          ${item.service.price}/year
                        </span>
                        {item.service.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.service.originalPrice}/year
                            </span>
                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-lg font-medium border border-emerald-200">
                              Save ${(item.service.originalPrice - item.service.price).toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                        className="p-2 rounded-md hover:bg-white transition-colors shadow-sm"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="w-8 text-center font-semibold text-base text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                        className="p-2 rounded-md hover:bg-white transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6 text-center">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-lg font-semibold hover:underline transition-colors"
              >
                Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.service.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-sm">
                      {item.service.name} × {item.quantity}
                    </span>
                    <span className="text-xs font-medium">
                      {hasHotDealCombo() && item.service.id === '2' && item.addedViaModal ? (
                        <span className="text-[#2596be]">Discount applied</span>
                      ) : (
                        <span className="text-gray-500">No discount</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 mb-8">
                {/* Hot Deal Discount Section */}
                {hasHotDealCombo() && (
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-50 to-[#2596be]/10 border border-[#2596be]/30 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🔥</span>
                          <span className="text-sm font-bold text-[#2596be]">Hot Deal Active!</span>
                        </div>
                        <div className="bg-gradient-to-r from-[#2596be] to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          Save ${getHotDealDiscount().toFixed(2)}
                        </div>
                      </div>
                      <p className="text-xs text-[#2596be]/80 mt-1 ml-6">
                        Netflix + Spotify combo discount applied
                      </p>
                    </div>
                  </div>
                )}

                {/* Total Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-sm">Subtotal</span>
                    <span className="font-semibold text-gray-900 text-sm">${total.toFixed(2)}/year</span>
                  </div>
                  
                  {hasHotDealCombo() && (
                    <div className="flex justify-between items-center text-[#2596be]">
                      <span className="font-medium text-sm">Hot Deal Discount</span>
                      <span className="font-semibold text-sm">-${getHotDealDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ${getDiscountedTotal().toFixed(2)}/year
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>

                <Link
                  href="/services"
                  className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}