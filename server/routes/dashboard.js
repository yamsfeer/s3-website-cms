/**
 * 仪表盘统计路由
 * GET /api/dashboard/stats - 获取仪表盘统计数据（鉴权）
 */
const express = require('express');
const { getDb } = require('../db/init');
const { success, error } = require('../utils/response');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/dashboard/stats
 * 获取仪表盘统计数据（鉴权）
 * 返回：未读留言数、总留言数、文章数、已发布文章数、服务数、活跃服务数
 */
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const db = getDb();

    const unreadMessages = db.prepare('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').get().count;
    const totalMessages = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
    const totalNews = db.prepare('SELECT COUNT(*) as count FROM news').get().count;
    const publishedNews = db.prepare('SELECT COUNT(*) as count FROM news WHERE is_published = 1').get().count;
    const totalServices = db.prepare('SELECT COUNT(*) as count FROM services').get().count;
    const activeServices = db.prepare('SELECT COUNT(*) as count FROM services WHERE is_active = 1').get().count;

    return success(res, {
      unread_messages: unreadMessages,
      total_messages: totalMessages,
      total_news: totalNews,
      published_news: publishedNews,
      total_services: totalServices,
      active_services: activeServices
    });
  } catch (err) {
    console.error('[Dashboard] 获取统计数据失败:', err.message);
    return error(res, 500, '获取统计数据失败');
  }
});

module.exports = router;
