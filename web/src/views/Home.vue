<template>
  <div class="home">
    <HeroSection
      :title="settings.site_name || '万家保洁'"
      :subtitle="settings.site_desc || '您身边的专业保洁服务专家'"
      :image-url="heroImage"
    />

    <!-- 公司简介区域 -->
    <section class="section section--gray">
      <div class="container">
        <h2 class="section__title">关于我们</h2>
        <p class="section__subtitle">{{ settings.site_desc || '专注本地服务，用心经营每一天' }}</p>
        <div class="about-content" v-if="settings.about" v-html="settings.about"></div>
        <div class="about-content" v-else>
          <p>万家保洁成立于2020年，专注于为北京市民提供专业、高效、贴心的家政保洁服务。我们拥有经验丰富的保洁团队，使用环保清洁用品，让您省心放心。</p>
        </div>
      </div>
    </section>

    <!-- 热门服务区域 -->
    <section class="section">
      <div class="container">
        <h2 class="section__title">热门服务</h2>
        <p class="section__subtitle">我们提供的专业服务</p>
        <div v-if="services.length > 0" class="service-grid">
          <ServiceCard v-for="service in services.slice(0, 4)" :key="service.id" :service="service" />
        </div>
        <div v-else class="empty-state">暂无服务数据</div>
        <div class="section__more" v-if="services.length > 0">
          <router-link to="/services" class="btn btn--outline">查看全部服务</router-link>
        </div>
      </div>
    </section>

    <!-- 最新动态区域 -->
    <section class="section section--gray">
      <div class="container">
        <h2 class="section__title">最新动态</h2>
        <p class="section__subtitle">了解我们的最新资讯</p>
        <div v-if="newsList.length > 0" class="news-grid">
          <NewsCard v-for="news in newsList.slice(0, 4)" :key="news.id" :news="news" />
        </div>
        <div v-else class="empty-state">暂无新闻数据</div>
        <div class="section__more" v-if="newsList.length > 0">
          <router-link to="/news" class="btn btn--outline">查看全部动态</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ServiceCard from '../components/ServiceCard.vue'
import NewsCard from '../components/NewsCard.vue'
import { getServices, getNews, getSettings, getBanners } from '../api'

const services = ref([])
const newsList = ref([])
const settings = ref({})
const banners = ref([])

const heroImage = computed(() => {
  if (banners.value.length > 0 && banners.value[0].image_url) {
    return banners.value[0].image_url
  }
  return '/uploads/banner1.jpg'
})

async function loadData() {
  try {
    const [sRes, nRes, stRes, bRes] = await Promise.all([
      getServices(),
      getNews(),
      getSettings(),
      getBanners()
    ])
    if (sRes.code === 0) services.value = sRes.data || []
    if (nRes.code === 0) newsList.value = nRes.data.list || []
    if (stRes.code === 0) settings.value = stRes.data || {}
    if (bRes.code === 0) banners.value = bRes.data || []
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
  gap: var(--space-lg);
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-lg);
}
.section__more {
  text-align: center;
  margin-top: var(--space-2xl);
}
.about-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--fs-body);
  line-height: 1.8;
}

.about-content :deep(p) {
  margin-bottom: var(--space-md);
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
