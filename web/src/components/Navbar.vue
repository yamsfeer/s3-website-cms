<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" @click="closeMenu">
        <span class="navbar__logo-icon">🏠</span>
        <span class="navbar__logo-text">万家官网管家</span>
      </router-link>

      <!-- 桌面端导航菜单 -->
      <ul class="navbar__menu">
        <li v-for="item in menuItems" :key="item.path" class="navbar__menu-item">
          <router-link
            :to="item.path"
            class="navbar__menu-link"
            :class="{ 'navbar__menu-link--active': isActive(item.path) }"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>

      <!-- 手机端汉堡按钮 -->
      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--active': isMobileMenuOpen }"
        @click="toggleMenu"
        aria-label="菜单"
      >
        <span class="navbar__hamburger-line"></span>
        <span class="navbar__hamburger-line"></span>
        <span class="navbar__hamburger-line"></span>
      </button>
    </div>

    <!-- 手机端导航菜单 -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="navbar__mobile-menu">
        <ul class="navbar__mobile-list">
          <li v-for="item in menuItems" :key="item.path" class="navbar__mobile-item">
            <router-link
              :to="item.path"
              class="navbar__mobile-link"
              :class="{ 'navbar__mobile-link--active': isActive(item.path) }"
              @click="closeMenu"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// 导航菜单项
const menuItems = [
  { label: '首页', path: '/' },
  { label: '服务', path: '/services' },
  { label: '动态', path: '/news' },
  { label: '留言', path: '/contact' }
]

/**
 * 判断菜单项是否激活
 * 首页精确匹配，其他前缀匹配
 */
function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

/** 切换手机端菜单 */
function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

/** 关闭手机端菜单 */
function closeMenu() {
  isMobileMenuOpen.value = false
}

/** 监听滚动，添加导航栏阴影效果 */
function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-bg-white);
  transition: box-shadow 0.3s ease;
}

.navbar--scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  flex-shrink: 0;
}

.navbar__logo:hover {
  color: var(--color-primary);
}

.navbar__logo-icon {
  font-size: 28px;
}

.navbar__logo-text {
  white-space: nowrap;
}

/* 桌面端菜单 */
.navbar__menu {
  display: none;
  align-items: center;
  gap: var(--spacing-xl);
}

.navbar__menu-link {
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  text-decoration: none;
  padding: var(--spacing-sm) 0;
  transition: color 0.2s ease;
  position: relative;
}

.navbar__menu-link:hover,
.navbar__menu-link--active {
  color: var(--color-primary);
}

.navbar__menu-link--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 1px;
}

/* 汉堡菜单按钮 */
.navbar__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  gap: 5px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 8px;
}

.navbar__hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--color-text-primary);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(2) {
  opacity: 0;
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 手机端菜单面板 */
.navbar__mobile-menu {
  background-color: var(--color-bg-white);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.navbar__mobile-list {
  padding: var(--spacing-sm) 0;
}

.navbar__mobile-item {
  border-bottom: 1px solid var(--color-border);
}

.navbar__mobile-item:last-child {
  border-bottom: none;
}

.navbar__mobile-link {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
  text-decoration: none;
  transition: all 0.2s ease;
}

.navbar__mobile-link:hover,
.navbar__mobile-link--active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

/* 桌面端显示桌面菜单，隐藏汉堡按钮 */
@media (min-width: 768px) {
  .navbar__menu {
    display: flex;
  }

  .navbar__hamburger {
    display: none;
  }
}

/* 过渡动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
