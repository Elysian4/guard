import axios from 'axios';

// Make sure the API URL is correctly configured using Vite's env variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API URL configured as:', API_URL);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isFirstLogin: boolean;
  voiceRecorded: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  console.log('Sending registration request to:', `${API_URL}/auth/register`);
  console.log('With credentials:', credentials);
  try {
    // Ensure the request body is correctly formatted
    const requestBody = {
      email: credentials.email,
      password: credentials.password,
      name: credentials.name
    };
    
    const response = await axios.post(`${API_URL}/auth/register`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration request failed:', error);
    throw error;
  }
};

export const getProfile = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

interface VoiceRecordingData {
  recordings: string[];
  userId: string;
  username: string;
}

export const uploadVoiceRecordings = async (data: VoiceRecordingData, token: string): Promise<void> => {
  console.log('Starting voice recordings upload...');
  console.log('Number of recordings:', data.recordings.length);

  try {
    const response = await axios.post(`${API_URL}/user/voice-recordings`, data, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000, // 30 seconds
    });
    
    console.log('Voice recordings upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Voice recordings upload failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    }
    throw error;
  }
};

export const skipVoiceRecording = async (token: string): Promise<void> => {
  await axios.post(`${API_URL}/user/skip-voice-recording`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};