# 后端服务

Express.js + SQLite 轻量级 API 服务，为前台官网和后台 CMS 提供数据支撑。

## 目录结构

```
server/
├── index.js          # Express 入口，挂载路由
├── db/
│   ├── init.js       # 数据库初始化（建表 + 索引）
│   └── seed.js       # 种子数据（含模拟数据）
├── routes/           # API 路由
│   ├── auth.js       # 登录认证
│   ├── banners.js    # 轮播图 CRUD
│   ├── services.js   # 服务 CRUD
│   ├── news.js       # 新闻 CRUD
│   ├── messages.js   # 留言（提交+列表+标记已读）
│   ├── settings.js   # 站点设置
│   ├── dashboard.js  # 仪表盘统计
│   └── upload.js     # 文件上传
├── middleware/
│   ├── auth.js       # JWT 鉴权中间件
│   └── error.js      # 全局错误处理
└── utils/
    ├── response.js   # 统一响应格式
    └── upload.js     # Multer 上传配置
```

## 启动

```bash
npm install
npm run dev       # 开发模式（= node index.js）
npm run start     # 生产模式（= node index.js）
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 8031 | 服务端口 |
| `JWT_SECRET` | wjgug-default-secret | JWT 签名密钥 |
| `UPLOAD_DIR` | ../uploads | 上传文件存储目录 |

## 数据库

- 类型：SQLite 3（better-sqlite3）
- 文件：`../data/app.db`
- 模式：WAL（Write-Ahead Logging）
- 表：users、banners、services、news、messages、settings

首次启动会自动执行建表和种子数据。

## 路由清单

| 方法 | 路由 | 鉴权 | 说明 |
|------|------|------|------|
| POST | `/api/auth/login` | - | 登录 |
| GET | `/api/banners` | - | 轮播图列表 |
| POST | `/api/banners` | JWT | 新增轮播图 |
| PUT | `/api/banners/:id` | JWT | 编辑轮播图 |
| DELETE | `/api/banners/:id` | JWT | 删除轮播图 |
| GET | `/api/services` | - | 服务列表 |
| GET | `/api/services/:id` | - | 服务详情 |
| POST | `/api/services` | JWT | 新增服务 |
| PUT | `/api/services/:id` | JWT | 编辑服务 |
| DELETE | `/api/services/:id` | JWT | 删除服务 |
| GET | `/api/news` | - | 新闻列表 |
| GET | `/api/news/:id` | - | 新闻详情 |
| POST | `/api/news` | JWT | 新增新闻 |
| PUT | `/api/news/:id` | JWT | 编辑新闻 |
| DELETE | `/api/news/:id` | JWT | 删除新闻 |
| POST | `/api/messages` | - | 提交留言 |
| GET | `/api/messages` | JWT | 留言列表 |
| PUT | `/api/messages/:id/read` | JWT | 标记已读 |
| GET | `/api/settings` | - | 站点设置 |
| PUT | `/api/settings` | JWT | 更新设置 |
| POST | `/api/upload` | JWT | 文件上传 |
| GET | `/api/dashboard/stats` | JWT | 仪表盘统计 |
