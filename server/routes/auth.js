/**
 * 认证路由 - 登录接口
 * POST /api/auth/login
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDb } = require('../db/init');
const { success, badRequest, error } = require('../utils/response');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/login
 * 用户登录，验证用户名密码，签发 JWT Token
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 参数校验
  if (!username || !password) {
    return badRequest(res, '用户名和密码不能为空');
  }

  try {
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
      return error(res, 401, '用户名或密码错误');
    }

    // 验证密码
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return error(res, 401, '用户名或密码错误');
    }

    // 签发 JWT Token（有效期 24 小时）
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return success(res, { token, username: user.username });
  } catch (err) {
    console.error('[Auth] 登录失败:', err.message);
    return error(res, 500, '登录失败');
  }
});

module.exports = router;
