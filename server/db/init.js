/**
 * 数据库连接与初始化模块
 * 负责创建 SQLite 连接、建表、创建索引
 */
const path = require('path');
const Database = require('better-sqlite3');

// 数据库文件路径：项目根目录/data/app.db
const DB_PATH = path.join(__dirname, '..', '..', 'data', 'app.db');

let db = null;

/**
 * 获取数据库连接实例（单例模式）
 * @returns {Database}
 */
function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    // 启用 WAL 模式提升并发读性能
    db.pragma('journal_mode = WAL');
    // 启用外键约束
    db.pragma('foreign_keys = ON');
  }
  return db;
}

/**
 * 执行建表 SQL 和索引创建
 */
function initTables() {
  const db = getDb();

  db.exec(`
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

    -- 初始化 settings 默认行（单行记录设计）
    INSERT OR IGNORE INTO settings (id) VALUES (1);

    -- 创建索引
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_banners_active_sort ON banners(is_active, sort_order);
    CREATE INDEX IF NOT EXISTS idx_services_active_sort ON services(is_active, sort_order);
    CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, created_at);
    CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(is_read);
  `);

  console.log('[DB] 数据库表和索引创建完成');
}

/**
 * 初始化数据库（建表 + 种子数据）
 * 当命令行直接运行此文件时执行
 */
function initDatabase() {
  initTables();

  // 插入种子数据
  const seed = require('./seed');
  seed();

  console.log('[DB] 数据库初始化完成');
}

// 直接运行时执行初始化
if (require.main === module) {
  initDatabase();
}

module.exports = { getDb, initTables, initDatabase };
