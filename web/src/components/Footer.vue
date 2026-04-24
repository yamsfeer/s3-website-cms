<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__grid">
        <!-- 公司信息 -->
        <div class="footer__col">
          <h3 class="footer__brand">
            <span class="footer__brand-icon">🏠</span>
            万家官网管家
          </h3>
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
              <span class="footer__contact-icon">📞</span>
              <span>400-888-8888</span>
            </li>
            <li class="footer__contact">
              <span class="footer__contact-icon">📍</span>
              <span>北京市朝阳区xxx大厦</span>
            </li>
            <li class="footer__contact">
              <span class="footer__contact-icon">🕐</span>
              <span>周一至周五 9:00-18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} 万家官网管家 版权所有
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
  background-color: var(--color-bg-dark);
  color: var(--color-text-white);
  padding: var(--spacing-2xl) 0 0;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
}

.footer__brand-icon {
  font-size: 24px;
}

.footer__desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
  line-height: 1.8;
}

.footer__heading {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-white);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer__link {
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: var(--color-text-white);
}

.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer__contact {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}

.footer__contact-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-md) 0;
  text-align: center;
}

.footer__copyright {
  color: var(--color-text-muted);
  font-size: var(--font-size-tiny);
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
