import { MapPin, History, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafetyStatus from '../components/SafetyStatus';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2069')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 relative">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              AI-Driven Safety
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Real-time tracking, emergency alerts, and proactive safety measures to keep you protected 24/7.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/live-map"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Activate Safety
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Safety Status */}
        <div className="mb-12">
          <SafetyStatus status="safe" />
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/live-map"
            className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-x-4">
              <MapPin className="h-8 w-8 text-indigo-600" />
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Live Map
              </h3>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              View real-time location tracking and safety status updates.
            </p>
          </Link>

          <Link
            to="/tracking"
            className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-x-4">
              <History className="h-8 w-8 text-indigo-600" />
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Tracking History
              </h3>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Access your location history and movement patterns.
            </p>
          </Link>

          <Link
            to="/alerts"
            className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-x-4">
              <Bell className="h-8 w-8 text-indigo-600" />
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Safety Alerts
              </h3>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Check active alerts and safety notifications.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}