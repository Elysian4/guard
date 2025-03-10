import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, X, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { uploadVoiceRecordings } from '../lib/auth';
import axios from 'axios';

interface VoiceRecordingModalProps {
  userId: string;
  onComplete: () => void;
  onClose: () => void;
}

const VoiceRecordingModal: React.FC<VoiceRecordingModalProps> = ({ userId, onComplete, onClose }) => {
  const [recordings, setRecordings] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingNumber, setRecordingNumber] = useState(1);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);

  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Convert to WAV format
        const wavBlob = await convertToWav(audioBlob);
        setRecordings(prev => [...prev, wavBlob]);
        setRecordingNumber(prev => prev + 1);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
        }
      }, 5000);
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access to continue.');
      console.error('Error accessing microphone:', err);
    }
  };

  // Function to convert audio blob to WAV format
  const convertToWav = async (blob: Blob): Promise<Blob> => {
    // For now, we'll just return the blob as is
    // In a production environment, you would want to properly convert to WAV format
    return blob;
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const uploadRecordings = async () => {
    if (recordings.length < 10) {
      setError('Please complete all 10 voice recordings before proceeding.');
      return;
    }

    if (!token) {
      setError('Authentication token is missing. Please try logging in again.');
      return;
    }

    if (!user || !user.name) {
      setError('User information is missing. Please try logging in again.');
      return;
    }

    setUploading(true);
    try {
      // Convert recordings to base64
      const recordingsBase64 = await Promise.all(
        recordings.map(async (blob) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = (reader.result as string).split(',')[1];
              resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
      );

      console.log('Uploading recordings...');
      await uploadVoiceRecordings({
        recordings: recordingsBase64,
        userId: userId,
        username: user.name
      }, token);
      
      console.log('Upload completed successfully');
      onComplete();
    } catch (err: unknown) {
      console.error('Error uploading recordings:', err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to upload voice recordings. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Voice Authentication Setup</h2>
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
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            For enhanced security, we need to record your voice. Please record yourself saying:
          </p>
          <p className="font-medium text-gray-900 mb-4">
            "My voice is my password, verify me"
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Recording {recordingNumber}/10</span>
              <span className="text-sm text-gray-500">{recordings.length} completed</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(recordings.length / 10) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-center mb-4">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors"
              >
                <Square className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={startRecording}
                disabled={recordings.length >= 10}
                className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                <Mic className="w-6 h-6" />
              </button>
            )}
          </div>
          
          <p className="text-center text-sm text-gray-500">
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={uploadRecordings}
            disabled={recordings.length < 10 || uploading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
          >
            {uploading ? 'Uploading...' : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Complete Setup
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordingModal; 