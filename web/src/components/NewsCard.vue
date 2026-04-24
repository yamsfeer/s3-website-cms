<template>
  <router-link :to="`/news/${news.id}`" class="news-card">
    <div class="news-card__cover" v-if="news.cover">
      <img :src="news.cover" :alt="news.title" />
    </div>
    <div class="news-card__cover news-card__cover--placeholder" v-else>
      📰
    </div>
    <div class="news-card__content">
      <h3 class="news-card__title">{{ news.title }}</h3>
      <p class="news-card__date">{{ formatDate(news.created_at) }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  news: { type: Object, required: true }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.news-card {
  display: block;
  background: var(--color-bg-white);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
}
.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.news-card__cover {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.news-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.news-card:hover .news-card__cover img {
  transform: scale(1.05);
}
.news-card__cover--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  font-size: 48px;
}
.news-card__content {
  padding: var(--spacing-md) var(--spacing-lg);
}
.news-card__title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news-card__date {
  font-size: var(--font-size-tiny);
  color: var(--color-text-muted);
}
</style>
