/**
 * 站点设置路由
 * GET /api/settings - 获取站点设置（公开）
 * PUT /api/settings - 更新站点设置（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/settings
 * 获取站点设置（公开，无需鉴权）
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const settings = db.prepare(
      'SELECT site_name, site_desc, phone, address, about, seo_title, seo_keywords, seo_description FROM settings WHERE id = 1'
    ).get();

    return success(res, settings || {});
  } catch (err) {
    console.error('[Settings] 获取设置失败:', err.message);
    return error(res, 500, '获取站点设置失败');
  }
});

/**
 * PUT /api/settings
 * 更新站点设置（鉴权）
 * 合并更新：仅更新请求体中提供的字段
 */
router.put('/', authMiddleware, (req, res) => {
  const allowedFields = ['site_name', 'site_desc', 'phone', 'address', 'about', 'seo_title', 'seo_keywords', 'seo_description'];
  const updates = {};

  // 只取允许更新的字段
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return success(res, null, 'ok');
  }

  try {
    const db = getDb();

    // 先获取当前设置
    const current = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    if (!current) {
      return error(res, 404, '站点设置不存在');
    }

    // 合并更新
    const setClauses = [];
    const values = [];
    for (const field of allowedFields) {
      const value = updates[field] !== undefined ? updates[field] : current[field];
      setClauses.push(`${field} = ?`);
      values.push(value);
    }

    values.push(1); // WHERE id = 1
    db.prepare(`UPDATE settings SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[Settings] 更新设置失败:', err.message);
    return error(res, 500, '更新站点设置失败');
  }
});

module.exports = router;
