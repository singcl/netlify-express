const https = require('https');
const http = require('http');
const logger = require('../utils/logger');
const config = require('../config/app');

/**
 * Ping external API to keep it alive
 */
const pingExternalApi = async () => {
  try {
    logger.info('Starting external API ping task...');
    
    const apiUrl = 'https://neteasecloudmusicapi-wb0d.onrender.com/';
    const startTime = Date.now();
    
    const result = await makeRequest(apiUrl);
    const duration = Date.now() - startTime;
    
    const pingResult = {
      timestamp: new Date().toISOString(),
      api: 'NetEase Cloud Music API',
      url: apiUrl,
      status: result.success ? 'success' : 'failed',
      responseTime: `${duration}ms`,
      statusCode: result.statusCode,
      responseSize: result.responseSize,
      error: result.error || null
    };
    
    if (result.success) {
      logger.info('External API ping successful', pingResult);
    } else {
      logger.warn('External API ping failed', pingResult);
    }
    
    return pingResult;
    
  } catch (error) {
    logger.error('Error during external API ping:', error);
    return {
      timestamp: new Date().toISOString(),
      api: 'NetEase Cloud Music API',
      url: 'https://neteasecloudmusicapi-wb0d.onrender.com/',
      status: 'error',
      error: error.message
    };
  }
};

/**
 * Make HTTP/HTTPS request
 */
const makeRequest = (url) => {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    const startTime = Date.now();
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        
        resolve({
          success: res.statusCode >= 200 && res.statusCode < 300,
          statusCode: res.statusCode,
          responseSize: data.length,
          duration,
          headers: res.headers
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        statusCode: null,
        responseSize: 0,
        duration: Date.now() - startTime
      });
    });
    
    // Set timeout to 10 seconds
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout',
        statusCode: null,
        responseSize: 0,
        duration: Date.now() - startTime
      });
    });
  });
};

/**
 * Get API statistics
 */
const getApiStats = () => {
  // In a real application, you would store these stats in a database
  // For now, we'll return mock statistics
  return {
    totalPings: 100,
    successfulPings: 95,
    failedPings: 5,
    averageResponseTime: '245ms',
    lastPing: new Date().toISOString(),
    uptime: '99.5%'
  };
};

/**
 * Test specific NetEase Cloud Music API endpoints
 */
const testNetEaseEndpoints = async () => {
  try {
    logger.info('Testing NetEase Cloud Music API endpoints...');
    
    const baseUrl = 'https://neteasecloudmusicapi-wb0d.onrender.com';
    const endpoints = [
      { name: 'Search', path: '/search?keywords=test' },
      { name: 'Song Comments', path: '/comment/music?id=1824045033' },
      { name: 'Radio Programs', path: '/dj/program?rid=336355127' }
    ];
    
    const results = [];
    
    for (const endpoint of endpoints) {
      const url = `${baseUrl}${endpoint.path}`;
      const startTime = Date.now();
      
      try {
        const result = await makeRequest(url);
        const duration = Date.now() - startTime;
        
        results.push({
          endpoint: endpoint.name,
          path: endpoint.path,
          status: result.success ? 'success' : 'failed',
          statusCode: result.statusCode,
          responseTime: `${duration}ms`,
          responseSize: result.responseSize
        });
        
        logger.info(`Tested ${endpoint.name}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        
      } catch (error) {
        results.push({
          endpoint: endpoint.name,
          path: endpoint.path,
          status: 'error',
          error: error.message
        });
        
        logger.error(`Error testing ${endpoint.name}:`, error);
      }
      
      // Add delay between requests to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    logger.info('NetEase API endpoint testing completed', { results });
    return results;
    
  } catch (error) {
    logger.error('Error during NetEase API endpoint testing:', error);
    return [];
  }
};

module.exports = {
  pingExternalApi,
  getApiStats,
  testNetEaseEndpoints
}; 