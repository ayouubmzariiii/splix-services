import Link from 'next/link';
import { Search, MessageCircle, Book, Phone, Mail, Clock } from 'lucide-react';

export default function HelpCenter() {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      articles: [
        'How to create an account',
        'How to purchase services',
        'Setting up your first service',
        'Understanding our pricing'
      ]
    },
    {
      title: 'Account Management',
      icon: MessageCircle,
      articles: [
        'Managing your subscriptions',
        'Updating payment methods',
        'Changing account details',
        'Canceling services'
      ]
    },
    {
      title: 'Technical Support',
      icon: Phone,
      articles: [
        'Service not working',
        'Login issues',
        'Connection problems',
        'Troubleshooting guide'
      ]
    },
    {
      title: 'Billing & Payments',
      icon: Mail,
      articles: [
        'Payment methods accepted',
        'Refund policy',
        'Billing cycles',
        'Invoice questions'
      ]
    }
  ];

  const popularArticles = [
    'How does Splix Services work?',
    'Are your services legal and safe?',
    'What is your refund policy?',
    'How long do services take to activate?',
    'Do you offer 24/7 support?'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to your questions and get the help you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href="/faq"
                  className="block p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{article}</span>
                    <span className="text-gray-400">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link
                          href="/faq"
                          className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                        >
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help 24/7.
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
              href="/faq"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300 inline-flex items-center justify-center"
            >
              <Book className="w-5 h-5 mr-2" />
              View FAQ
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Average response time: Under 2 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}