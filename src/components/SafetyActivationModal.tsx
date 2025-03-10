import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface SafetyActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SafetyActivationModal: React.FC<SafetyActivationModalProps> = ({ isOpen, onClose }) => {
  const [safetyCode, setSafetyCode] = useState('');
  const [endingLocation, setEndingLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!safetyCode.trim()) {
      setError('Safety code is required');
      return;
    }
    
    if (!endingLocation.trim()) {
      setError('Ending location is required');
      return;
    }
    
    // Store the safety information in localStorage or context
    localStorage.setItem('SAFETY_CODE', safetyCode);
    localStorage.setItem('ENDING_LOCATION', endingLocation);
    localStorage.setItem('SAFETY_ACTIVE', 'true');
    
    // Close the modal and navigate to the live map
    onClose();
    navigate('/live-map');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Activate Safety</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="safetyCode" className="block text-gray-700 font-medium mb-2">
              Safety Code
            </label>
            <input
              type="text"
              id="safetyCode"
              value={safetyCode}
              onChange={(e) => setSafetyCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your safety code"
            />
            <p className="text-sm text-gray-500 mt-1">
              This code will be required to deactivate safety mode
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="endingLocation" className="block text-gray-700 font-medium mb-2">
              Ending Location
            </label>
            <input
              type="text"
              id="endingLocation"
              value={endingLocation}
              onChange={(e) => setEndingLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your destination"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Activate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SafetyActivationModal; 