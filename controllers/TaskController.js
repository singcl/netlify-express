const timezone = require('../utils/timezone');
const taskManager = require('../tasks');
const externalApiTasks = require('../tasks/externalApi');

class TaskController {
  // 获取任务管理器状态
  static getTaskStatus(req, res) {
    try {
      const status = taskManager.getStatus();
      res.json({
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString(),
        ...status
      });
    } catch (error) {
      console.error('获取任务管理器状态失败:', error);
      res.status(500).json({
        error: '获取任务管理器状态失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 启动任务管理器
  static startTaskManager(req, res) {
    try {
      taskManager.start();
      res.json({
        success: true,
        message: '任务管理器启动成功',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '任务管理器启动失败',
        error: error.message,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 停止任务管理器
  static stopTaskManager(req, res) {
    try {
      taskManager.stop();
      res.json({
        success: true,
        message: '任务管理器停止成功',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '任务管理器停止失败',
        error: error.message,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 获取外部API监控状态
  static async getExternalApiStatus(req, res) {
    try {
      const stats = externalApiTasks.getApiStats();
      res.json({
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString(),
        externalApi: {
          name: 'NetEase Cloud Music API',
          url: 'https://neteasecloudmusicapi-wb0d.onrender.com/',
          stats
        }
      });
    } catch (error) {
      console.error('获取外部API状态失败:', error);
      res.status(500).json({
        success: false,
        message: '获取外部API状态失败',
        error: error.message,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 手动测试外部API
  static async testExternalApi(req, res) {
    try {
      const result = await externalApiTasks.pingExternalApi();
      res.json({
        success: true,
        message: '外部API测试完成',
        result,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('测试外部API失败:', error);
      res.status(500).json({
        success: false,
        message: '测试外部API失败',
        error: error.message,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }
}

module.exports = TaskController;