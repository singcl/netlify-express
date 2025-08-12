const timezone = require('../utils/timezone');
const Product = require('../models/Product');

class ProductController {
  // 获取产品列表
  static async getProducts(req, res) {
    try {
      // 获取查询参数用于过滤
      const { category, inStock } = req.query;
      const query = {};

      if (category) {
        query.category = category;
      }

      if (inStock !== undefined) {
        query.inStock = inStock === 'true';
      }

      // 从数据库中查找产品
      const products = await Product.find(query);

      res.json({
        version: req.app.get('apiVersion'),
        count: products.length,
        products,
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('获取产品列表失败:', error);
      res.status(500).json({
        error: '获取产品列表失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 获取单个产品
  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          error: '未找到该产品',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      res.json({
        version: req.app.get('apiVersion'),
        product,
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('获取产品详情失败:', error);
      res.status(500).json({
        error: '获取产品详情失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 创建新产品
  static async createProduct(req, res) {
    try {
      const { name, price, category, inStock, rating, description, images } = req.body;

      // 验证必填字段
      if (!name || !price || !category) {
        return res.status(400).json({
          error: '名称、价格和分类是必填项',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      // 验证价格非负
      if (price < 0) {
        return res.status(400).json({
          error: '价格不能为负数',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      // 验证评分范围
      if (rating && (rating < 0 || rating > 5)) {
        return res.status(400).json({
          error: '评分必须在0到5之间',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      // 创建新产品
      const newProduct = new Product({
        name,
        price,
        category,
        inStock: inStock !== undefined ? inStock : true,
        rating,
        description,
        images
      });

      // 保存到数据库
      const savedProduct = await newProduct.save();

      res.status(201).json({
        success: true,
        message: '产品创建成功',
        product: savedProduct,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('创建产品失败:', error);
      res.status(500).json({
        error: '创建产品失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 更新产品
  static async updateProduct(req, res) {
    try {
      const { name, price, category, inStock, rating, description, images } = req.body;

      // 验证价格非负
      if (price !== undefined && price < 0) {
        return res.status(400).json({
          error: '价格不能为负数',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      // 验证评分范围
      if (rating !== undefined && (rating < 0 || rating > 5)) {
        return res.status(400).json({
          error: '评分必须在0到5之间',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      // 准备更新数据
      const updateData = {
        name,
        price,
        category,
        inStock,
        rating,
        description,
        images,
        updatedAt: Date.now()
      };

      // 删除未定义的字段
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      // 更新产品
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          error: '未找到该产品',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      res.json({
        success: true,
        message: '产品更新成功',
        product: updatedProduct,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('更新产品失败:', error);
      res.status(500).json({
        error: '更新产品失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }

  // 删除产品
  static async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({
          error: '未找到该产品',
          version: req.app.get('apiVersion'),
          timestamp: timezone.toISOString()
        });
      }

      res.json({
        success: true,
        message: '产品删除成功',
        product: deletedProduct,
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    } catch (error) {
      console.error('删除产品失败:', error);
      res.status(500).json({
        error: '删除产品失败',
        version: req.app.get('apiVersion'),
        timestamp: timezone.toISOString()
      });
    }
  }
}

module.exports = ProductController;