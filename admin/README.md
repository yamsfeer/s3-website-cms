# 后台管理

基于 Vue 3 + Element Plus 的 CMS 后台，管理员可管理网站内容、查看留言、配置站点信息。

## 目录结构

```
admin/
├── src/
│   ├── main.js              # 入口（Vue 3 + Element Plus + 图标库）
│   ├── App.vue              # 根组件
│   ├── router/index.js      # 路由 + 鉴权守卫
│   ├── api/index.js         # API 封装（含 Token 注入 + 401 拦截）
│   ├── utils/auth.js        # Token/用户信息 localStorage 管理
│   ├── components/
│   │   └── Layout.vue       # 侧边栏 + 顶部头部 布局壳
│   └── views/               # 页面
│       ├── Login.vue        # 登录页
│       ├── Dashboard.vue    # 仪表盘（统计卡片 + 快捷入口）
│       ├── Banners.vue      # 轮播图管理
│       ├── Services.vue     # 服务管理
│       ├── News.vue         # 新闻管理
│       ├── Messages.vue     # 留言管理（含角标提示）
│       └── Settings.vue     # 站点设置（SEO + 公司信息）
├── public/                  # 静态资源
└── index.html               # HTML 模板
```

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/login` | 登录 | 账号密码登录，写入 Token |
| `/dashboard` | 仪表盘 | 未读留言/总留言/文章数/服务数 + 快捷入口 |
| `/banners` | 轮播图管理 | 上传/编辑/删除/排序/启用 |
| `/services` | 服务管理 | 增删改查 + 启用开关 |
| `/news` | 新闻管理 | 增删改查 + 发布/草稿状态 |
| `/messages` | 留言管理 | 查看留言 + 标记已处理 |
| `/settings` | 站点设置 | 站点信息、联系方式、SEO 配置 |

## 开发

```bash
npm install
npm run dev       # 监听 8033 端口
npm run build     # 生产构建，输出到 dist/
npm run preview   # 预览生产构建
```

## 代理配置

`vite.config.js` 中已配置开发代理：
- `/api` -> `http://localhost:8031`
- `/uploads` -> `http://localhost:8031`

## 鉴权机制

1. 登录成功后，Token 和用户名存入 `localStorage`
2. 所有 API 请求自动携带 `Authorization: Bearer <token>`
3. Token 过期或无效时，axios 拦截器自动清除 Token 并跳转登录页
4. 路由守卫检查 Token 存在，无 Token 强制跳转 `/login`

## 功能说明

### 文件上传
- 支持格式：jpg、png、gif、webp
- 大小限制：5MB
- 存储路径：`/uploads/`
- 文件名格式：时间戳 + 原始文件名

### 富文本编辑
- 新闻/服务详情使用原生 `contenteditable` 或 textarea（视版本而定）
- 支持基本的 HTML 格式

### 留言管理
- 未读留言高亮显示
- 侧边栏菜单显示未读数量角标
- 标记已读后角标实时更新

### 快捷入口
- 仪表盘提供 5 个快捷入口：轮播图/服务/新闻/留言/设置
- 点击卡片即可跳转到对应管理页面
