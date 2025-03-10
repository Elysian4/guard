import React from 'react';
import { Shield, MapPin, Bell, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen relative flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">AI-Driven Safety</h1>
          <p className="text-xl mb-8">Real-time tracking, emergency alerts, and proactive safety</p>
          <Link
            to="/live-map"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Activate Safety
          </Link>
        </div>
      </div>

      {/* Safety Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Safety Status</h2>
              <p className="text-green-600 font-semibold mt-2">Safe</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Live Map',
              icon: MapPin,
              description: 'Track real-time location and movement',
              link: '/live-map',
              color: 'blue'
            },
            {
              title: 'Safety Alerts',
              icon: Bell,
              description: 'View and manage safety notifications',
              link: '/safety-alerts',
              color: 'yellow'
            },
            {
              title: 'Device Pairing',
              icon: Smartphone,
              description: 'Connect and manage your safety devices',
              link: '/device-pairing',
              color: 'purple'
            }
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`h-12 w-12 rounded-lg bg-${item.color}-100 flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;