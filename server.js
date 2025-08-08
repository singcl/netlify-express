const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Express API!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/users', (req, res) => {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json(users);
});

app.post('/api/contact', (req, res) => {
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

// API v2 routes
app.get('/apiv2/status', (req, res) => {
  res.json({
    version: '2.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    features: ['enhanced-api', 'better-performance', 'improved-security']
  });
});

app.get('/apiv2/products', (req, res) => {
  // Mock product data for v2 API
  const products = [
    { 
      id: 1, 
      name: 'Premium Widget', 
      price: 99.99, 
      category: 'electronics',
      inStock: true,
      rating: 4.8
    },
    { 
      id: 2, 
      name: 'Super Gadget', 
      price: 149.99, 
      category: 'electronics',
      inStock: false,
      rating: 4.6
    },
    { 
      id: 3, 
      name: 'Amazing Tool', 
      price: 79.99, 
      category: 'tools',
      inStock: true,
      rating: 4.9
    }
  ];
  
  // Support query parameters for filtering
  const { category, inStock } = req.query;
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (inStock !== undefined) {
    const stockFilter = inStock === 'true';
    filteredProducts = filteredProducts.filter(product => product.inStock === stockFilter);
  }
  
  res.json({
    version: '2.0.0',
    count: filteredProducts.length,
    products: filteredProducts
  });
});

app.post('/apiv2/orders', (req, res) => {
  const { customerId, items, shippingAddress } = req.body;
  
  if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'Customer ID and items array are required',
      version: '2.0.0'
    });
  }
  
  // In a real app, you would save this to a database
  const orderId = Date.now().toString();
  const order = {
    id: orderId,
    customerId,
    items,
    shippingAddress,
    status: 'pending',
    createdAt: new Date().toISOString(),
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
  
  console.log('New order created:', order);
  
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
    version: '2.0.0'
  });
});

// Serve the main HTML file for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
}

// Export for serverless deployment
module.exports = app;