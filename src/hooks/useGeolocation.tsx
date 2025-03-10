import { useEffect, useState } from "react";

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export default function useGeolocation(): GeolocationPosition {
  const [position, setPosition] = useState<GeolocationPosition>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    const onSuccess = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.latitude,
        longitude: pos.longitude,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      console.error("Error retrieving geolocation:", error);
    };

    const watcher = navigator.geolocation.watchPosition(
      (pos) => onSuccess(pos.coords),
      onError
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return position;
}
