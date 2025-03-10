import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { login, register } from '../lib/auth';
import { useAuthStore } from '../store/authStore';
import VoiceRecordingModal from '../components/VoiceRecordingModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [userId, setUserId] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, logout } = useAuthStore();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('Name is required');
          setIsLoading(false);
          return;
        }
        
        console.log('Attempting to register with:', { email, password, name });
        const response = await register({ email, password, name });
        console.log('Registration successful:', response);
        setAuth(response.token, response.user);
        setUserId(response.user.id);
        setShowVoiceModal(true);
      } else {
        const response = await login({ email, password });
        setAuth(response.token, response.user);
        navigate(from, { replace: true });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error';
      
      // Handle axios error response if available
      const axiosError = error as { response?: { data?: { message?: string } } };
      const serverMessage = axiosError.response?.data?.message;
      
      console.error('Authentication error:', serverMessage || errorMessage);
      setError(isRegister 
        ? `Registration failed: ${serverMessage || errorMessage}` 
        : 'Invalid credentials');
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecordingComplete = () => {
    setShowVoiceModal(false);
    navigate(from, { replace: true });
  };

  const handleVoiceRecordingClose = () => {
    logout();
    setShowVoiceModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isRegister ? 'Create an account' : 'Sign in to AI Safety'}
        </h2>
        {!isRegister && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials:{' '}
            <span className="font-semibold">testuser@example.com / SecurePass123!</span>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : (isRegister ? 'Register' : 'Sign in')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
            </button>
          </div>
        </div>
      </div>

      {showVoiceModal && (
        <VoiceRecordingModal 
          userId={userId}
          onComplete={handleVoiceRecordingComplete}
          onClose={handleVoiceRecordingClose}
        />
      )}
    </div>
  );
}