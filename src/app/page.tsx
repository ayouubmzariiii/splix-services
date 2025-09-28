import Link from 'next/link';
import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import { ArrowRight, Shield, Clock, Headphones, Star } from 'lucide-react';

export default function Home() {
  const popularServices = services.filter(service => service.popular);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium Services at
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400"> Unbeatable Prices</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Get access to your favorite streaming, productivity, and creative services 
                for up to <span className="font-bold text-yellow-300">70% less</span> than official prices
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                href="/services"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/faq"
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center text-sm">
                <Shield className="w-5 h-5 mr-2" />
                Trusted by 10,000+ customers
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-5 h-5 mr-2" />
                Instant delivery guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Splix Services?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide legitimate, high-quality access to premium services with unmatched support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Legal & Safe</h3>
              <p className="text-gray-600">All services are legitimate and properly licensed through authorized resellers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Most services are delivered immediately after payment confirmation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is always ready to help with any issues</p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Save Money?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who are saving hundreds of dollars on premium services
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/services"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Shopping Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/faq"
                className="bg-gray-100 text-gray-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 inline-flex items-center"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  100% Secure
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Instant Delivery
                </div>
                <div className="flex items-center">
                  <Headphones className="w-4 h-4 mr-2 text-purple-500" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
