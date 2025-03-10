import React, { useState } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import { useSafetyStore } from "../store/safetyStore";
import { format } from "date-fns";
import Map from "../components/Map";

const TrackingHistory = () => {
  const { locationHistory } = useSafetyStore(); // Fetch location history
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // Define center safely
  const center: { lat: number; lng: number } =
    selectedLocation !== null && locationHistory[selectedLocation]
      ? {
          lat: locationHistory[selectedLocation].lat,
          lng: locationHistory[selectedLocation].lng,
        }
      : { lat: 40.712776, lng: -74.005974 }; // Default to New York if empty

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Location History</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <Calendar className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {locationHistory.length > 0 ? (
                locationHistory.map((location, index) => (
                  <div
                    key={location.timestamp}
                    className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedLocation === index ? "border-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedLocation(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(location.timestamp), "PPpp")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No location history available.</p>
              )}
            </div>

            <div className="h-[600px] rounded-lg overflow-hidden">
              <Map center={center} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingHistory;
