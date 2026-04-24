/**
 * 万家官网管家 - 后端 API 服务入口
 * Express + SQLite (better-sqlite3)
 * 端口: 3000
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

// 初始化数据库（建表 + 种子数据）
const { initDatabase } = require('./db/init');
initDatabase();

// 路由模块
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const newsRoutes = require('./routes/news');
const bannersRoutes = require('./routes/banners');
const messagesRoutes = require('./routes/messages');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');
const dashboardRoutes = require('./routes/dashboard');

// 错误处理中间件
const { notFoundHandler, errorHandler } = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 8031;

// ========================================
// 中间件
// ========================================

// CORS 跨域
app.use(cors());

// JSON 解析
app.use(express.json());

// URL 编码解析
app.use(express.urlencoded({ extended: true }));

// 静态文件服务 - uploads 目录
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ========================================
// API 路由
// ========================================

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ========================================
// 错误处理（必须放在所有路由之后）
// ========================================

// 404 路由未找到
app.use(notFoundHandler);

// 全局错误处理
app.use(errorHandler);

// ========================================
// 启动服务
// ========================================

app.listen(PORT, () => {
  console.log(`[Server] 万家官网管家 API 服务已启动`);
  console.log(`[Server] 地址: http://localhost:${PORT}`);
  console.log(`[Server] API:  http://localhost:${PORT}/api/`);
});
