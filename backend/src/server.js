const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({
    name: "EcoSort AI API Server",
    status: "Healthy",
    time: new Date()
  });
});

// Database and Server Boot
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosort-ai';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully for EcoSort AI.');
    app.listen(PORT, () => {
      console.log(`Express API Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.warn('Unable to connect to MongoDB directly. Starting server in simulation database backup fallback mode.');
    console.warn(`Error description: ${err.message}`);
    
    // Hackathon local developer server bootstrap fallback
    app.listen(PORT, () => {
      console.log(`EcoSort AI Mock Server active on port ${PORT} (Database simulator mode active)`);
      console.log('[EcoSort SW] Waste collection continues even during poor network connectivity.');
    });
  });
