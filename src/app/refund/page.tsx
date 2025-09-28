import Link from 'next/link';
import { RefreshCw, Clock, CheckCircle, XCircle, AlertCircle, MessageCircle } from 'lucide-react';

export default function RefundPolicy() {
  const refundSteps = [
    {
      step: 1,
      title: 'Contact Support',
      description: 'Reach out to our support team within 30 days of purchase',
      icon: MessageCircle
    },
    {
      step: 2,
      title: 'Provide Details',
      description: 'Share your order number and reason for the refund request',
      icon: AlertCircle
    },
    {
      step: 3,
      title: 'Review Process',
      description: 'Our team will review your request within 24-48 hours',
      icon: Clock
    },
    {
      step: 4,
      title: 'Refund Processed',
      description: 'If approved, refunds are processed within 3-5 business days',
      icon: CheckCircle
    }
  ];

  const eligibleReasons = [
    'Service not delivered within promised timeframe',
    'Service not working as described',
    'Technical issues preventing service use',
    'Duplicate purchase or billing error',
    'Service discontinued by provider'
  ];

  const ineligibleReasons = [
    'Change of mind after 30 days',
    'Service used for more than 30 days',
    'Account suspension due to policy violation',
    'Services purchased with promotional codes',
    'Third-party service provider changes'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Policy Overview */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-gray-700 text-lg">
            We stand behind our services with a 30-day money-back guarantee. If you're not satisfied 
            with your purchase, we'll work with you to make it right or provide a full refund.
          </p>
        </div>

        {/* Refund Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Request a Refund</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Policy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Policy Details</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligibility Period</h3>
            <p className="text-gray-700 mb-6">
              Refund requests must be submitted within 30 days of the original purchase date. 
              This period begins from the date of service activation or delivery.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Processing Time</h3>
            <p className="text-gray-700 mb-6">
              Once your refund request is approved, we will process the refund within 3-5 business days. 
              The time it takes for the refund to appear in your account depends on your payment method and bank.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Method</h3>
            <p className="text-gray-700 mb-6">
              Refunds will be issued to the original payment method used for the purchase. We cannot 
              process refunds to different payment methods or accounts.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Partial Refunds</h3>
            <p className="text-gray-700 mb-6">
              In some cases, we may offer partial refunds based on the usage period or specific circumstances. 
              Our support team will work with you to find a fair solution.
            </p>
          </div>
        </div>

        {/* Eligible vs Ineligible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Eligible Reasons */}
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Eligible for Refund</h3>
            </div>
            <ul className="space-y-3">
              {eligibleReasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ineligible Reasons */}
          <div className="bg-red-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Not Eligible for Refund</h3>
            </div>
            <ul className="space-y-3">
              {ineligibleReasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need to Request a Refund?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help. Contact us with your order details and we'll 
            process your request as quickly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/help"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300 inline-flex items-center justify-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Help Center
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Average refund processing time: 3-5 business days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}