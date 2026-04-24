<template>
  <div class="home page">
    <BannerCarousel />

    <div class="container">
      <!-- 公司简介区域 -->
      <section class="section section--gray">
        <h2 class="section__title">关于我们</h2>
        <p class="section__subtitle">{{ settings.site_desc || '专注本地服务，用心经营每一天' }}</p>
        <div class="about-content" v-if="settings.about" v-html="settings.about"></div>
        <div class="about-content" v-else>
          <p>我们是专业的本地服务企业，致力于为客户提供高品质的家政、装修及法律咨询服务。凭借多年行业经验和专业团队，我们已成为众多客户信赖的选择。</p>
        </div>
      </section>

      <!-- 热门服务区域 -->
      <section class="section">
        <h2 class="section__title">热门服务</h2>
        <p class="section__subtitle">我们提供的专业服务</p>
        <div v-if="services.length > 0" class="service-grid">
          <ServiceCard v-for="service in services.slice(0, 4)" :key="service.id" :service="service" />
        </div>
        <div v-else class="empty-state">暂无服务数据</div>
        <div class="section__more" v-if="services.length > 0">
          <router-link to="/services" class="btn btn--outline">查看全部服务</router-link>
        </div>
      </section>

      <!-- 最新动态区域 -->
      <section class="section section--gray">
        <h2 class="section__title">最新动态</h2>
        <p class="section__subtitle">了解我们的最新资讯</p>
        <div v-if="newsList.length > 0" class="news-grid">
          <NewsCard v-for="news in newsList.slice(0, 4)" :key="news.id" :news="news" />
        </div>
        <div v-else class="empty-state">暂无新闻数据</div>
        <div class="section__more" v-if="newsList.length > 0">
          <router-link to="/news" class="btn btn--outline">查看全部动态</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BannerCarousel from '../components/BannerCarousel.vue'
import ServiceCard from '../components/ServiceCard.vue'
import NewsCard from '../components/NewsCard.vue'
import { getServices, getNews, getSettings } from '../api'

const services = ref([])
const newsList = ref([])
const settings = ref({})

async function loadData() {
  try {
    const [sRes, nRes, stRes] = await Promise.all([
      getServices(),
      getNews(),
      getSettings()
    ])
    if (sRes.code === 0) services.value = sRes.data || []
    if (nRes.code === 0) newsList.value = nRes.data.list || []
    if (stRes.code === 0) settings.value = stRes.data || {}
  } catch (err) {
    console.error('加载首页数据失败:', err)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.service-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-lg);
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-lg);
}
.section__more {
  text-align: center;
  margin-top: var(--spacing-xl);
}
.about-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-secondary);
  line-height: 1.8;
}
@media (min-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .news-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
