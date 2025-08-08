const express = require('express');
const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Express API!',
    timestamp: new Date().toISOString(),
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

module.exports = router; 