/**
 * 新闻路由 - 新闻 CRUD 接口
 * GET    /api/news      - 获取新闻列表（前台仅已发布，后台全量）
 * GET    /api/news/:id  - 获取新闻详情
 * POST   /api/news      - 新增新闻（鉴权）
 * PUT    /api/news/:id  - 编辑新闻（鉴权）
 * DELETE /api/news/:id  - 删除新闻（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, badRequest, notFound, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/news
 * 获取新闻列表
 * - 无 Token：仅返回 is_published=1 的新闻，按 created_at 降序
 * - 带 Token：返回全部新闻（后台管理）
 * 支持分页参数 page, pageSize
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // 判断是否带鉴权 Token（简化判断：检查 Authorization 头）
    const hasAuth = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');

    let countSql, listSql;
    if (hasAuth) {
      // 后台：返回全部新闻
      countSql = 'SELECT COUNT(*) as total FROM news';
      listSql = 'SELECT id, title, cover, content, is_published, created_at, updated_at FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?';
    } else {
      // 前台：仅返回已发布新闻
      countSql = 'SELECT COUNT(*) as total FROM news WHERE is_published = 1';
      listSql = 'SELECT id, title, cover, content, is_published, created_at, updated_at FROM news WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?';
    }

    const { total } = db.prepare(countSql).get();
    const list = db.prepare(listSql).all(pageSize, offset);

    return success(res, { total, list });
  } catch (err) {
    console.error('[News] 获取列表失败:', err.message);
    return error(res, 500, '获取新闻列表失败');
  }
});

/**
 * GET /api/news/:id
 * 获取新闻详情
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const news = db.prepare(
      'SELECT id, title, cover, content, is_published, created_at, updated_at FROM news WHERE id = ?'
    ).get(req.params.id);

    if (!news) {
      return notFound(res, '新闻不存在');
    }

    return success(res, news);
  } catch (err) {
    console.error('[News] 获取详情失败:', err.message);
    return error(res, 500, '获取新闻详情失败');
  }
});

/**
 * POST /api/news
 * 新增新闻（鉴权）
 */
router.post('/', authMiddleware, (req, res) => {
  const { title, cover, content, is_published } = req.body;

  if (!title || !content) {
    return badRequest(res, '标题和内容不能为空');
  }

  try {
    const db = getDb();
    const result = db.prepare(
      'INSERT INTO news (title, cover, content, is_published) VALUES (?, ?, ?, ?)'
    ).run(title, cover || '', content, is_published !== undefined ? is_published : 0);

    return success(res, { id: result.lastInsertRowid });
  } catch (err) {
    console.error('[News] 新增失败:', err.message);
    return error(res, 500, '新增新闻失败');
  }
});

/**
 * PUT /api/news/:id
 * 编辑新闻（鉴权）
 * updated_at 自动更新为当前时间
 */
router.put('/:id', authMiddleware, (req, res) => {
  const { title, cover, content, is_published } = req.body;

  try {
    const db = getDb();
    const news = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);

    if (!news) {
      return notFound(res, '新闻不存在');
    }

    db.prepare(
      'UPDATE news SET title = ?, cover = ?, content = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(
      title !== undefined ? title : news.title,
      cover !== undefined ? cover : news.cover,
      content !== undefined ? content : news.content,
      is_published !== undefined ? is_published : news.is_published,
      req.params.id
    );

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[News] 编辑失败:', err.message);
    return error(res, 500, '编辑新闻失败');
  }
});

/**
 * DELETE /api/news/:id
 * 删除新闻（鉴权）
 */
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return notFound(res, '新闻不存在');
    }

    return success(res, null, 'ok');
  } catch (err) {
    console.error('[News] 删除失败:', err.message);
    return error(res, 500, '删除新闻失败');
  }
});

module.exports = router;
