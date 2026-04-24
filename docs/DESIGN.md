# 设计系统

## 颜色方案

### 前台官网

| 名称 | 色值 | 用途 |
|------|------|------|
| primary | #2563EB | 主按钮、导航激活态、链接 |
| primary-dark | #1D4ED8 | 主按钮 hover |
| primary-light | #EFF6FF | 主色浅底、卡片悬浮背景 |
| secondary | #10B981 | 成功提示、在线状态 |
| warning | #F59E0B | 留言未处理角标、警告提示 |
| danger | #EF4444 | 删除按钮、错误提示 |
| text-primary | #111827 | 正文主文字 |
| text-secondary | #6B7280 | 辅助文字、描述 |
| text-muted | #9CA3AF | 占位符、禁用文字 |
| bg-white | #FFFFFF | 页面背景 |
| bg-gray | #F9FAFB | 区块背景、卡片背景 |
| bg-dark | #1F2937 | 页脚背景 |
| border | #E5E7EB | 分割线、边框 |

### 后台 CMS

| 名称 | 色值 | 用途 |
|------|------|------|
| admin-primary | #409EFF | Element Plus 默认主题色 |
| admin-success | #67C23A | 成功状态 |
| admin-warning | #E6A23C | 警告状态 |
| admin-danger | #F56C6C | 危险操作 |
| admin-info | #909399 | 信息提示 |
| admin-bg | #F0F2F5 | 后台页面背景 |
| admin-sidebar | #304156 | 侧边栏背景 |
| admin-sidebar-active | #409EFF | 侧边栏激活项 |

## 字体规范

- 标题：`"PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif` / Bold (700)
- 正文：`"PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif` / Regular (400)
- 代码/数字：`"SF Mono", "Consolas", monospace`

### 字号

| 场景 | 字号 | 行高 | 字重 |
|------|------|------|------|
| 首页大标题 | 36px | 1.2 | 700 |
| 区块标题 | 28px | 1.3 | 700 |
| 卡片标题 | 20px | 1.4 | 600 |
| 正文 | 16px | 1.6 | 400 |
| 辅助文字 | 14px | 1.5 | 400 |
| 小字 | 12px | 1.4 | 400 |

## 间距系统

| 名称 | 值 | 用途 |
|------|------|------|
| xs | 4px | 图标与文字间距 |
| sm | 8px | 紧凑元素间距 |
| md | 16px | 标准元素间距 |
| lg | 24px | 区块内间距 |
| xl | 32px | 区块间间距 |
| 2xl | 48px | 大区块间间距 |
| 3xl | 64px | 页面顶部间距 |

## 响应式断点

| 名称 | 宽度 | 用途 |
|------|------|------|
| mobile | < 768px | 手机端 |
| tablet | 768px - 1024px | 平板端 |
| desktop | > 1024px | 桌面端 |

## 组件规范

### 前台组件

#### 导航栏 (Navbar)
- 桌面：水平导航，Logo 左侧，菜单项右侧，背景白色+底部阴影
- 手机：汉堡菜单，点击展开侧滑导航
- 滚动时添加 `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`

#### 轮播图 (Banner Carousel)
- 全宽展示，高度桌面 500px / 手机 250px
- 底部圆点指示器，3秒自动播放
- 支持标题叠加（白色文字+半透明遮罩）

#### 服务卡片 (Service Card)
- 白色背景，圆角 8px，轻微阴影
- 图标 64x64px 居上，标题 20px bold，简介 14px gray
- Hover: 上浮 4px + 阴影加深

#### 新闻卡片 (News Card)
- 封面图上方，标题+日期下方
- 日期使用 text-secondary 14px
- Hover: 图片微放大 (scale 1.03)

#### 留言表单 (Contact Form)
- 单列布局，输入框带圆角 4px + 浅灰边框
- Focus: 边框变 primary + 浅蓝阴影
- 提交按钮：全宽，primary 色，高度 44px
- 成功提示：绿色勾+文字"我们将尽快联系您"

#### 页脚 (Footer)
- 深色背景 (bg-dark)，白色文字
- 三列布局：公司信息 | 快速链接 | 联系方式
- 手机端：单列堆叠

### 后台组件

#### 登录页
- 居中卡片式登录表单
- Logo + 系统名称在表单上方
- 用户名/密码输入框 + 登录按钮

#### 侧边栏 (Sidebar)
- 深色背景，宽度 220px
- 菜单项：图标+文字，hover 高亮
- 激活项：左侧 primary 色边框 + 浅色背景
- 手机端：可收缩

#### 数据表格 (Table)
- Element Plus Table 默认样式
- 顶部操作栏：搜索+新增按钮
- 分页器：右下角，10/20/50 每页

#### 表单弹窗 (Dialog Form)
- Element Plus Dialog，宽度 600px
- 表单使用 el-form，label 顶部对齐
- 底部：取消+确定按钮

#### 仪表盘卡片 (Dashboard Card)
- 4 列网格，每卡片含图标+数值+标题
- 新留言卡片带红点/数字角标

## 页面布局规范

### 前台页面布局

```
┌─────────────────────────────────────┐
│           Navbar (fixed)            │
├─────────────────────────────────────┤
│           Banner Carousel           │
├─────────────────────────────────────┤
│    Section: 公司简介 (bg-white)      │
├─────────────────────────────────────┤
│    Section: 热门服务 (bg-gray)       │
├─────────────────────────────────────┤
│    Section: 最新动态 (bg-white)      │
├─────────────────────────────────────┤
│           Footer (bg-dark)          │
└─────────────────────────────────────┘
```

### 后台页面布局

```
┌──────┬──────────────────────────────┐
│      │  Header (用户名+退出)         │
│ Side │──────────────────────────────│
│ bar  │                              │
│      │  Main Content Area           │
│      │  (面包屑 + 操作栏 + 内容)     │
│      │                              │
└──────┴──────────────────────────────┘
```
