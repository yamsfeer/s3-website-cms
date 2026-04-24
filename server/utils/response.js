/**
 * 统一响应格式工具
 * 所有 API 响应使用 { code, data, msg } 格式
 */

/**
 * 成功响应
 * @param {object} res - Express response 对象
 * @param {*} data - 响应数据
 * @param {string} msg - 响应消息
 */
function success(res, data = null, msg = 'ok') {
  return res.json({ code: 0, data, msg });
}

/**
 * 错误响应
 * @param {object} res - Express response 对象
 * @param {number} code - 错误码（非0）
 * @param {string} msg - 错误消息
 */
function error(res, code = 500, msg = '服务器错误') {
  return res.json({ code, data: null, msg });
}

/**
 * 参数错误响应（400）
 * @param {object} res - Express response 对象
 * @param {string} msg - 错误消息
 */
function badRequest(res, msg = '参数错误') {
  return error(res, 400, msg);
}

/**
 * 未授权响应（401）
 * @param {object} res - Express response 对象
 * @param {string} msg - 错误消息
 */
function unauthorized(res, msg = '未授权，请先登录') {
  return error(res, 401, msg);
}

/**
 * 未找到响应（404）
 * @param {object} res - Express response 对象
 * @param {string} msg - 错误消息
 */
function notFound(res, msg = '资源不存在') {
  return error(res, 404, msg);
}

module.exports = { success, error, badRequest, unauthorized, notFound };
