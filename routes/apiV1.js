const express = require('express');
const timezone = require('../utils/timezone');
const mongoose = require('mongoose');
const router = express.Router();

// Define a Mongoose model
const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
});
const Data = mongoose.model('Data', DataSchema);

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Express API!',
    timestamp: timezone.toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET /api/users
router.get('/users', (req, res) => {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json(users);
});

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Name, email, and message are required' 
    });
  }
  
  // In a real app, you would save this to a database
  console.log('Contact form submission:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Thank you for your message! We\'ll get back to you soon.' 
  });
});

// GET /api/data
router.get('/data', async (req, res) => {
  try {
    const result = await Data.find({});
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 