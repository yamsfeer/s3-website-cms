/**
 * 后台路由配置
 * - 包含路由守卫，未登录自动跳转登录页
 */
import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../utils/auth'

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    component: () => import('../components/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'banners',
        name: 'Banners',
        component: () => import('../views/Banners.vue'),
        meta: { title: '轮播图管理' }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('../views/Services.vue'),
        meta: { title: '服务管理' }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../views/News.vue'),
        meta: { title: '新闻管理' }
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import('../views/Messages.vue'),
        meta: { title: '留言管理' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: { title: '站点设置' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

// 路由守卫：拦截未登录访问
router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn()

  // 公开页面直接放行
  if (to.meta && to.meta.public) {
    // 如果已登录且访问登录页，重定向到仪表盘
    if (loggedIn && to.path === '/login') {
      return next('/dashboard')
    }
    return next()
  }

  // 需要登录但未登录，跳转到登录页
  if (!loggedIn) {
    return next('/login')
  }

  next()
})

export default router
