import React, { useState } from "react"; 

import { Search, Calendar, MapPin } from "lucide-react"; 

import { useSafetyStore } from "../store/safetyStore"; 

import { format } from "date-fns"; 

import Map from "../components/Map"; 

 

const TrackingHistory = () => { 

  const { locationHistory = [] } = useSafetyStore(); 

  const [searchTerm, setSearchTerm] = useState(""); 

 

  // Hardcoded sample locations 

  const sampleLocations = [ 

    { lat: 12.8412, lng: 80.1535, timestamp: "2025-03-10T10:30:00Z" }, 

    { lat: 12.8420, lng: 80.1542, timestamp: "2025-03-10T11:00:00Z" }, 

    { lat: 12.8435, lng: 80.1558, timestamp: "2025-03-10T12:15:00Z" }, 

  ]; 

 

  // Use sample locations if no history exists 

  const displayLocations = locationHistory.length > 0 ? locationHistory : sampleLocations; 

 

  // Get the latest location 

  const latestLocation = displayLocations.length > 0 ? displayLocations[displayLocations.length - 1] : null; 

 

  const center = latestLocation 

    ? { lat: latestLocation.lat, lng: latestLocation.lng } 

    : { lat: 12.8406, lng: 80.1530 }; // Default to VIT Chennai 

 

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

            {/* List of past locations */} 

            <div className="space-y-4"> 

              {displayLocations.map((location, index) => ( 

                <div key={index} className="border rounded-lg p-4 bg-blue-50"> 

                  <div className="flex items-center gap-3"> 

                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"> 

                      <MapPin className="w-5 h-5 text-blue-600" /> 

                    </div> 

                    <div> 

                      <h3 className="font-medium text-gray-900"> 

                        {`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`} 

                      </h3> 

                      <p className="text-sm text-gray-500"> 

                        {location.timestamp ? format(new Date(location.timestamp), "PPpp") : "Unknown time"} 

                      </p> 

                    </div> 

                  </div> 

                </div> 

              ))} 

            </div> 

 

            {/* Map with latest location */} 

            <div className="h-[600px] rounded-lg overflow-hidden"> 

              {latestLocation && <Map center={center} marker={[latestLocation]} />} 

            </div> 

          </div> 

        </div> 

      </div> 

    </div> 

  ); 

}; 

 

export default TrackingHistory; 

 

 