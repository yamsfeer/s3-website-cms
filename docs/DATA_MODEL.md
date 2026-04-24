# 数据模型

## ER 图（文字描述）

```
users ——— 独立表，管理后台登录账号

banners ——— 独立表，前台轮播图配置

services ——— 独立表，前台服务展示

messages ——— 独立表，前台客户留言

news ——— 独立表，新闻/动态文章

settings ——— 单行记录表，站点全局配置
```

> 本项目各表之间无外键关联，属于扁平化 CMS 数据结构。所有关系由应用层维护。

## 表结构

### users

后台管理账号表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, AUTOINCREMENT | 主键 |
| username | VARCHAR(50) | NOT NULL, UNIQUE | 登录账号 |
| password | VARCHAR(255) | NOT NULL | bcrypt 加密密码 |
| role | VARCHAR(20) | DEFAULT 'admin' | 角色（预留） |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### banners

首页轮播图表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, AUTOINCREMENT | 主键 |
| image_url | VARCHAR(500) | NOT NULL | 图片路径 |
| title | VARCHAR(100) | | 轮播图标题 |
| sort_order | INTEGER | DEFAULT 0 | 排序权重（越大越靠前） |
| is_active | INTEGER | DEFAULT 1 | 是否启用（1=启用, 0=禁用） |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### services

服务项目表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, AUTOINCREMENT | 主键 |
| title | VARCHAR(100) | NOT NULL | 服务名称 |
| icon | VARCHAR(500) | | 图标图片路径 |
| summary | VARCHAR(500) | | 简要描述 |
| detail | TEXT | | 详细介绍（HTML 富文本） |
| sort_order | INTEGER | DEFAULT 0 | 排序权重（越大越靠前） |
| is_active | INTEGER | DEFAULT 1 | 是否启用（1=启用, 0=禁用） |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### news

新闻/动态文章表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, AUTOINCREMENT | 主键 |
| title | VARCHAR(200) | NOT NULL | 文章标题 |
| cover | VARCHAR(500) | | 封面图路径 |
| content | TEXT | NOT NULL | 正文内容（HTML 富文本） |
| is_published | INTEGER | DEFAULT 0 | 是否发布（1=已发布, 0=草稿） |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 更新时间 |

### messages

客户留言表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, AUTOINCREMENT | 主键 |
| name | VARCHAR(50) | NOT NULL | 联系人姓名 |
| phone | VARCHAR(20) | NOT NULL | 联系电话 |
| content | TEXT | NOT NULL | 留言内容 |
| is_read | INTEGER | DEFAULT 0 | 是否已处理（1=已处理, 0=未处理） |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 提交时间 |

### settings

站点全局配置表（单行 key-value 存储）。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INTEGER | PK, DEFAULT 1 | 固定为1，确保只有一行 |
| site_name | VARCHAR(100) | DEFAULT '' | 站点名称 |
| site_desc | VARCHAR(500) | DEFAULT '' | 站点描述 |
| phone | VARCHAR(50) | DEFAULT '' | 联系电话 |
| address | VARCHAR(500) | DEFAULT '' | 公司地址 |
| about | TEXT | DEFAULT '' | 公司介绍（HTML 富文本） |
| seo_title | VARCHAR(200) | DEFAULT '' | SEO 标题 |
| seo_keywords | VARCHAR(500) | DEFAULT '' | SEO 关键词 |
| seo_description | VARCHAR(500) | DEFAULT '' | SEO 描述 |

## 建表 SQL

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  icon VARCHAR(500),
  summary VARCHAR(500),
  detail TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(200) NOT NULL,
  cover VARCHAR(500),
  content TEXT NOT NULL,
  is_published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name VARCHAR(100) DEFAULT '',
  site_desc VARCHAR(500) DEFAULT '',
  phone VARCHAR(50) DEFAULT '',
  address VARCHAR(500) DEFAULT '',
  about TEXT DEFAULT '',
  seo_title VARCHAR(200) DEFAULT '',
  seo_keywords VARCHAR(500) DEFAULT '',
  seo_description VARCHAR(500) DEFAULT ''
);

-- 初始化 settings 默认行
INSERT OR IGNORE INTO settings (id) VALUES (1);
```

## 种子数据 SQL

```sql
-- 默认管理员账号 (密码: admin123, bcrypt hash)
INSERT INTO users (username, password) VALUES ('admin', '$2b$10$dummybcryptplaceholder');

-- 示例轮播图
INSERT INTO banners (image_url, title, sort_order) VALUES ('/uploads/banner1.jpg', '专业家政服务', 100);
INSERT INTO banners (image_url, title, sort_order) VALUES ('/uploads/banner2.jpg', '品质生活从家开始', 90);

-- 示例服务
INSERT INTO services (title, summary, sort_order) VALUES ('日常保洁', '2小时起，专业工具上门', 100);
INSERT INTO services (title, summary, sort_order) VALUES ('深度清洁', '厨房油烟/卫生间水垢专项处理', 90);
INSERT INTO services (title, summary, sort_order) VALUES ('开荒保洁', '新房/装修后全面清洁', 80);

-- 示例新闻
INSERT INTO news (title, content, is_published) VALUES ('春季大扫除优惠来袭', '<p>全文内容...</p>', 1);
INSERT INTO news (title, content, is_published) VALUES ('万家保洁服务升级公告', '<p>全文内容...</p>', 1);
```

## 索引

| 索引名 | 表 | 字段 | 说明 |
|--------|-----|------|------|
| idx_users_username | users | username | 登录查询 |
| idx_banners_active_sort | banners | is_active, sort_order | 前台查询排序 |
| idx_services_active_sort | services | is_active, sort_order | 前台查询排序 |
| idx_news_published | news | is_published, created_at | 前台查询排序 |
| idx_messages_read | messages | is_read | 未读留言查询 |

```sql
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_banners_active_sort ON banners(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active_sort ON services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(is_read);
```
