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
  background: var(--color-bg-white);
  border-radius: 12px;
  padding: var(--spacing-2xl);
}
.detail-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--spacing-xl);
}
.detail-title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}
.detail-date {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}
.detail-content {
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
}
.detail-content :deep(p) {
  margin-bottom: var(--spacing-md);
}
.detail-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>
