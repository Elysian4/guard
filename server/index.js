import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId;
    const username = req.body.username;
    // Save in both the uploads directory and the speaker recognition directory
    const uploadDir = path.join(__dirname, 'uploads', userId);
    const speakerDir = path.join(__dirname, '..', 'Backend_trackApp', 'spkrec-ecapa-voxceleb', username);
    
    // Create directories if they don't exist
    [uploadDir, speakerDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    // Save to speaker recognition directory
    cb(null, speakerDir);
  },
  filename: (req, file, cb) => {
    // Format: enroll_1.wav, enroll_2.wav, etc.
    const index = parseInt(file.originalname.split('-')[1]);
    cb(null, `enroll_${index}.wav`);
  }
});

const upload = multer({ storage });

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.o6nr6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    createDummyUser(); // Create dummy user only after successful connection
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isFirstLogin: { type: Boolean, default: true },
  voiceRecorded: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Voice Recording Schema
const voiceRecordingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recordings: [String], // Array of file paths
  createdAt: { type: Date, default: Date.now }
});

const VoiceRecording = mongoose.model('VoiceRecording', voiceRecordingSchema);

// Create dummy user
async function createDummyUser() {
  try {
    const existingUser = await User.findOne({ email: 'testuser@example.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('SecurePass123!', 10);
      await User.create({
        email: 'testuser@example.com',
        password: hashedPassword,
        name: 'Test User',
        isFirstLogin: true,
        voiceRecorded: false
      });
      console.log('Dummy user created');
    }
  } catch (error) {
    console.error('Error creating dummy user:', error);
  }
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  console.log('Authenticating request to:', req.originalUrl);
  console.log('Headers:', req.headers);
  
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token extracted:', token ? 'Present' : 'Missing');

  if (!token) {
    console.log('Authentication failed: No token provided');
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      console.log('Authentication failed: Invalid token', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Authentication successful for user:', user.userId);
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Update last login time
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isFirstLogin: user.isFirstLogin,
        voiceRecorded: user.voiceRecorded
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { email, password, name } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
      console.log('Missing required fields:', { email: !!email, password: !!password, name: !!name });
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      isFirstLogin: true,
      voiceRecorded: false
    });
    
    console.log('New user created:', newUser._id);
    
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        isFirstLogin: newUser.isFirstLogin,
        voiceRecorded: newUser.voiceRecorded
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Voice Recording Route
app.post('/api/user/voice-recordings', authenticateToken, upload.array('recordings', 10), async (req, res) => {
  try {
    console.log('Voice recordings request received');
    console.log('User ID from token:', req.user.userId);
    console.log('Files received:', req.files ? req.files.length : 0);
    
    const userId = req.user.userId;
    const files = req.files;
    
    if (!files || files.length < 10) {
      console.log('Error: Not enough recordings received');
      return res.status(400).json({ message: 'Please upload all 10 voice recordings' });
    }

    // Get the user's name for the directory
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get file paths
    const filePaths = files.map(file => file.path);
    console.log('File paths:', filePaths);
    
    // Save to database
    const voiceRecording = await VoiceRecording.create({
      userId,
      recordings: filePaths
    });
    console.log('Voice recordings saved to database:', voiceRecording._id);

    // Trigger the speaker recognition model training
    try {
      const { spawn } = require('child_process');
      const pythonProcess = spawn('python', [
        path.join(__dirname, '..', 'Backend_trackApp', 'train_model.py'),
        user.name // Pass the username as an argument
      ]);

      pythonProcess.stdout.on('data', (data) => {
        console.log('Model training output:', data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error('Model training error:', data.toString());
      });

      pythonProcess.on('close', (code) => {
        console.log('Model training finished with code:', code);
      });
    } catch (error) {
      console.error('Error running model training:', error);
      // Don't throw error here, as recordings are already saved
    }
    
    // Update user to mark voice as recorded and no longer first login
    const updatedUser = await User.findByIdAndUpdate(userId, {
      voiceRecorded: true,
      isFirstLogin: false
    }, { new: true });
    console.log('User updated:', updatedUser._id, 'voiceRecorded:', updatedUser.voiceRecorded);
    
    res.json({ message: 'Voice recordings uploaded successfully' });
  } catch (error) {
    console.error('Error handling voice recordings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Skip voice recording (for testing purposes)
app.post('/api/user/skip-voice-recording', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, {
      voiceRecorded: true,
      isFirstLogin: false
    });
    
    res.json({ message: 'Voice recording skipped' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});