'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData: FAQItem[] = [
    // Getting Started
    {
      id: '1',
      question: 'How does Passify work?',
      answer: 'Passify provides premium subscriptions at up to 80% off through legitimate regional pricing. You pay once upfront for 12 months of access to services like Spotify, Netflix, Adobe, and more. We activate the subscription on your account within 24 hours, and you enjoy all premium features just like a full-price subscription.',
      category: 'Getting Started'
    },
    {
      id: '2',
      question: 'Why are your prices so much lower?',
      answer: 'We use regional pricing - the same legal method companies use to offer different prices in different countries. This allows us to provide genuine subscriptions at significantly lower costs while maintaining full functionality and features.',
      category: 'Getting Started'
    },
    {
      id: '3',
      question: 'Is this legal and safe to use?',
      answer: 'Absolutely. All subscriptions are purchased directly from official platforms using legitimate regional pricing. We\'ve been operating for 3+ years with over 500 five-star reviews and have never had legal issues. Your account remains secure and fully functional.',
      category: 'Getting Started'
    },

    // Account & Setup
    {
      id: '4',
      question: 'Can I use my existing account?',
      answer: 'Yes! For most services, you can choose to upgrade your existing account or receive a new premium account from us. If upgrading your existing account, you\'ll need to provide login details temporarily for activation.',
      category: 'Account & Setup'
    },
    {
      id: '5',
      question: 'Do I need a VPN or special setup?',
      answer: 'No VPN required! Your premium subscription works normally from any location - USA, Europe, Asia, anywhere. No technical setup needed on your end.',
      category: 'Account & Setup'
    },
    {
      id: '6',
      question: 'How quickly will I receive my subscription?',
      answer: 'Most subscriptions are delivered within 30 minutes. Complex orders may take up to 24 hours for manual verification. Our 24/7 team works to get you premium access as fast as possible.',
      category: 'Account & Setup'
    },

    // Support & Warranty
    {
      id: '7',
      question: 'What if my subscription stops working?',
      answer: 'You\'re fully covered! If any issues occur or you don\'t receive your subscription within 24 hours, contact our support team immediately. We provide complete warranty - we\'ll fix the issue or provide a full refund.',
      category: 'Support & Warranty'
    },
    {
      id: '8',
      question: 'How do I get help if I need it?',
      answer: 'Our 24/7 support team is always available. Join our Discord server and create a ticket, or email us directly. We respond quickly and resolve issues fast.',
      category: 'Support & Warranty'
    },
    {
      id: '9',
      question: 'What happens when my 12-month subscription expires?',
      answer: 'Simply repurchase at the same low price! We\'ll send you a reminder before expiration. There\'s no auto-renewal, giving you full control over your subscriptions.',
      category: 'Support & Warranty'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <section id="faq-section" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our 24/7 support team is here to help you with any questions or concerns.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}