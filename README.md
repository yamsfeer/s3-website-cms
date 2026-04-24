# 万家官网管家

> 面向家政/装修/律所等本地服务企业的轻量级官网 + CMS 系统。30 分钟上线"能改内容、能收线索"的官网，告别找开发改一个字等一周的窘境。

---

## 项目结构

```
s3-website-cms/
├── data/                  # SQLite 数据库（已包含模拟数据）
│   └── app.db
├── docs/                  # 项目文档
│   ├── PRD.md            # 产品需求文档
│   ├── DESIGN.md         # 设计系统（颜色/字体/组件规范）
│   ├── API_CONTRACT.md   # API 接口契约
│   ├── DATA_MODEL.md     # 数据库模型
│   ├── FLOWCHART.md      # 业务流程图
│   └── UE_FLOW.md        # 用户交互流程
├── server/                # 后端服务（Express + SQLite）
│   ├── index.js          # 入口
│   ├── db/               # 数据库初始化与种子数据
│   ├── routes/           # API 路由
│   ├── middleware/       # 中间件（JWT 鉴权、错误处理）
│   └── utils/            # 工具函数
├── admin/                 # 后台管理（Vue 3 + Element Plus）
│   └── src/              # 源码
├── web/                   # 前台官网（Vue 3 + 原生 CSS）
│   └── src/              # 源码
├── uploads/               # 上传文件目录
├── nginx.conf             # 生产 Nginx 配置
└── deploy-server.js       # 一体化部署脚本
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端（官网） | Vue 3 + Vue Router + Axios（纯 CSS，无 UI 框架） |
| 前端（后台） | Vue 3 + Vue Router + Element Plus + Axios |
| 后端 | Express 4 + better-sqlite3 + bcryptjs + jsonwebtoken |
| 数据库 | SQLite 3（含 WAL 模式） |
| 部署 | Nginx 静态托管 + API 反向代理 |

---

## 快速启动（开发环境）

### 1. 启动后端

```bash
cd server
npm install
npm run dev       # 监听 8031 端口
```

首次启动会自动创建 `data/app.db` 并写入种子数据。

### 2. 启动前台

```bash
cd web
npm install
npm run dev       # 监听 5173 端口
```

### 3. 启动后台

```bash
cd admin
npm install
npm run dev       # 监听 8033 端口
```

### 4. 一键启动（脚本）

```bash
bash init.sh
```

该脚本会安装所有依赖、初始化数据库并同时启动三个服务。

---

## 默认账号

| 用户名 | 密码 |
|--------|------|
| admin | admin123 |

---

## 部署

### 方式一：Nginx（推荐）

```bash
# 构建前端
cd web && npm run build
cd admin && npm run build

# 配置 Nginx（参考 nginx.conf）
sudo cp nginx.conf /etc/nginx/conf.d/wjgug.conf
sudo nginx -s reload

# 启动后端
cd server && npm run start
```

Nginx 配置说明：
- `/` -> 前台静态文件 `web/dist/`
- `/admin` -> 后台 SPA `admin/dist/`
- `/api` -> 反向代理到 `127.0.0.1:8031`
- `/uploads` -> 静态文件托管

### 方式二：一体化 Express 部署

```bash
node deploy-server.js
```

该脚本在 `8032` 端口同时托管前台、后台和 API 代理。

---

## API 端点速查

| 端点 | 说明 |
|------|------|
| `POST /api/auth/login` | 登录 |
| `GET /api/services` | 服务列表 |
| `GET /api/news` | 新闻列表 |
| `GET /api/banners` | 轮播图列表 |
| `POST /api/messages` | 提交留言 |
| `GET /api/settings` | 站点设置 |
| `GET /api/dashboard/stats` | 仪表盘统计（需鉴权） |

完整 API 文档见 [docs/API_CONTRACT.md](docs/API_CONTRACT.md)。

---

## 数据库

SQLite 单文件数据库，位于 `data/app.db`，已包含：
- 1 个管理员账号
- 8 条服务数据
- 8 条新闻数据
- 6 条留言数据
- 1 条站点设置
- 18 张上传图片

数据库表结构见 [docs/DATA_MODEL.md](docs/DATA_MODEL.md)。

---

## 端口一览

| 服务 | 开发端口 | 说明 |
|------|----------|------|
| 后端 API | 8031 | Express 服务 |
| 前台 | 5173 | Vite dev server |
| 后台 | 8033 | Vite dev server |
| 一体化部署 | 8032 | deploy-server.js |

---

## 文档索引

| 文档 | 内容 |
|------|------|
| [PRD](docs/PRD.md) | 产品需求、MVP 功能、用户画像、开发排期 |
| [设计系统](docs/DESIGN.md) | 颜色方案、字体规范、间距系统、响应式断点、组件规范 |
| [API 契约](docs/API_CONTRACT.md) | 完整接口定义、请求/响应格式、错误码 |
| [数据模型](docs/DATA_MODEL.md) | 6 张表结构、建表 SQL、索引、种子数据 |
| [业务流程](docs/FLOWCHART.md) | 核心流程、页面导航、CMS 操作、文件上传、认证鉴权、部署架构 |
| [UE 流程](docs/UE_FLOW.md) | 前台访客交互、后台管理交互、错误状态处理 |
