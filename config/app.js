// Application configuration
const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API configuration
  api: {
    v1: {
      prefix: '/api',
      version: '1.0.0'
    },
    v2: {
      prefix: '/apiv2',
      version: '2.0.0'
    }
  },
  
  // Database configuration (for future use)
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/netlify-express',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // Security configuration
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'false'
  }
};

module.exports = config; 