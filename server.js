const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express on Netlify!');
});

// For local development
if (process.env.NETLIFY_DEV) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

// For Netlify deployment
exports.handler = serverless(app);