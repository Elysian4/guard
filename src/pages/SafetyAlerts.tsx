import React from 'react';
import { Bell, AlertTriangle, Info } from 'lucide-react';

const SafetyAlerts = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Safety Alerts</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
              <Bell className="w-4 h-4" />
              <span>Manage Notifications</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Emergency Alert */}
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-medium text-red-900">Emergency Alert</h3>
                  <p className="text-red-700">Unusual activity detected in your area</p>
                  <div className="mt-2">
                    <button className="text-red-600 hover:text-red-700 font-medium mr-4">
                      Acknowledge
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Alert
            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-900">Warning</h3>
                  <p className="text-yellow-700">Battery level low on safety device</p>
                  <div className="mt-2">
                    <button className="text-yellow-600 hover:text-yellow-700 font-medium mr-4">
                      Dismiss
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                      Check Device
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Info Alert */}
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Information</h3>
                  <p className="text-blue-700">Weekly safety report available</p>
                  <div className="mt-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium mr-4">
                      View Report
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlerts;