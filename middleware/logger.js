// Request logging middleware
const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log request details
  console.log(`📥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  
  // Log request body for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
  }
  
  // Log response when it's sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = logger; 