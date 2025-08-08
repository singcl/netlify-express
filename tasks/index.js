const cron = require('node-cron');
const config = require('../config/app');
const logger = require('../utils/logger');

// Import individual task modules
const cleanupTasks = require('./cleanup');
const healthCheckTasks = require('./healthCheck');
const dataSyncTasks = require('./dataSync');
const externalApiTasks = require('./externalApi');

class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.isRunning = false;
  }

  /**
   * Initialize and start all scheduled tasks
   */
  start() {
    if (this.isRunning) {
      logger.info('Task manager is already running');
      return;
    }

    logger.info('Starting task manager...');

    // Start cleanup tasks
    this.startCleanupTasks();

    // Start health check tasks
    this.startHealthCheckTasks();

    // Start data sync tasks
    this.startDataSyncTasks();

    // Start external API monitoring tasks
    this.startExternalApiTasks();

    this.isRunning = true;
    logger.info('Task manager started successfully');
  }

  /**
   * Stop all scheduled tasks
   */
  stop() {
    if (!this.isRunning) {
      logger.info('Task manager is not running');
      return;
    }

    logger.info('Stopping task manager...');

    // Stop all tasks
    this.tasks.forEach((task, name) => {
      task.stop();
      logger.info(`Stopped task: ${name}`);
    });

    this.tasks.clear();
    this.isRunning = false;
    logger.info('Task manager stopped successfully');
  }

  /**
   * Get status of all tasks
   */
  getStatus() {
    const status = {
      isRunning: this.isRunning,
      tasks: []
    };

    this.tasks.forEach((task, name) => {
      status.tasks.push({
        name,
        running: task.running,
        nextRun: task.nextDate ? task.nextDate().toISOString() : null
      });
    });

    return status;
  }

  /**
   * Start cleanup tasks
   */
  startCleanupTasks() {
    // Clean up old logs every day at 2 AM
    const cleanupLogsTask = cron.schedule('0 2 * * *', () => {
      cleanupTasks.cleanupLogs();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('cleanup-logs', cleanupLogsTask);

    // Clean up temporary files every 6 hours
    const cleanupTempTask = cron.schedule('0 */6 * * *', () => {
      cleanupTasks.cleanupTempFiles();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('cleanup-temp', cleanupTempTask);
  }

  /**
   * Start health check tasks
   */
  startHealthCheckTasks() {
    // Health check every 5 minutes
    const healthCheckTask = cron.schedule('*/5 * * * *', () => {
      healthCheckTasks.performHealthCheck();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('health-check', healthCheckTask);

    // Database health check every 15 minutes
    const dbHealthCheckTask = cron.schedule('*/15 * * * *', () => {
      healthCheckTasks.checkDatabaseHealth();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('db-health-check', dbHealthCheckTask);
  }

  /**
   * Start data sync tasks
   */
  startDataSyncTasks() {
    // Sync data every hour
    const dataSyncTask = cron.schedule('0 * * * *', () => {
      dataSyncTasks.syncData();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('data-sync', dataSyncTask);

    // Backup data every day at 3 AM
    const backupTask = cron.schedule('0 3 * * *', () => {
      dataSyncTasks.backupData();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('data-backup', backupTask);
  }

  /**
   * Start external API monitoring tasks
   */
  startExternalApiTasks() {
    // Ping NetEase Cloud Music API every minute to keep it alive
    const neteasePingTask = cron.schedule('* * * * *', () => {
      externalApiTasks.pingExternalApi();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('netease-api-ping', neteasePingTask);

    // Test NetEase API endpoints every 30 minutes
    const neteaseTestTask = cron.schedule('*/30 * * * *', () => {
      externalApiTasks.testNetEaseEndpoints();
    }, {
      scheduled: true,
      timezone: "UTC"
    });

    this.tasks.set('netease-api-test', neteaseTestTask);
  }
}

module.exports = new TaskManager(); 