const serverless = require('serverless-http');
const app = require('../../server');

// Export the serverless handler for Netlify Functions
exports.handler = serverless(app); 