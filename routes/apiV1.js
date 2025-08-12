const express = require('express');
const timezone = require('../utils/timezone');
const ContactController = require('../controllers/ContactController');
const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({
    message: 'Hello from Express API!',
    timestamp: timezone.toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET /api/contacts - 获取所有联系人
router.get('/contacts', ContactController.getContacts);

// 保持向后兼容性：重定向GET /api/users到GET /api/contacts
router.get('/users', (req, res) => {
  res.redirect(req.baseUrl + '/contacts');
});

// GET /api/contacts/:id - 获取单个联系人
router.get('/contacts/:id', ContactController.getContactById);

// POST /api/contacts - 创建新联系人
router.post('/contacts', ContactController.createContact);

// 保持向后兼容性：重定向POST /api/contact到POST /api/contacts
router.post('/contact', (req, res) => {
  res.redirect(307, req.baseUrl + '/contacts');
});

// PUT /api/contacts/:id - 更新联系人
router.put('/contacts/:id', ContactController.updateContact);

// DELETE /api/contacts/:id - 删除联系人
router.delete('/contacts/:id', ContactController.deleteContact);

module.exports = router;