import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS for map styling
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [city, setCity] = useState("Unknown");

  const [userPosition, setUserPosition] = useLocalStorage<{ latitude: number; longitude: number }>(
    "USER_MARKER",
    { latitude: 20.5937, longitude: 78.9629 } // Default: India
  );

  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage<{ latitude: number; longitude: number }[]>(
    "NEARBY_MARKERS",
    []
  );

  const location = useGeolocation();
  const currentPosition = location || userPosition || { latitude: 20.5937, longitude: 78.9629 };

  const fetchCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      setCity(data.address?.city || data.address?.town || data.address?.village || "Unknown");
    } catch (error) {
      console.error("Error fetching city name:", error);
      setCity("Unknown");
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([currentPosition.latitude, currentPosition.longitude], 16); // Increased zoom level

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      opacity: 0.9,
    }).addTo(mapInstance.current);
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    userMarkerRef.current = L.marker([currentPosition.latitude, currentPosition.longitude], {
      icon: L.icon({
        iconUrl: "/icons/user-location.png",
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -40],
      }),
    })
      .addTo(map)
      .bindPopup(`<b>You are in ${city}</b>`)
      .openPopup();

    fetchCityName(currentPosition.latitude, currentPosition.longitude);
    
    // Zooming in closer to the marker location
    map.flyTo([currentPosition.latitude, currentPosition.longitude], 17, { duration: 2 });

    setUserPosition({ latitude: currentPosition.latitude, longitude: currentPosition.longitude });

    nearbyMarkers.forEach(({ latitude, longitude }) => {
      L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: "/icons/marker.png",
          iconSize: [30, 45],
          iconAnchor: [15, 45],
        }),
      })
        .addTo(map)
        .bindPopup(`📍 <b>Lat:</b> ${latitude.toFixed(2)}, <b>Long:</b> ${longitude.toFixed(2)}`);
    });

    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: "/icons/marker.png",
          iconSize: [30, 45],
          iconAnchor: [15, 45],
        }),
      })
        .addTo(map)
        .bindPopup(`📍 <b>Lat:</b> ${lat.toFixed(2)}, <b>Long:</b> ${lng.toFixed(2)}`);

      setNearbyMarkers((prevMarkers) => [...prevMarkers, { latitude: lat, longitude: lng }]);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [currentPosition.latitude, currentPosition.longitude, nearbyMarkers, city]);

  return (
    <div className="relative w-1/2 h-[80vh] p-4 flex items-center justify-center">
      {/* Map Title */}
      <h2 className="absolute top-6 left-6 text-white text-lg font-semibold z-30 bg-black/60 px-3 py-1 rounded-lg shadow-md">
        Live Map Tracking - {city}
      </h2>

      {/* 🚨 SOS Button (Fixed on Top) */}
      <button
        className="fixed bottom-6 right-6 bg-red-600 text-white font-bold py-3 px-5 rounded-full 
                   shadow-lg z-[9999] hover:bg-red-700 transition-all duration-300"
        onClick={() => alert("🚨 SOS Triggered! Sending help...")}
      >
        🚨 SOS
      </button>

      {/* Map Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/10 z-10 rounded-2xl shadow-lg" />

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-2xl shadow-xl transition-all duration-300 border-2 border-gray-300" />
    </div>
  );
}
