import Link from 'next/link';
import { Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We use industry-standard encryption to protect your personal information'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are transparent about what data we collect and how we use it'
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'Your data is stored securely and never shared without your consent'
    },
    {
      icon: Database,
      title: 'Data Minimization',
      description: 'We only collect the data necessary to provide our services'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {privacyFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">We collect information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Communication data when you contact our support team</li>
              <li>Service preferences and usage data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this policy. We may share your information with trusted service providers who assist 
              us in operating our website and conducting our business.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes 
              outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal information</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, 
              and understand where our visitors are coming from. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 mb-6">
              Our service may contain links to third-party websites or services. We are not responsible for the privacy 
              practices of these third parties. We encourage you to read their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 18. We do not knowingly collect personal information from 
              children under 18. If you become aware that a child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
              privacy policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us through our support channels or 
              email us directly.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terms"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                View Terms of Service
              </Link>
              <Link
                href="/contact"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h2>
          <p className="text-gray-600 mb-6">
            We're committed to protecting your privacy. If you have any questions or concerns, 
            don't hesitate to reach out to our privacy team.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            Contact Privacy Team
          </Link>
        </div>
      </div>
    </div>
  );
}