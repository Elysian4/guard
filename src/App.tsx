import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AlertTriangle } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Help from './pages/Help';
import DevicePairing from './pages/DevicePairing';
import Privacy from './pages/Privacy';
import SafetyAlerts from './pages/SafetyAlerts';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Other protected routes will be added here */}
                  <Route path="/device-pairing" element={<DevicePairing />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/safety-alerts" element={<SafetyAlerts />} />
                </Routes>
              </div>
            </AuthGuard>
          }
        />
      </Routes>
      {/* Global SOS Button */}
      <button 
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
          onClick={() => alert('SOS Triggered! Emergency services notified.')}
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="font-bold">SOS</span>
        </button>
    </Router>
  );
}

export default App;