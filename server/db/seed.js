/**
 * 种子数据模块
 * 插入默认管理员账号和示例数据
 * 使用 INSERT OR IGNORE 避免重复插入
 */
const bcrypt = require('bcryptjs');
const { getDb } = require('./init');

function seed() {
  const db = getDb();

  // 检查是否已有种子数据（通过检查 users 表是否有记录）
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count > 0) {
    console.log('[Seed] 种子数据已存在，跳过插入');
    return;
  }

  console.log('[Seed] 开始插入种子数据...');

  // 1. 默认管理员账号（密码: admin123）
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('[Seed] 默认管理员账号创建完成 (admin / admin123)');

  // 2. 示例轮播图
  const insertBanner = db.prepare(
    'INSERT INTO banners (image_url, title, sort_order) VALUES (?, ?, ?)'
  );
  insertBanner.run('/uploads/banner1.jpg', '专业家政服务', 100);
  insertBanner.run('/uploads/banner2.jpg', '品质生活从家开始', 90);
  console.log('[Seed] 示例轮播图插入完成 (2条)');

  // 3. 示例服务
  const insertService = db.prepare(
    'INSERT INTO services (title, summary, sort_order) VALUES (?, ?, ?)'
  );
  insertService.run('日常保洁', '2小时起，专业工具上门', 100);
  insertService.run('深度清洁', '厨房油烟/卫生间水垢专项处理', 90);
  insertService.run('开荒保洁', '新房/装修后全面清洁', 80);
  console.log('[Seed] 示例服务插入完成 (3条)');

  // 4. 示例新闻
  const insertNews = db.prepare(
    'INSERT INTO news (title, content, is_published) VALUES (?, ?, ?)'
  );
  insertNews.run('春季大扫除优惠来袭', '<p>春天来了，万物复苏，正是给家里来一次彻底清洁的好时机。我们推出春季大扫除特别优惠，全场服务8折起！</p>', 1);
  insertNews.run('万家保洁服务升级公告', '<p>为提供更优质的服务体验，我们对服务流程进行了全面升级，新增在线预约、服务进度追踪等便捷功能。</p>', 1);
  console.log('[Seed] 示例新闻插入完成 (2条)');

  // 5. 示例留言
  const insertMessage = db.prepare(
    'INSERT INTO messages (name, phone, content) VALUES (?, ?, ?)'
  );
  insertMessage.run('王先生', '13800138000', '想咨询全屋保洁服务，大概120平米的房子');
  console.log('[Seed] 示例留言插入完成 (1条)');

  // 6. 默认站点设置
  db.prepare(`
    UPDATE settings SET
      site_name = '万家保洁',
      site_desc = '您身边的专业保洁服务',
      phone = '400-123-4567',
      address = '北京市朝阳区XX路XX号',
      about = '万家保洁成立于2020年，专注于为北京市民提供专业、高效、贴心的家政保洁服务。我们拥有经验丰富的保洁团队，使用环保清洁用品，让您省心放心。',
      seo_title = '万家保洁-北京专业保洁公司',
      seo_keywords = '保洁,家政,北京保洁',
      seo_description = '万家保洁提供专业家政保洁服务'
    WHERE id = 1
  `).run();
  console.log('[Seed] 默认站点设置更新完成');

  console.log('[Seed] 种子数据插入完成');
}

module.exports = seed;
