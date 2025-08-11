const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Import routes, middleware, config, and task manager
const routes = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/app');
const taskManager = require('./tasks');

const app = express();
const PORT = config.port;

// MongoDB connection URI
//const db = 'mongodb://127.0.0.1/local'; // 本地数据库
const remoteURI = 'mongodb+srv://singcl:singcl@imcoco-api-cluster.7g4ea51.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=imcoco-api-cluster';
const uri = process.env.MONGODB_URI || remoteURI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB via Mongoose');
});

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