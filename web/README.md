# 前台官网

基于 Vue 3 的响应式企业官网，面向访客展示服务、新闻、联系方式，并支持在线留言。

## 目录结构

```
web/
├── src/
│   ├── main.js              # 入口
│   ├── App.vue              # 根组件（导航+路由+页脚）
│   ├── router/index.js      # 路由配置
│   ├── api/index.js         # API 封装（无鉴权）
│   ├── views/               # 页面
│   │   ├── Home.vue         # 首页（Hero + 简介 + 服务 + 新闻）
│   │   ├── Services.vue     # 服务列表
│   │   ├── ServiceDetail.vue # 服务详情
│   │   ├── News.vue         # 新闻列表
│   │   ├── NewsDetail.vue   # 新闻详情
│   │   └── Contact.vue      # 在线留言
│   ├── components/          # 可复用组件
│   │   ├── Navbar.vue       # 顶部导航
│   │   ├── Footer.vue       # 页脚
│   │   ├── HeroSection.vue  # 首页大 Banner
│   │   ├── BannerCarousel.vue # 轮播图
│   │   ├── ServiceCard.vue  # 服务卡片
│   │   ├── NewsCard.vue     # 新闻卡片
│   │   └── ContactForm.vue  # 留言表单
│   └── assets/styles/
│       └── main.css         # 全局样式
├── public/                  # 静态资源
└── index.html               # HTML 模板
```

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero + 公司简介 + 热门服务 + 最新新闻 |
| `/services` | 服务列表 | 全部服务卡片 |
| `/services/:id` | 服务详情 | 单服务详细介绍 |
| `/news` | 新闻列表 | 全部新闻卡片 |
| `/news/:id` | 新闻详情 | 单新闻正文 |
| `/contact` | 在线留言 | 表单 + 公司信息 |

## 开发

```bash
npm install
npm run dev       # 监听 5173 端口
npm run build     # 生产构建，输出到 dist/
npm run preview   # 预览生产构建
```

## 代理配置

`vite.config.js` 中已配置开发代理：
- `/api` -> `http://localhost:3000`
- `/uploads` -> `http://localhost:3000`

**注意：** 代理目标端口为 3000，后端实际运行在 8031，开发时请确认后端端口一致。

## 响应式断点

| 设备 | 宽度 | 适配 |
|------|------|------|
| 手机 | < 768px | 单列、汉堡菜单 |
| 平板 | 768px - 1024px | 双列、水平导航 |
| 桌面 | > 1024px | 多列、完整布局 |

## 技术要点

- **无 UI 框架**：纯 CSS 实现，基于设计系统自定义样式
- **SEO 动态注入**：App.vue 挂载时从 `/api/settings` 获取 SEO 信息，注入到 `<head>`
- **图片懒加载**：使用浏览器原生 `loading="lazy"`
- **表单验证**：前端校验 + 后端二次校验
