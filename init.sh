#!/bin/bash
# 万家官网管家 — 项目初始化和服务启动脚本
set -e

echo "========================================="
echo "  万家官网管家 — 初始化脚本"
echo "========================================="

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "项目根目录: $PROJECT_ROOT"

# ========================================
# 1. 安装后端依赖
# ========================================
echo ""
echo "[1/5] 安装后端依赖..."
cd "$PROJECT_ROOT/server"
if [ ! -d "node_modules" ]; then
  npm install
  echo "后端依赖安装完成"
else
  echo "后端依赖已存在，跳过安装"
fi

# ========================================
# 2. 初始化数据库
# ========================================
echo ""
echo "[2/5] 初始化数据库..."
mkdir -p "$PROJECT_ROOT/data"
mkdir -p "$PROJECT_ROOT/uploads"
node "$PROJECT_ROOT/server/db/init.js"
echo "数据库初始化完成"

# ========================================
# 3. 安装前台官网依赖
# ========================================
echo ""
echo "[3/5] 安装前台官网依赖..."
cd "$PROJECT_ROOT/web"
if [ ! -d "node_modules" ]; then
  npm install
  echo "前台依赖安装完成"
else
  echo "前台依赖已存在，跳过安装"
fi

# ========================================
# 4. 安装后台 CMS 依赖
# ========================================
echo ""
echo "[4/5] 安装后台 CMS 依赖..."
cd "$PROJECT_ROOT/admin"
if [ ! -d "node_modules" ]; then
  npm install
  echo "后台依赖安装完成"
else
  echo "后台依赖已存在，跳过安装"
fi

# ========================================
# 5. 启动开发服务
# ========================================
echo ""
echo "[5/5] 启动开发服务..."

# 启动后端 API 服务
cd "$PROJECT_ROOT/server"
echo "启动后端 API 服务 (端口 3000)..."
node index.js &
API_PID=$!
echo "后端 PID: $API_PID"

# 启动前台开发服务器
cd "$PROJECT_ROOT/web"
echo "启动前台开发服务器 (端口 5173)..."
npx vite --port 5173 &
WEB_PID=$!
echo "前台 PID: $WEB_PID"

# 启动后台开发服务器
cd "$PROJECT_ROOT/admin"
echo "启动后台开发服务器 (端口 5174)..."
npx vite --port 5174 &
ADMIN_PID=$!
echo "后台 PID: $ADMIN_PID"

echo ""
echo "========================================="
echo "  所有服务已启动！"
echo "========================================="
echo ""
echo "  前台官网:  http://localhost:5173/"
echo "  后台 CMS:  http://localhost:5174/admin/"
echo "  API 服务:  http://localhost:3000/api/"
echo ""
echo "  默认管理员: admin / admin123"
echo ""
echo "  按 Ctrl+C 停止所有服务"
echo "========================================="

# 等待任意子进程退出
wait
