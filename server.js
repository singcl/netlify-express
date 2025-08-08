const express = require('express');
const path = require('path');

// Import routes, middleware, config, and task manager
const routes = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/app');
const taskManager = require('./tasks');

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(logger);

// Use routes
app.use('/', routes);

// Serve the main HTML file for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start server for local development
if (config.nodeEnv !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API v1 available at http://localhost:${PORT}${config.api.v1.prefix}`);
    console.log(`📡 API v2 available at http://localhost:${PORT}${config.api.v2.prefix}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    
    // Start task manager
    taskManager.start();
    console.log(`⏰ Task manager started`);
  });
}

// Export for serverless deployment
module.exports = app;