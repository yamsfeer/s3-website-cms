<template>
  <router-link :to="`/news/${news.id}`" class="news-card">
    <div class="news-card__cover" v-if="news.cover">
      <img :src="news.cover" :alt="news.title" />
    </div>
    <div class="news-card__cover news-card__cover--placeholder" v-else>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
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
  background: var(--bg-white);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.news-card:hover .news-card__cover img {
  transform: scale(1.03);
}

.news-card__cover {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.news-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card__cover--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gray);
  color: var(--text-muted);
}

.news-card__cover--placeholder svg {
  width: 40px;
  height: 40px;
}

.news-card__content {
  padding: var(--space-md) var(--space-lg);
}

.news-card__title {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: var(--space-xs);
  line-height: 1.4;
  letter-spacing: -0.022em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-card__date {
  font-size: var(--fs-small);
  color: var(--text-muted);
  letter-spacing: -0.01em;
}
</style>
