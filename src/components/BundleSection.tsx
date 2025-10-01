'use client';

import { ArrowRight } from 'lucide-react';

export default function BundleSection() {
  const bundleData = [
    {
      service: 'Spotify Premium',
      passifyPrice: '$34.99',
      regularPrice: '$119.88 - $143.88',
      savings: '+76%'
    },
    {
      service: 'YouTube Premium',
      passifyPrice: '$57.99',
      regularPrice: '$119.88 - $167.88',
      savings: '+65%'
    },
    {
      service: 'Apple Music',
      passifyPrice: '$41.99',
      regularPrice: '$109.89 - $131.88',
      savings: '+68%'
    },
    {
      service: 'Discord Nitro',
      passifyPrice: '$53.99',
      regularPrice: '$99.99 - $119.88',
      savings: '+55%'
    },
    {
      service: 'Netflix Premium',
      passifyPrice: '$49.99',
      regularPrice: '$239.88 - $299.88',
      savings: '+83%'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bundle & Save – Cheap Subscriptions for Every App
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Why stop at Spotify? Mix and match any of Passify's cheap subscriptions – from video, music to gaming, and streaming. 
            <span className="font-semibold text-blue-600"> Save up to 80% </span>
            on every service
          </p>
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-4 gap-4 p-6">
              <div className="font-bold text-lg">Service</div>
              <div className="font-bold text-lg text-center">Passify 12-month price</div>
              <div className="font-bold text-lg text-center">Regular U.S. cost (12 mo)</div>
              <div className="font-bold text-lg text-center">Approx. saving</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {bundleData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-4 gap-4 p-6 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <div className="font-semibold text-gray-900">{item.service}</div>
                <div className="text-center font-bold text-blue-600 text-lg">{item.passifyPrice}</div>
                <div className="text-center text-gray-600">{item.regularPrice}</div>
                <div className="text-center font-bold text-green-600">{item.savings}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Stack Deals */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How to stack the deals</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Add multiple services to your cart</span> – there's no limit, and each one carries its own deep discount.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Pay once, enjoy all year</span> – Passify activates every subscription on your existing accounts, so logins and playlists stay put.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">One-stop support & warranty</span> – if any service hiccups, Passify handles the fix or refund.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to kit-out every screen and speaker? Browse all our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
              cheap subscriptions
            </a>{' '}
            and build your personal bundle.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl">
            Browse All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}