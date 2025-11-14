import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API endpoints list
app.get('/api/endpoints', (req, res) => {
  const endpoints = [
    // Admin routes
    { method: 'POST', path: '/api/admin/register', description: 'Register a new admin' },
    { method: 'POST', path: '/api/admin/login', description: 'Login admin and get JWT token' },
    // Property routes (protected)
    { method: 'GET', path: '/api/properties', description: 'Get all properties (supports filters: location, minPrice, maxPrice, projectName)' },
    { method: 'GET', path: '/api/properties/:id', description: 'Get property by ID' },
    { method: 'POST', path: '/api/properties', description: 'Create a new property (with image uploads)' },
    { method: 'PUT', path: '/api/properties/:id', description: 'Update property by ID (with optional image uploads)' },
    { method: 'DELETE', path: '/api/properties/:id', description: 'Delete property by ID' },
    // Utility routes
    { method: 'GET', path: '/api/health', description: 'Health check' },
    { method: 'GET', path: '/api/endpoints', description: 'List all API endpoints' },
  ];
  res.json({ endpoints });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
