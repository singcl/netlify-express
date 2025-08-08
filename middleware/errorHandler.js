// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Log error details for debugging
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Send error response
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler; 