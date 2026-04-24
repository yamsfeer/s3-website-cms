<template>
  <div class="news-detail page">
    <div class="container">
      <div v-if="news" class="detail-card">
        <img v-if="news.cover" :src="news.cover" :alt="news.title" class="detail-cover" />
        <h1 class="detail-title">{{ news.title }}</h1>
        <p class="detail-date">{{ formatDate(news.created_at) }}</p>
        <div class="detail-content" v-html="news.content"></div>
        <div class="detail-actions">
          <router-link to="/news" class="btn btn--outline">返回列表</router-link>
        </div>
      </div>
      <div v-else class="empty-state">新闻不存在</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getNewsDetail } from '../api'

const route = useRoute()
const news = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function loadNews() {
  try {
    const res = await getNewsDetail(route.params.id)
    if (res.code === 0) news.value = res.data
  } catch (err) {
    console.error('加载新闻详情失败:', err)
  }
}

onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.detail-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-white);
  border-radius: 8px;
  padding: var(--space-3xl);
  box-shadow: var(--shadow-card);
}

.detail-cover {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--space-xl);
}

.detail-title {
  font-family: var(--font-display);
  font-size: var(--fs-tile);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.022em;
  color: var(--text-dark);
  margin-bottom: var(--space-sm);
}

.detail-date {
  font-size: var(--fs-small);
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
  letter-spacing: -0.01em;
}

.detail-content {
  font-size: var(--fs-body);
  color: var(--text-dark);
  line-height: 1.8;
  margin-bottom: var(--space-xl);
}

.detail-content :deep(p) {
  margin-bottom: var(--space-md);
}

.detail-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .detail-card {
    padding: var(--space-xl);
  }

  .detail-cover {
    height: 200px;
  }
}
</style>
