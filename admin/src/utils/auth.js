/**
 * Token 存储工具
 * 使用 localStorage 持久化 JWT Token
 */

const TOKEN_KEY = 'wjgug_admin_token'
const USER_KEY = 'wjgug_admin_user'

/**
 * 获取 Token
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置 Token
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除 Token（登出）
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * 获取用户信息
 * @returns {object|null}
 */
export function getUser() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

/**
 * 设置用户信息
 * @param {object} user
 */
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * 判断是否已登录
 * @returns {boolean}
 */
export function isLoggedIn() {
  return !!getToken()
}
