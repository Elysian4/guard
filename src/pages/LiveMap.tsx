import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS for map styling
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null); // Ref for the map container
  const mapInstance = useRef<L.Map | null>(null); // Ref for Leaflet map instance
  const userMarkerRef = useRef<L.Marker | null>(null); // Ref for the user marker

  // Store user position with default India coordinates
  const [userPosition, setUserPosition] = useLocalStorage<{ latitude: number; longitude: number }>(
    "USER_MARKER",
    { latitude: 20.5937, longitude: 78.9629 } // Default: India
  );

  // Store nearby markers
  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage<{ latitude: number; longitude: number }[]>(
    "NEARBY_MARKERS",
    []
  );

  // Get user location or fallback to India
  const location = useGeolocation();
  const currentPosition = location || userPosition; // Use geolocation if available, otherwise use last stored position

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([currentPosition.latitude, currentPosition.longitude], 5);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance.current);
    }
  }, []); // Runs only on mount

  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    // Remove the previous user marker if it exists
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
    }

    // Add a new user marker
    userMarkerRef.current = L.marker([currentPosition.latitude, currentPosition.longitude], {
      icon: L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default marker icon
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    // Center map on user location
    map.setView([currentPosition.latitude, currentPosition.longitude], map.getZoom());

    // Store updated user position
    setUserPosition({ latitude: currentPosition.latitude, longitude: currentPosition.longitude });

    // Load and display nearby markers
    nearbyMarkers.forEach(({ latitude, longitude }) => {
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`);
    });

    // Handle map click to add new markers
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Lat: ${lat.toFixed(2)}, Long: ${lng.toFixed(2)}`);

      // Update nearbyMarkers state
      setNearbyMarkers((prevMarkers) => [...prevMarkers, { latitude: lat, longitude: lng }]);
    };

    map.on("click", handleClick);

    // Cleanup event listener on component unmount
    return () => {
      map.off("click", handleClick);
    };
  }, [currentPosition.latitude, currentPosition.longitude, nearbyMarkers]); // Updates when location changes

  return <div ref={mapRef} className="map-container" />;
}