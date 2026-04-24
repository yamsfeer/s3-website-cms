<template>
  <div class="news page">
    <div class="container">
      <h1 class="page__title">最新动态</h1>
      <p class="section__subtitle">了解我们的最新资讯和行业动态</p>
      <div v-if="newsList.length > 0" class="news-grid">
        <NewsCard v-for="news in newsList" :key="news.id" :news="news" />
      </div>
      <div v-else class="empty-state">暂无动态</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NewsCard from '../components/NewsCard.vue'
import { getNews } from '../api'

const newsList = ref([])

async function loadNews() {
  try {
    const res = await getNews()
    if (res.code === 0) newsList.value = res.data.list || []
  } catch (err) {
    console.error('加载新闻失败:', err)
  }
}

onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
