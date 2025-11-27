'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  Send, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Star,
  Target
} from 'lucide-react';

const affiliateSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  socialMedia: z.string().min(1, 'Please provide at least one social media handle'),
  experience: z.string().min(1, 'Please select your experience level'),
  monthlyTraffic: z.string().min(1, 'Please select your monthly traffic range'),
  promotionMethods: z.array(z.string()).min(1, 'Please select at least one promotion method'),
  motivation: z.string().min(20, 'Please tell us more about your motivation (minimum 20 characters)'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
});

type AffiliateFormData = z.infer<typeof affiliateSchema>;

const faqs = [
  {
    question: "How much commission do I earn per sale?",
    answer: "You earn 25% of the profit from every sale made through your unique affiliate link. This is one of the highest commission rates in the industry!"
  },
  {
    question: "When and how do I get paid?",
    answer: "Payments are processed monthly via crypto or bank transfer. You'll receive your earnings by the 15th of each month for the previous month's sales, with a minimum payout threshold of $50."
  },
  {
    question: "What marketing materials do you provide?",
    answer: "We provide banners, product images, email templates, social media content, and detailed product information. All materials are professionally designed and optimized for conversions."
  },
  {
    question: "Are there any restrictions on promotion methods?",
    answer: "We allow most ethical promotion methods including social media, email marketing, content marketing, and paid advertising. Spam, misleading claims, and trademark bidding are prohibited."
  },
  {
    question: "How long do cookies last for my referrals?",
    answer: "Our affiliate cookies last for 60 days, giving you plenty of time to earn commissions from visitors who don't purchase immediately."
  },
  {
    question: "Is there a minimum sales requirement?",
    answer: "No minimum sales requirement! Whether you make 1 sale or 100 sales per month, you'll earn the same 25% commission rate on each transaction."
  },
  {
    question: "Can I promote on social media platforms?",
    answer: "Absolutely! Social media promotion is encouraged. We provide platform-specific content and guidelines for Facebook, Instagram, Twitter, TikTok, and YouTube."
  }
];

export default function AffiliatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateSchema),
  });

  const watchedPromotionMethods = watch('promotionMethods') || [];

  const onSubmit = async (data: AffiliateFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Affiliate application submitted:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Affiliate Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn <span className="font-bold text-blue-600">25% commission</span> on every sale! 
            Partner with us and turn your audience into a profitable income stream.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">High Commission Rate</h3>
            <p className="text-gray-600">Earn 25% of profit per sale - one of the highest rates in the industry</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">Monitor your clicks, conversions, and earnings with our advanced dashboard</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Support</h3>
            <p className="text-gray-600">Get professional banners, content, and promotional materials</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Application Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply to Become an Affiliate</h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">
                    Application submitted successfully! We'll review your application and get back to you within 24-48 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                <input
                  {...register('lastName')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your last name"
                />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL (Optional)
                </label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="https://yourwebsite.com"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Media Handles *
                </label>
                <input
                  {...register('socialMedia')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="@yourusername, @yourpage, etc."
                />
                {errors.socialMedia && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.message}</p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliate Marketing Experience *
                </label>
                <select
                  {...register('experience')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                )}
              </div>

              {/* Monthly Traffic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Website/Social Media Traffic *
                </label>
                <select
                  {...register('monthlyTraffic')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select your monthly traffic</option>
                  <option value="under-1k">Under 1,000 visitors</option>
                  <option value="1k-5k">1,000 - 5,000 visitors</option>
                  <option value="5k-10k">5,000 - 10,000 visitors</option>
                  <option value="10k-50k">10,000 - 50,000 visitors</option>
                  <option value="50k-100k">50,000 - 100,000 visitors</option>
                  <option value="over-100k">Over 100,000 visitors</option>
                </select>
                {errors.monthlyTraffic && (
                  <p className="mt-1 text-sm text-red-600">{errors.monthlyTraffic.message}</p>
                )}
              </div>

              {/* Promotion Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you plan to promote our services? *
                </label>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    'Social Media Posts',
                    'Email Marketing',
                    'Blog Content',
                    'YouTube Videos',
                    'Paid Advertising',
                    'Influencer Partnerships',
                    'Website Banners',
                    'Product Reviews'
                  ].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        {...register('promotionMethods')}
                        type="checkbox"
                        value={method}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
                {errors.promotionMethods && (
                  <p className="mt-1 text-sm text-red-600">{errors.promotionMethods.message}</p>
                )}
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to become our affiliate? *
                </label>
                <textarea
                  {...register('motivation')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Tell us about your motivation, audience, and how you plan to promote our services..."
                />
                {errors.motivation && (
                  <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                    <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> *
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-3">
                Our affiliate team is here to help you succeed.
              </p>
              <a 
                href="mailto:passify.digital@gmail.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                Contact our affiliate team →
              </a>
            </div>
          </div>
        </div>

        {/* Program Highlights */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Affiliate Program?</h2>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-blue-100">Commission Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">60 Days</div>
                <div className="text-blue-100">Cookie Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$50</div>
                <div className="text-blue-100">Minimum Payout</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
