'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19, 'Card number is too long'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter MM/YY format'),
  cvv: z.string().min(3, 'CVV must be 3 digits').max(4, 'CVV must be 3-4 digits'),
  billingAddress: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'Please enter a valid city'),
  zipCode: z.string().min(5, 'Please enter a valid zip code'),
  country: z.string().min(2, 'Please select a country'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, total, clearCart, hasHotDealCombo, getHotDealDiscount, getDiscountedTotal } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  // Redirect if cart is empty - use useEffect to avoid render issues
  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  // Show loading while redirecting
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Billing Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('billingAddress')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="123 Main Street"
                  />
                  {errors.billingAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.billingAddress.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      {...register('zipCode')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      {...register('country')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    {...register('cardNumber')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={(e) => {
                      e.target.value = formatCardNumber(e.target.value);
                    }}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      {...register('expiryDate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      {...register('cvv')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Complete Order - ${total.toFixed(2)}/year
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.service.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                                <img 
                                  src={item.service.icon} 
                                  alt={`${item.service.name} logo`}
                                  className="w-full h-full object-contain"
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.service.name}</h3>
                    <p className="text-sm text-gray-700 font-medium">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.service.price * item.quantity).toFixed(2)}/year</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">Subtotal</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}/year</span>
              </div>
              
              {hasHotDealCombo() && (
                <div className="flex justify-between items-center mb-2 text-orange-600">
                  <span className="font-medium">Hot Deal Discount</span>
                  <span className="font-semibold">-${getHotDealDiscount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">Processing Fee</span>
                <span className="font-semibold text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${getDiscountedTotal().toFixed(2)}/year</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">
                  Your payment information is secure and encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}