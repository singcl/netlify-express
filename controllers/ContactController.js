const timezone = require('../utils/timezone');
const Contact = require('../models/Contact');

class ContactController {
  // 获取所有联系人
  static async getContacts(req, res) {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      console.error('获取联系人失败:', error);
      res.status(500).json({ error: '获取联系人失败' });
    }
  }

  // 创建新联系人
  static async createContact(req, res) {
    try {
      const { name, email, message, phone } = req.body;

      // 验证必填字段
      if (!name || !email || !message) {
        return res.status(400).json({
          error: '姓名、邮箱和消息是必填项'
        });
      }

      // 验证字段长度
      if (name.length > 50) {
        return res.status(400).json({
          error: '姓名必须少于50个字符'
        });
      }

      if (email.length > 100) {
        return res.status(400).json({
          error: '邮箱必须少于100个字符'
        });
      }

      if (message.length > 500) {
        return res.status(400).json({
          error: '消息必须少于500个字符'
        });
      }

      // 创建新联系人
      const newContact = await Contact.create({
        name,
        email,
        message,
        phone
      });

      res.status(201).json({
        success: true,
        data: newContact,
        message: '感谢您的留言！我们会尽快回复您。'
      });
    } catch (error) {
      console.error('保存联系人失败:', error);
      res.status(500).json({
        error: '保存留言失败，请稍后再试。'
      });
    }
  }

  // 获取单个联系人
  static async getContactById(req, res) {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({
          error: '未找到该联系人'
        });
      }

      res.json(contact);
    } catch (error) {
      console.error('获取联系人详情失败:', error);
      res.status(500).json({
        error: '获取联系人详情失败'
      });
    }
  }

  // 更新联系人
  static async updateContact(req, res) {
    try {
      const { name, email, message, phone } = req.body;
      const updateData = {};

      // 验证并准备更新数据
      if (name !== undefined) {
        if (name.length > 50) {
          return res.status(400).json({
            error: '姓名必须少于50个字符'
          });
        }
        updateData.name = name;
      }

      if (email !== undefined) {
        if (email.length > 100) {
          return res.status(400).json({
            error: '邮箱必须少于100个字符'
          });
        }
        updateData.email = email;
      }

      if (message !== undefined) {
        if (message.length > 500) {
          return res.status(400).json({
            error: '消息必须少于500个字符'
          });
        }
        updateData.message = message;
      }

      if (phone !== undefined) {
        updateData.phone = phone;
      }

      // 更新联系人
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return res.status(404).json({
          error: '未找到该联系人'
        });
      }

      res.json({
        success: true,
        data: updatedContact,
        message: '联系人信息已更新'
      });
    } catch (error) {
      console.error('更新联系人失败:', error);
      res.status(500).json({
        error: '更新联系人失败，请稍后再试。'
      });
    }
  }

  // 删除联系人
  static async deleteContact(req, res) {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);

      if (!deletedContact) {
        return res.status(404).json({
          error: '未找到该联系人'
        });
      }

      res.json({
        success: true,
        data: deletedContact,
        message: '联系人已删除'
      });
    } catch (error) {
      console.error('删除联系人失败:', error);
      res.status(500).json({
        error: '删除联系人失败，请稍后再试。'
      });
    }
  }
}

module.exports = ContactController;