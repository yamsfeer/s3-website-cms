/**
 * 文件上传路由
 * POST /api/upload - 上传文件（鉴权）
 */
const express = require('express');
const upload = require('../utils/upload');
const { success, badRequest, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/upload
 * 上传文件（鉴权）
 * 使用 multer 处理 multipart/form-data
 * 文件类型白名单：jpg/png/gif/webp，最大 5MB
 */
router.post('/', authMiddleware, (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      // multer 错误交给错误中间件处理
      return next(err);
    }

    if (!req.file) {
      return badRequest(res, '未选择文件');
    }

    // 返回文件访问路径
    const url = `/uploads/${req.file.filename}`;
    return success(res, { url });
  });
});

module.exports = router;
