/**
 * 服务路由 - 服务 CRUD 接口
 * GET    /api/services      - 前台获取活跃服务列表（公开）
 * GET    /api/services/:id  - 前台获取服务详情（公开）
 * POST   /api/services      - 新增服务（鉴权）
 * PUT    /api/services/:id  - 编辑服务（鉴权）
 * DELETE /api/services/:id  - 删除服务（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, badRequest, notFound, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/services
 * 前台获取活跃服务列表，仅返回 is_active=1，按 sort_order 降序
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const list = db.prepare(
      'SELECT id, title, icon, summary, detail, sort_order, is_active, created_at FROM services WHERE is_active = 1 ORDER BY sort_order DESC, id ASC'
    ).all();
    return success(res, list);
  } catch (err) {
    console.error('[Services] 获取列表失败:', err.message);
    return error(res, 500, '获取服务列表失败');
  }
});

/**
 * GET /api/services/:id
 * 前台获取服务详情（公开）
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const service = db.prepare(
      'SELECT id, title, icon, summary, detail, sort_order, is_active, created_at FROM services WHERE id = ?'
    ).get(req.params.id);

    if (!service) {
      return notFound(res, '服务不存在');
    }

    return success(res, service);
  } catch (err) {
    console.error('[Services] 获取详情失败:', err.message);
    return error(res, 500, '获取服务详情失败');
  }
});

/**
 * POST /api/services
 * 新增服务（鉴权）
 */
router.post('/', authMiddleware, (req, res) => {
  const { title, icon, summary, detail, sort_order, is_active } = req.body;

  if (!title) {
    return badRequest(res, '服务名称不能为空');
  }

  try {
    const db = getDb();
    const result = db.prepare(
      'INSERT INTO services (title, icon, summary, detail, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, icon || '', summary || '', detail || '', sort_order || 0, is_active !== undefined ? is_active : 1);

    return success(res, { id: result.lastInsertRowid });
  } catch (err) {
    console.error('[Services] 新增失败:', err.message);
    return error(res, 500, '新增服务失败');
  }
});

/**
 * PUT /api/services/:id
 * 编辑服务（鉴权）
 */
router.put('/:id', authMiddleware, (req, res) => {
  const { title, icon, summary, detail, sort_order, is_active } = req.body;

  try {
    const db = getDb();
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);

    if (!service) {
      return notFound(res, '服务不存在');
    }

    db.prepare(
      'UPDATE services SET title = ?, icon = ?, summary = ?, detail = ?, sort_order = ?, is_active = ? WHERE id = ?'
    ).run(
      title !== undefined ? title : service.title,
      icon !== undefined ? icon : service.icon,
      summary !== undefined ? summary : service.summary,
      detail !== undefined ? detail : service.detail,
      sort_order !== undefined ? sort_order : service.sort_order,
      is_active !== undefined ? is_active : service.is_active,
      req.params.id
    );

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[Services] 编辑失败:', err.message);
    return error(res, 500, '编辑服务失败');
  }
});

/**
 * DELETE /api/services/:id
 * 删除服务（鉴权）
 */
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return notFound(res, '服务不存在');
    }

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[Services] 删除失败:', err.message);
    return error(res, 500, '删除服务失败');
  }
});

module.exports = router;
