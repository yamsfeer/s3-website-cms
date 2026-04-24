/**
 * 留言路由 - 留言相关接口
 * POST /api/messages         - 提交在线留言（公开）
 * GET  /api/messages         - 获取留言列表（鉴权，分页）
 * PUT  /api/messages/:id/read - 标记留言已处理（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, badRequest, notFound, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/messages
 * 提交在线留言（公开，无需鉴权）
 */
router.post('/', (req, res) => {
  const { name, phone, content } = req.body;

  // 参数校验
  if (!name || !phone || !content) {
    return badRequest(res, '姓名、电话和留言内容不能为空');
  }

  if (name.length > 50) {
    return badRequest(res, '姓名最长50字');
  }

  if (phone.length > 20) {
    return badRequest(res, '电话最长20字');
  }

  try {
    const db = getDb();
    const result = db.prepare(
      'INSERT INTO messages (name, phone, content) VALUES (?, ?, ?)'
    ).run(name, phone, content);

    return success(res, { id: result.lastInsertRowid }, '提交成功');
  } catch (err) {
    console.error('[Messages] 提交留言失败:', err.message);
    return error(res, 500, '提交留言失败');
  }
});

/**
 * GET /api/messages
 * 获取留言列表（鉴权，分页）
 */
router.get('/', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const { total } = db.prepare('SELECT COUNT(*) as total FROM messages').get();
    const list = db.prepare(
      'SELECT id, name, phone, content, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);

    return success(res, { total, list });
  } catch (err) {
    console.error('[Messages] 获取列表失败:', err.message);
    return error(res, 500, '获取留言列表失败');
  }
});

/**
 * PUT /api/messages/:id/read
 * 标记留言已处理（鉴权）
 */
router.put('/:id/read', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const message = db.prepare('SELECT * FROM messages WHERE id = ?').get(req.params.id);

    if (!message) {
      return notFound(res, '留言不存在');
    }

    db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);

    return success(res, null, '已标记');
  } catch (err) {
    console.error('[Messages] 标记失败:', err.message);
    return error(res, 500, '标记留言失败');
  }
});

module.exports = router;
