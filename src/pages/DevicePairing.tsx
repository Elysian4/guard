import React from 'react';
import { Smartphone, Wifi, Plus, Trash2 } from 'lucide-react';

const DevicePairing = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Device Pairing</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Add New Device</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Active Device */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Primary Phone</h3>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Wifi className="w-4 h-4" />
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Inactive Device */}
            <div className="border rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Backup Device</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Wifi className="w-4 h-4" />
                      <span>Disconnected</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pairing Instructions</h2>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    1
                  </div>
                  <span>Download the AI Safety app on your device</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    2
                  </div>
                  <span>Open the app and go to Settings → Pair Device</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    3
                  </div>
                  <span>Scan the QR code or enter the pairing code manually</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePairing;