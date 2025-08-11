const express = require('express');
const timezone = require('../utils/timezone');
const Contact = require('../models/Contact');
const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Express API!',
    timestamp: timezone.toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET /api/users
router.get('/users', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Name, email, and message are required' 
    });
  }
  
  try {
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ 
      success: true, 
      data: newContact,
      message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ 
      error: 'Failed to save your message. Please try again later.' 
    });
  }
});

module.exports = router; 