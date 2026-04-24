/**
 * 前端部署服务器
 * - 端口: 8032
 * - /       -> web/dist (前台官网)
 * - /admin  -> admin/dist (后台 CMS)
 * - /api    -> 代理到 localhost:8031
 * - /uploads -> 代理到 localhost:8031
 */
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8032;
const API_TARGET = 'http://127.0.0.1:8031';

// 调试中间件
app.use((req, res, next) => {
  console.log(`[Req] ${req.method} ${req.url}`);
  next();
});

// API 和 uploads 代理
app.use(createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathFilter: (pathname) => pathname.startsWith('/api') || pathname.startsWith('/uploads'),
}));

// 后台 CMS — 静态文件 + SPA fallback
app.use('/admin', express.static(path.join(__dirname, 'admin', 'dist')));
app.use('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
});

// 前台官网 — 静态文件 + SPA fallback
app.use(express.static(path.join(__dirname, 'web', 'dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Frontend] 前端部署服务器已启动`);
  console.log(`[Frontend] 前台官网: http://localhost:${PORT}/`);
  console.log(`[Frontend] 后台 CMS:  http://localhost:${PORT}/admin/`);
  console.log(`[Frontend] API 代理:   ${API_TARGET}`);
});
