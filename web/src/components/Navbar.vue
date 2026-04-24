<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" @click="closeMenu">
        <svg class="navbar__logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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

const menuItems = [
  { label: '首页', path: '/' },
  { label: '服务', path: '/services' },
  { label: '动态', path: '/news' },
  { label: '留言', path: '/contact' }
]

function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
}

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
  height: var(--nav-height);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  transition: background 0.3s ease;
}

.navbar--scrolled {
  box-shadow: var(--shadow-nav);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-white);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.016em;
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.navbar__logo:hover {
  opacity: 0.8;
}

.navbar__logo-icon {
  width: 18px;
  height: 18px;
  color: var(--text-white);
}

.navbar__logo-text {
  white-space: nowrap;
}

/* 桌面端菜单 */
.navbar__menu {
  display: none;
  align-items: center;
  gap: var(--space-xl);
}

.navbar__menu-link {
  color: var(--text-white);
  font-size: var(--fs-nav);
  font-weight: 400;
  letter-spacing: -0.01em;
  text-decoration: none;
  padding: 4px 0;
  transition: opacity 0.2s ease;
  position: relative;
  opacity: 0.8;
}

.navbar__menu-link:hover {
  opacity: 1;
}

.navbar__menu-link--active {
  opacity: 1;
}

/* 汉堡菜单按钮 */
.navbar__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  gap: 5px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 6px;
}

.navbar__hamburger-line {
  display: block;
  width: 18px;
  height: 1.5px;
  background-color: var(--text-white);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(2) {
  opacity: 0;
}

.navbar__hamburger--active .navbar__hamburger-line:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* 手机端菜单面板 */
.navbar__mobile-menu {
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar__mobile-list {
  padding: var(--space-md) var(--space-lg);
}

.navbar__mobile-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar__mobile-item:last-child {
  border-bottom: none;
}

.navbar__mobile-link {
  display: block;
  padding: var(--space-md) 0;
  color: var(--text-white);
  font-size: var(--fs-body);
  font-weight: 400;
  text-decoration: none;
  transition: opacity 0.2s ease;
  opacity: 0.8;
}

.navbar__mobile-link:hover,
.navbar__mobile-link--active {
  opacity: 1;
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
