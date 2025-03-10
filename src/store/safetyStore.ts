import { create } from 'zustand';
import { format } from 'date-fns';

interface Location {
  lat: number;
  lng: number;
  timestamp: string;
}

interface Alert {
  id: string;
  type: 'emergency' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface Device {
  id: string;
  name: string;
  type: string;
  connected: boolean;
}

interface SafetyState {
  status: 'safe' | 'at-risk';
  currentLocation: Location | null;
  locationHistory: Location[];
  alerts: Alert[];
  devices: Device[];
  setStatus: (status: 'safe' | 'at-risk') => void;
  updateLocation: (lat: number, lng: number) => void;
  addAlert: (type: 'emergency' | 'warning' | 'info', title: string, message: string) => void;
  dismissAlert: (id: string) => void;
  addDevice: (name: string, type: string) => void;
  removeDevice: (id: string) => void;
  toggleDeviceConnection: (id: string) => void;
}

export const useSafetyStore = create<SafetyState>((set) => ({
  status: 'safe',
  currentLocation: null,
  locationHistory: [],
  alerts: [
    {
      id: '1',
      type: 'emergency',
      title: 'Emergency Alert',
      message: 'Unusual activity detected in your area',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'warning',
      title: 'Warning',
      message: 'Battery level low on safety device',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'info',
      title: 'Information',
      message: 'Weekly safety report available',
      timestamp: new Date().toISOString(),
    },
  ],
  devices: [
    {
      id: '1',
      name: 'Primary Phone',
      type: 'smartphone',
      connected: true,
    },
    {
      id: '2',
      name: 'Backup Device',
      type: 'smartphone',
      connected: false,
    },
  ],

  setStatus: (status) => set({ status }),

  updateLocation: (lat, lng) =>
    set((state) => {
      const newLocation = {
        lat,
        lng,
        timestamp: new Date().toISOString(),
      };
      return {
        currentLocation: newLocation,
        locationHistory: [newLocation, ...state.locationHistory].slice(0, 50),
      };
    }),

  addAlert: (type, title, message) =>
    set((state) => ({
      alerts: [
        {
          id: Math.random().toString(36).substr(2, 9),
          type,
          title,
          message,
          timestamp: new Date().toISOString(),
        },
        ...state.alerts,
      ],
    })),

  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),

  addDevice: (name, type) =>
    set((state) => ({
      devices: [
        ...state.devices,
        {
          id: Math.random().toString(36).substr(2, 9),
          name,
          type,
          connected: true,
        },
      ],
    })),

  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== id),
    })),

  toggleDeviceConnection: (id) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.id === id
          ? { ...device, connected: !device.connected }
          : device
      ),
    })),
}));