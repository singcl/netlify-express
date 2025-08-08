const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

/**
 * Clean up old log files
 */
const cleanupLogs = async () => {
  try {
    logger.info('Starting log cleanup task...');
    
    const logsDir = path.join(__dirname, '../logs');
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const cutoffDate = new Date(Date.now() - maxAge);
    
    // Check if logs directory exists
    try {
      await fs.access(logsDir);
    } catch (error) {
      logger.info('Logs directory does not exist, skipping cleanup');
      return;
    }
    
    const files = await fs.readdir(logsDir);
    let deletedCount = 0;
    
    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(logsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          deletedCount++;
          logger.info(`Deleted old log file: ${file}`);
        }
      }
    }
    
    logger.info(`Log cleanup completed. Deleted ${deletedCount} files.`);
  } catch (error) {
    logger.error('Error during log cleanup:', error);
  }
};

/**
 * Clean up temporary files
 */
const cleanupTempFiles = async () => {
  try {
    logger.info('Starting temporary files cleanup task...');
    
    const tempDir = path.join(__dirname, '../temp');
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const cutoffDate = new Date(Date.now() - maxAge);
    
    // Check if temp directory exists
    try {
      await fs.access(tempDir);
    } catch (error) {
      logger.info('Temp directory does not exist, skipping cleanup');
      return;
    }
    
    const files = await fs.readdir(tempDir);
    let deletedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = await fs.stat(filePath);
      
      if (stats.mtime < cutoffDate) {
        await fs.unlink(filePath);
        deletedCount++;
        logger.info(`Deleted temporary file: ${file}`);
      }
    }
    
    logger.info(`Temporary files cleanup completed. Deleted ${deletedCount} files.`);
  } catch (error) {
    logger.error('Error during temporary files cleanup:', error);
  }
};

/**
 * Clean up old database backups
 */
const cleanupBackups = async () => {
  try {
    logger.info('Starting backup cleanup task...');
    
    const backupDir = path.join(__dirname, '../backups');
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const cutoffDate = new Date(Date.now() - maxAge);
    
    // Check if backup directory exists
    try {
      await fs.access(backupDir);
    } catch (error) {
      logger.info('Backup directory does not exist, skipping cleanup');
      return;
    }
    
    const files = await fs.readdir(backupDir);
    let deletedCount = 0;
    
    for (const file of files) {
      if (file.endsWith('.sql') || file.endsWith('.json')) {
        const filePath = path.join(backupDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          deletedCount++;
          logger.info(`Deleted old backup file: ${file}`);
        }
      }
    }
    
    logger.info(`Backup cleanup completed. Deleted ${deletedCount} files.`);
  } catch (error) {
    logger.error('Error during backup cleanup:', error);
  }
};

module.exports = {
  cleanupLogs,
  cleanupTempFiles,
  cleanupBackups
}; 