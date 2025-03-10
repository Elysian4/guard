import React from 'react';
import { Lock, Shield, Eye, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Privacy & Security</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Data Protection</h2>
                  <p className="text-gray-600">
                    Your safety is our top priority. All data is encrypted using industry-standard protocols
                    and stored securely in compliance with privacy regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Privacy Controls</h2>
                  <p className="text-gray-600">
                    You have full control over your data. Choose what to share and who can access your
                    safety information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Data Management</h2>
                  <p className="text-gray-600">
                    Access, download, or delete your data at any time. We maintain transparent data
                    practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                {[
                  "Location Tracking",
                  "Emergency Contact Access",
                  "Data Sharing",
                  "App Notifications",
                  "Marketing Communications"
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{setting}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Policy</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We are committed to protecting your privacy and ensuring the security of your personal
                information. This privacy policy explains how we collect, use, and safeguard your data.
              </p>
              <h3 className="text-gray-900 font-medium mb-2">Data Collection</h3>
              <p className="mb-4">
                We collect location data, device information, and emergency contact details to provide
                our safety services. This information is used solely for safety monitoring and emergency
                response purposes.
              </p>
              <h3 className="text-gray-900 font-medium mb-2">Data Usage</h3>
              <p className="mb-4">
                Your data is used to:
                - Monitor your safety status
                - Respond to emergencies
                - Improve our safety features
                - Comply with legal requirements
              </p>
              <h3 className="text-gray-900 font-medium mb-2">Your Rights</h3>
              <p>
                You have the right to:
                - Access your personal data
                - Correct inaccurate information
                - Delete your data
                - Restrict data processing
                - Data portability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;