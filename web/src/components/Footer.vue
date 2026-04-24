<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__grid">
        <!-- 公司信息 -->
        <div class="footer__col">
          <div class="footer__brand">
            <svg class="footer__brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>万家官网管家</span>
          </div>
          <p class="footer__desc">
            专业的本地服务企业官网解决方案，帮助企业快速上线"能改内容、能收线索"的官网。
          </p>
        </div>

        <!-- 快速链接 -->
        <div class="footer__col">
          <h4 class="footer__heading">快速链接</h4>
          <ul class="footer__links">
            <li>
              <router-link to="/" class="footer__link">首页</router-link>
            </li>
            <li>
              <router-link to="/services" class="footer__link">服务介绍</router-link>
            </li>
            <li>
              <router-link to="/news" class="footer__link">最新动态</router-link>
            </li>
            <li>
              <router-link to="/contact" class="footer__link">在线留言</router-link>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div class="footer__col">
          <h4 class="footer__heading">联系方式</h4>
          <ul class="footer__contacts">
            <li class="footer__contact">
              <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>400-888-8888</span>
            </li>
            <li class="footer__contact">
              <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>北京市朝阳区xxx大厦</span>
            </li>
            <li class="footer__contact">
              <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>周一至周五 9:00-18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; {{ currentYear }} 万家官网管家 版权所有
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--bg-gray);
  color: var(--text-dark);
  padding: var(--space-3xl) 0 0;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  padding-bottom: var(--space-xl);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--fs-card);
  font-weight: 600;
  letter-spacing: -0.022em;
  margin-bottom: var(--space-md);
  color: var(--text-dark);
}

.footer__brand-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.footer__desc {
  color: var(--text-secondary);
  font-size: var(--fs-small);
  line-height: 1.6;
  max-width: 320px;
}

.footer__heading {
  font-size: var(--fs-small);
  font-weight: 600;
  margin-bottom: var(--space-md);
  color: var(--text-dark);
  letter-spacing: -0.016em;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer__link {
  color: var(--text-secondary);
  font-size: var(--fs-small);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: var(--text-dark);
}

.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer__contact {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-secondary);
  font-size: var(--fs-small);
}

.footer__contact-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.6;
}

.footer__bottom {
  border-top: 1px solid var(--border-light);
  padding: var(--space-md) 0;
  text-align: center;
}

.footer__copyright {
  color: var(--text-muted);
  font-size: var(--fs-micro);
}

/* 平板端：两列 */
@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端：三列 */
@media (min-width: 1024px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
