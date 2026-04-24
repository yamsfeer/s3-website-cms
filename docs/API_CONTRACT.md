# API 契约

## 基础信息

- Base URL: `/api`
- 认证方式: Bearer Token (JWT)
- 鉴权接口需 Header 携带 `Authorization: Bearer <token>`
- 统一响应格式：`{ "code": 0, "data": {}, "msg": "ok" }`
- 错误码约定：0=成功，非0=失败

## 端点列表

---

### 1. 认证模块

#### POST /api/auth/login

登录获取 Token，无需鉴权

**请求体**

```json
{
  "username": "admin",
  "password": "123456"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 登录账号 |
| password | string | 是 | 登录密码 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "admin"
  },
  "msg": "ok"
}
```

**错误码**

| code | 说明 |
|------|------|
| 401 | 用户名或密码错误 |
| 400 | 参数缺失 |

---

### 2. 留言模块

#### POST /api/messages

提交在线留言，无需鉴权

**请求体**

```json
{
  "name": "王先生",
  "phone": "13800138000",
  "content": "想咨询全屋保洁服务"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 联系人姓名，最长50字 |
| phone | string | 是 | 联系电话，最长20字 |
| content | string | 是 | 留言内容 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "id": 1
  },
  "msg": "提交成功"
}
```

**错误码**

| code | 说明 |
|------|------|
| 400 | 参数缺失或格式错误 |

---

#### GET /api/messages

获取留言列表，需鉴权

**查询参数**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "total": 25,
    "list": [
      {
        "id": 1,
        "name": "王先生",
        "phone": "13800138000",
        "content": "想咨询全屋保洁服务",
        "is_read": 0,
        "created_at": "2026-04-23 10:30:00"
      }
    ]
  }
}
```

---

#### PUT /api/messages/:id/read

标记留言已处理，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 留言 ID |

**请求体**：无

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "已标记"
}
```

**错误码**

| code | 说明 |
|------|------|
| 404 | 留言不存在 |

---

### 3. 服务模块

#### GET /api/services

获取服务列表（前台），无需鉴权，仅返回 `is_active=1` 的服务，按 `sort_order` 降序

**成功响应** (200)

```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "title": "日常保洁",
      "icon": "/uploads/clean.png",
      "summary": "2小时起，专业工具上门",
      "detail": "<p>详细介绍内容...</p>"
    }
  ]
}
```

---

#### GET /api/services/:id

获取服务详情（前台），无需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 服务 ID |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "id": 1,
    "title": "日常保洁",
    "icon": "/uploads/clean.png",
    "summary": "2小时起，专业工具上门",
    "detail": "<p>详细介绍内容...</p>"
  }
}
```

---

#### POST /api/services

新增服务，需鉴权

**请求体**

```json
{
  "title": "日常保洁",
  "icon": "/uploads/clean.png",
  "summary": "2小时起，专业工具上门",
  "detail": "<p>详细介绍内容...</p>",
  "sort_order": 0,
  "is_active": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 服务名称，最长100字 |
| icon | string | 否 | 图标图片路径 |
| summary | string | 否 | 简要描述，最长500字 |
| detail | string | 否 | 详细介绍（富文本） |
| sort_order | number | 否 | 排序权重，默认0 |
| is_active | number | 否 | 是否启用，默认1 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": { "id": 1 },
  "msg": "ok"
}
```

---

#### PUT /api/services/:id

编辑服务，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 服务 ID |

**请求体**：同 POST /api/services，所有字段可选

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

#### DELETE /api/services/:id

删除服务，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 服务 ID |

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

### 4. 新闻模块

#### GET /api/news

获取新闻列表，无需鉴权

**查询参数**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |

**前台行为**：仅返回 `is_published=1` 的新闻，按 `created_at` 降序
**后台行为**（带鉴权 Token）：返回全部新闻

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "total": 15,
    "list": [
      {
        "id": 1,
        "title": "春季大扫除优惠来袭",
        "cover": "/uploads/spring.jpg",
        "content": "<p>全文内容...</p>",
        "is_published": 1,
        "created_at": "2026-04-23 10:30:00",
        "updated_at": "2026-04-23 10:30:00"
      }
    ]
  }
}
```

---

#### GET /api/news/:id

获取新闻详情，无需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 新闻 ID |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "id": 1,
    "title": "春季大扫除优惠来袭",
    "cover": "/uploads/spring.jpg",
    "content": "<p>全文内容...</p>",
    "is_published": 1,
    "created_at": "2026-04-23 10:30:00",
    "updated_at": "2026-04-23 10:30:00"
  }
}
```

---

#### POST /api/news

新增新闻，需鉴权

**请求体**

```json
{
  "title": "春季大扫除优惠来袭",
  "cover": "/uploads/spring.jpg",
  "content": "<p>全文内容...</p>",
  "is_published": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题，最长200字 |
| cover | string | 否 | 封面图路径 |
| content | string | 是 | 正文内容（富文本） |
| is_published | number | 否 | 是否发布，默认0 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": { "id": 3 },
  "msg": "ok"
}
```

---

#### PUT /api/news/:id

编辑新闻，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 新闻 ID |

**请求体**：同 POST /api/news，所有字段可选。`updated_at` 自动更新为当前时间。

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

#### DELETE /api/news/:id

删除新闻，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 新闻 ID |

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

### 5. 轮播图模块

#### GET /api/banners

获取轮播图列表，无需鉴权，仅返回 `is_active=1` 的轮播图，按 `sort_order` 降序

**成功响应** (200)

```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "image_url": "/uploads/banner1.jpg",
      "title": "专业家政服务",
      "sort_order": 100,
      "is_active": 1,
      "created_at": "2026-04-23 10:30:00"
    }
  ]
}
```

---

#### POST /api/banners

新增轮播图，需鉴权

**请求体**

```json
{
  "image_url": "/uploads/banner1.jpg",
  "title": "专业家政服务",
  "sort_order": 100,
  "is_active": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| image_url | string | 是 | 图片路径 |
| title | string | 否 | 轮播图标题，最长100字 |
| sort_order | number | 否 | 排序权重，默认0 |
| is_active | number | 否 | 是否启用，默认1 |

**成功响应** (200)

```json
{
  "code": 0,
  "data": { "id": 1 },
  "msg": "ok"
}
```

---

#### PUT /api/banners/:id

编辑轮播图，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 轮播图 ID |

**请求体**：所有字段可选

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

#### DELETE /api/banners/:id

删除轮播图，需鉴权

**路径参数**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 轮播图 ID |

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

---

### 6. 文件上传模块

#### POST /api/upload

上传文件，需鉴权，`multipart/form-data`

**请求体**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | file | 是 | 图片文件，支持 jpg/png/gif/webp，最大 5MB |

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "url": "/uploads/1713849600000-banner.jpg"
  },
  "msg": "ok"
}
```

**错误码**

| code | 说明 |
|------|------|
| 400 | 未选择文件 |
| 400 | 文件类型不支持 |
| 400 | 文件大小超限 |

**存储规则**
- 文件存放目录：项目根目录 `/uploads/`
- 文件名格式：`{时间戳}-{原始文件名}`
- 访问路径：`/uploads/{文件名}`（Nginx 静态托管或 Express 静态服务）

---

### 7. 站点设置模块

#### GET /api/settings

获取站点设置，无需鉴权

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "site_name": "万家保洁",
    "site_desc": "您身边的专业保洁服务",
    "phone": "400-123-4567",
    "address": "北京市朝阳区XX路XX号",
    "about": "万家保洁成立于2020年，专注于...",
    "seo_title": "万家保洁-北京专业保洁公司",
    "seo_keywords": "保洁,家政,北京保洁",
    "seo_description": "万家保洁提供专业家政保洁服务"
  }
}
```

---

#### PUT /api/settings

更新站点设置，需鉴权

**请求体**

```json
{
  "site_name": "万家保洁",
  "site_desc": "您身边的专业保洁服务",
  "phone": "400-123-4567",
  "address": "北京市朝阳区XX路XX号",
  "about": "万家保洁成立于2020年，专注于...",
  "seo_title": "万家保洁-北京专业保洁公司",
  "seo_keywords": "保洁,家政,北京保洁",
  "seo_description": "万家保洁提供专业家政保洁服务"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| site_name | string | 否 | 站点名称 |
| site_desc | string | 否 | 站点描述 |
| phone | string | 否 | 联系电话 |
| address | string | 否 | 公司地址 |
| about | string | 否 | 公司介绍（富文本） |
| seo_title | string | 否 | SEO 标题 |
| seo_keywords | string | 否 | SEO 关键词 |
| seo_description | string | 否 | SEO 描述 |

**成功响应** (200)

```json
{
  "code": 0,
  "msg": "ok"
}
```

**存储说明**：settings 使用单行 JSON 存储（SQLite 中存为 `key-value` 表或单行记录），更新时合并字段。

---

### 8. 仪表盘统计

#### GET /api/dashboard/stats

获取仪表盘统计数据，需鉴权

**成功响应** (200)

```json
{
  "code": 0,
  "data": {
    "unread_messages": 5,
    "total_messages": 25,
    "total_news": 10,
    "published_news": 8,
    "total_services": 6,
    "active_services": 5
  }
}
```
