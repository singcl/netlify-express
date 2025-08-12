const express = require('express');
const config = require('../config/app');
const timezone = require('../utils/timezone');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');
const TaskController = require('../controllers/TaskController');
const router = express.Router();

// 设置API版本
router.use((req, res, next) => {
  req.app.set('apiVersion', config.api.v2.version);
  next();
});

// GET /apiv2/status
router.get('/status', (req, res) => {
  res.json({
    version: req.app.get('apiVersion'),
    status: 'active',
    timestamp: timezone.toISOString(),
    environment: config.nodeEnv,
    features: ['enhanced-api', 'better-performance', 'improved-security'],
    timezone: timezone.getTimezoneInfo()
  });
});

// GET /apiv2/products - 获取产品列表
router.get('/products', ProductController.getProducts);

// GET /apiv2/products/:id - 获取单个产品
router.get('/products/:id', ProductController.getProductById);

// POST /apiv2/products - 创建新产品
router.post('/products', ProductController.createProduct);

// PUT /apiv2/products/:id - 更新产品
router.put('/products/:id', ProductController.updateProduct);

// DELETE /apiv2/products/:id - 删除产品
router.delete('/products/:id', ProductController.deleteProduct);

// POST /apiv2/orders - 创建订单
router.post('/orders', OrderController.createOrder);

// GET /apiv2/tasks - 获取任务管理器状态
router.get('/tasks', TaskController.getTaskStatus);

// POST /apiv2/tasks/start - 启动任务管理器
router.post('/tasks/start', TaskController.startTaskManager);

// POST /apiv2/tasks/stop - 停止任务管理器
router.post('/tasks/stop', TaskController.stopTaskManager);

// GET /apiv2/external-api - 获取外部API监控状态
router.get('/external-api', TaskController.getExternalApiStatus);

// POST /apiv2/external-api/test - 手动测试外部API
router.post('/external-api/test', TaskController.testExternalApi);

// POST /apiv2/external-api/test-endpoints - 测试特定端点
router.post('/external-api/test-endpoints', async (req, res) => {
  try {
    const externalApiTasks = require('../tasks/externalApi');
    const results = await externalApiTasks.testNetEaseEndpoints();
    res.json({
      success: true,
      message: '外部API端点测试完成',
      results,
      version: req.app.get('apiVersion'),
      timestamp: timezone.toISOString()
    });
  } catch (error) {
    console.error('测试外部API端点失败:', error);
    res.status(500).json({
      success: false,
      message: '测试外部API端点失败',
      error: error.message,
      version: req.app.get('apiVersion'),
      timestamp: timezone.toISOString()
    });
  }
});

module.exports = router;