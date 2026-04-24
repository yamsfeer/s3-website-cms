/**
 * 轮播图路由 - 轮播图 CRUD 接口
 * GET    /api/banners      - 前台获取活跃轮播图列表（公开）
 * POST   /api/banners      - 新增轮播图（鉴权）
 * PUT    /api/banners/:id  - 编辑轮播图（鉴权）
 * DELETE /api/banners/:id  - 删除轮播图（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, badRequest, notFound, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/banners
 * 前台获取活跃轮播图列表，仅返回 is_active=1，按 sort_order 降序
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const list = db.prepare(
      'SELECT id, image_url, title, sort_order, is_active, created_at FROM banners WHERE is_active = 1 ORDER BY sort_order DESC, id ASC'
    ).all();
    return success(res, list);
  } catch (err) {
    console.error('[Banners] 获取列表失败:', err.message);
    return error(res, 500, '获取轮播图列表失败');
  }
});

/**
 * POST /api/banners
 * 新增轮播图（鉴权）
 */
router.post('/', authMiddleware, (req, res) => {
  const { image_url, title, sort_order, is_active } = req.body;

  if (!image_url) {
    return badRequest(res, '图片路径不能为空');
  }

  try {
    const db = getDb();
    const result = db.prepare(
      'INSERT INTO banners (image_url, title, sort_order, is_active) VALUES (?, ?, ?, ?)'
    ).run(image_url, title || '', sort_order || 0, is_active !== undefined ? is_active : 1);

    return success(res, { id: result.lastInsertRowid });
  } catch (err) {
    console.error('[Banners] 新增失败:', err.message);
    return error(res, 500, '新增轮播图失败');
  }
});

/**
 * PUT /api/banners/:id
 * 编辑轮播图（鉴权）
 */
router.put('/:id', authMiddleware, (req, res) => {
  const { image_url, title, sort_order, is_active } = req.body;

  try {
    const db = getDb();
    const banner = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id);

    if (!banner) {
      return notFound(res, '轮播图不存在');
    }

    db.prepare(
      'UPDATE banners SET image_url = ?, title = ?, sort_order = ?, is_active = ? WHERE id = ?'
    ).run(
      image_url !== undefined ? image_url : banner.image_url,
      title !== undefined ? title : banner.title,
      sort_order !== undefined ? sort_order : banner.sort_order,
      is_active !== undefined ? is_active : banner.is_active,
      req.params.id
    );

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[Banners] 编辑失败:', err.message);
    return error(res, 500, '编辑轮播图失败');
  }
});

/**
 * DELETE /api/banners/:id
 * 删除轮播图（鉴权）
 */
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM banners WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return notFound(res, '轮播图不存在');
    }

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[Banners] 删除失败:', err.message);
    return error(res, 500, '删除轮播图失败');
  }
});

module.exports = router;
