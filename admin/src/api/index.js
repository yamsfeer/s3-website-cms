/**
 * Axios 封装
 * - 自动携带 Token
 * - 401 自动跳转登录页
 * - 统一响应处理
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '../utils/auth'
import router from '../router'

// 创建 axios 实例
const request = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器：自动携带 Token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理错误和 401
request.interceptors.response.use(
  (response) => {
    const res = response.data

    // 统一响应格式：{ code, data, msg }
    if (res.code !== 0) {
      ElMessage.error(res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }

    return res
  },
  (error) => {
    const { response } = error

    if (response) {
      // 401 未授权，清除 Token 并跳转登录页
      if (response.status === 401 || (response.data && response.data.code === 401)) {
        removeToken()
        ElMessage.error('登录已过期，请重新登录')
        router.push('/login')
        return Promise.reject(error)
      }

      // 其他错误
      const msg = response.data?.msg || `请求失败 (${response.status})`
      ElMessage.error(msg)
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }

    return Promise.reject(error)
  }
)

/**
 * 登录接口
 * @param {object} data - { username, password }
 */
export function login(data) {
  return request.post('/api/auth/login', data)
}

/**
 * 获取仪表盘统计
 */
export function getDashboardStats() {
  return request.get('/api/dashboard/stats')
}

/**
 * 获取轮播图列表
 */
export function getBanners() {
  return request.get('/api/banners')
}

/**
 * 获取服务列表
 */
export function getServices() {
  return request.get('/api/services')
}

/**
 * 获取新闻列表
 */
export function getNews(params) {
  return request.get('/api/news', { params })
}

/**
 * 获取留言列表
 */
export function getMessages(params) {
  return request.get('/api/messages', { params })
}

/**
 * 标记留言已处理
 */
export function markMessageRead(id) {
  return request.put(`/api/messages/${id}/read`)
}

/**
 * 获取站点设置
 */
export function getSettings() {
  return request.get('/api/settings')
}

/**
 * 更新站点设置
 */
export function updateSettings(data) {
  return request.put('/api/settings', data)
}

/**
 * 上传文件
 */
export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// --- 轮播图 CRUD ---
export function createBanner(data) {
  return request.post('/api/banners', data)
}
export function updateBanner(id, data) {
  return request.put(`/api/banners/${id}`, data)
}
export function deleteBanner(id) {
  return request.delete(`/api/banners/${id}`)
}

// --- 服务 CRUD ---
export function createService(data) {
  return request.post('/api/services', data)
}
export function updateService(id, data) {
  return request.put(`/api/services/${id}`, data)
}
export function deleteService(id) {
  return request.delete(`/api/services/${id}`)
}

// --- 新闻 CRUD ---
export function createNews(data) {
  return request.post('/api/news', data)
}
export function updateNews(id, data) {
  return request.put(`/api/news/${id}`, data)
}
export function deleteNews(id) {
  return request.delete(`/api/news/${id}`)
}

export default request
