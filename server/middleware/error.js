/**
 * 统一错误处理中间件
 * 捕获所有未处理的错误，返回统一格式的响应
 */

/**
 * 404 路由未找到中间件
 * 放在所有路由之后，处理未匹配的路由
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({ code: 404, msg: 'Not Found' });
}

/**
 * 全局错误处理中间件
 * 捕获路由中抛出的错误和 next(err) 传递的错误
 */
function errorHandler(err, req, res, next) {
  console.error('[Error]', err.message || err);

  // Multer 文件上传错误
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ code: 400, msg: '文件大小超限，最大 5MB' });
    }
    return res.status(400).json({ code: 400, msg: '文件上传失败' });
  }

  // 文件类型过滤错误
  if (err.message && err.message.includes('文件类型不支持')) {
    return res.status(400).json({ code: 400, msg: err.message });
  }

  // 默认服务器错误
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  res.status(statusCode).json({ code: statusCode, msg: message });
}

module.exports = { notFoundHandler, errorHandler };
