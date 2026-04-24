/**
 * Axios 请求封装
 * - 统一 baseURL
 * - 超时配置
 * - 响应拦截：统一处理错误
 * - 前台接口无需鉴权，不携带 Token
 */
import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器：统一处理错误
request.interceptors.response.use(
  (response) => {
    const res = response.data

    // 统一响应格式：{ code, data, msg }
    if (res.code !== 0) {
      console.error(`[API Error] ${res.msg || '请求失败'}`)
      return Promise.reject(new Error(res.msg || '请求失败'))
    }

    return res
  },
  (error) => {
    const { response } = error

    if (response) {
      const msg = response.data?.msg || `请求失败 (${response.status})`
      console.error(`[API Error] ${msg}`)
    } else {
      console.error('[API Error] 网络错误，请检查网络连接')
    }

    return Promise.reject(error)
  }
)

// ========================================
// 前台公开 API
// ========================================

/**
 * 获取轮播图列表（公开）
 */
export function getBanners() {
  return request.get('/api/banners')
}

/**
 * 获取服务列表（公开，仅活跃服务）
 */
export function getServices() {
  return request.get('/api/services')
}

/**
 * 获取服务详情（公开）
 * @param {number} id - 服务 ID
 */
export function getServiceDetail(id) {
  return request.get(`/api/services/${id}`)
}

/**
 * 获取新闻列表（公开，仅已发布）
 */
export function getNews() {
  return request.get('/api/news')
}

/**
 * 获取新闻详情（公开）
 * @param {number} id - 新闻 ID
 */
export function getNewsDetail(id) {
  return request.get(`/api/news/${id}`)
}

/**
 * 提交留言（公开）
 * @param {object} data - { name, phone, content }
 */
export function submitMessage(data) {
  return request.post('/api/messages', data)
}

/**
 * 获取站点设置（公开）
 */
export function getSettings() {
  return request.get('/api/settings')
}

export default request
