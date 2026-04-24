/**
 * Multer 文件上传配置
 * 支持文件类型：jpg/png/gif/webp，最大 5MB
 */
const path = require('path');
const multer = require('multer');

// 上传文件存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 存储到项目根目录/uploads/
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 时间戳重命名：{时间戳}-{原始文件名}
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    // 清理文件名中的特殊字符
    const safeName = basename.replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, '');
    cb(null, `${timestamp}-${safeName}${ext}`);
  }
});

// 文件类型白名单过滤
const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('文件类型不支持，仅支持 jpg/png/gif/webp 格式'), false);
  }
};

// 创建 multer 实例
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;
