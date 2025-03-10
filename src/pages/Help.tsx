import React from 'react';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const Help = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-blue-900 mb-4">Contact Support</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700">Emergency: 911</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700">24/7 Support: +1 (800) 555-0123</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700">support@aisafety.com</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  How to Set Up Your Device
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Safety Features Guide
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Emergency Response Guide
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  Troubleshooting
                </button>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How does the emergency alert system work?",
                  answer: "Our emergency alert system uses AI to detect potential safety threats and automatically notifies emergency contacts and relevant authorities."
                },
                {
                  question: "Can I add multiple emergency contacts?",
                  answer: "Yes, you can add up to 5 emergency contacts who will be notified in case of an emergency."
                },
                {
                  question: "Is my location data secure?",
                  answer: "Yes, all location data is encrypted and stored securely. Only you and your emergency contacts can access this information."
                }
              ].map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;