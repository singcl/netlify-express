const express = require('express');
const config = require('../config/app');
const taskManager = require('../tasks');
const router = express.Router();

// GET /apiv2/status
router.get('/status', (req, res) => {
  res.json({
    version: config.api.v2.version,
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    features: ['enhanced-api', 'better-performance', 'improved-security']
  });
});

// GET /apiv2/products
router.get('/products', (req, res) => {
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
    version: config.api.v2.version,
    count: filteredProducts.length,
    products: filteredProducts
  });
});

// POST /apiv2/orders
router.post('/orders', (req, res) => {
  const { customerId, items, shippingAddress } = req.body;
  
  if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'Customer ID and items array are required',
      version: config.api.v2.version
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
    version: config.api.v2.version
  });
});

// GET /apiv2/tasks - Get task manager status
router.get('/tasks', (req, res) => {
  const status = taskManager.getStatus();
  res.json({
    version: config.api.v2.version,
    timestamp: new Date().toISOString(),
    ...status
  });
});

// POST /apiv2/tasks/start - Start task manager
router.post('/tasks/start', (req, res) => {
  try {
    taskManager.start();
    res.json({
      success: true,
      message: 'Task manager started successfully',
      version: config.api.v2.version,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start task manager',
      error: error.message,
      version: config.api.v2.version,
      timestamp: new Date().toISOString()
    });
  }
});

// POST /apiv2/tasks/stop - Stop task manager
router.post('/tasks/stop', (req, res) => {
  try {
    taskManager.stop();
    res.json({
      success: true,
      message: 'Task manager stopped successfully',
      version: config.api.v2.version,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to stop task manager',
      error: error.message,
      version: config.api.v2.version,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 