/**
 * JWT 验证中间件
 * 验证 Authorization: Bearer <token> 格式的 JWT Token
 */
const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/response');

// JWT 密钥，应从环境变量读取，此处使用默认值
const JWT_SECRET = process.env.JWT_SECRET || 'wjgug-jwt-secret-2026';

/**
 * JWT 验证中间件
 * 从请求头中提取并验证 JWT Token
 * 验证通过后将用户信息挂载到 req.user
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorized(res, '未授权，请先登录');
  }

  const token = authHeader.substring(7); // 去掉 "Bearer " 前缀

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return unauthorized(res, 'Token 已过期，请重新登录');
    }
    return unauthorized(res, '无效的 Token');
  }
}

module.exports = { authMiddleware, JWT_SECRET };
