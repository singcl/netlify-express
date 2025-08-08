// Logger utility for consistent logging across the application
const timezone = require('./timezone');

/**
 * Log levels
 */
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

/**
 * Get current log level from environment or default to INFO
 */
const getLogLevel = () => {
  const level = process.env.LOG_LEVEL || 'info';
  return LOG_LEVELS[level.toUpperCase()] || LOG_LEVELS.INFO;
};

/**
 * Format log message with timestamp and level
 */
const formatMessage = (level, message, data = null) => {
  const timestamp = timezone.toISOString();
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message
  };
  
  if (data) {
    logEntry.data = data;
  }
  
  return JSON.stringify(logEntry);
};

/**
 * Logger class
 */
class Logger {
  constructor() {
    this.logLevel = getLogLevel();
  }

  /**
   * Log error message
   */
  error(message, data = null) {
    if (this.logLevel >= LOG_LEVELS.ERROR) {
      console.error(formatMessage('error', message, data));
    }
  }

  /**
   * Log warning message
   */
  warn(message, data = null) {
    if (this.logLevel >= LOG_LEVELS.WARN) {
      console.warn(formatMessage('warn', message, data));
    }
  }

  /**
   * Log info message
   */
  info(message, data = null) {
    if (this.logLevel >= LOG_LEVELS.INFO) {
      console.log(formatMessage('info', message, data));
    }
  }

  /**
   * Log debug message
   */
  debug(message, data = null) {
    if (this.logLevel >= LOG_LEVELS.DEBUG) {
      console.log(formatMessage('debug', message, data));
    }
  }

  /**
   * Log task execution
   */
  task(taskName, action, data = null) {
    this.info(`Task: ${taskName} - ${action}`, data);
  }

  /**
   * Log API request
   */
  api(method, path, statusCode, duration = null) {
    const data = { method, path, statusCode };
    if (duration) {
      data.duration = `${duration}ms`;
    }
    this.info(`API ${method} ${path} - ${statusCode}`, data);
  }

  /**
   * Log database operation
   */
  database(operation, table, duration = null) {
    const data = { operation, table };
    if (duration) {
      data.duration = `${duration}ms`;
    }
    this.info(`Database ${operation} on ${table}`, data);
  }
}

// Export singleton instance
module.exports = new Logger(); 