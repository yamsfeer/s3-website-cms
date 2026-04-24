<template>
  <div class="service-detail page">
    <div class="container">
      <div v-if="service" class="detail-card">
        <div class="detail-header">
          <div class="detail-icon" v-if="service.icon">
            <img :src="service.icon" :alt="service.title" />
          </div>
          <div class="detail-icon detail-icon--placeholder" v-else>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 class="detail-title">{{ service.title }}</h1>
        </div>
        <p class="detail-summary">{{ service.summary }}</p>
        <div v-if="service.detail" class="detail-content" v-html="service.detail"></div>
        <div class="detail-actions">
          <router-link to="/contact" class="btn btn--primary btn--lg">立即咨询</router-link>
          <router-link to="/services" class="btn btn--outline">返回列表</router-link>
        </div>
      </div>
      <div v-else class="empty-state">服务不存在或已下架</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getServiceDetail } from '../api'

const route = useRoute()
const service = ref(null)

async function loadService() {
  try {
    const res = await getServiceDetail(route.params.id)
    if (res.code === 0) service.value = res.data
  } catch (err) {
    console.error('加载服务详情失败:', err)
  }
}

onMounted(() => {
  loadService()
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

.detail-header {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.detail-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.detail-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.detail-icon--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gray);
  color: var(--apple-blue);
  border-radius: 50%;
}

.detail-icon--placeholder svg {
  width: 28px;
  height: 28px;
}

.detail-title {
  font-family: var(--font-display);
  font-size: var(--fs-tile);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.022em;
  color: var(--text-dark);
}

.detail-summary {
  font-size: var(--fs-body);
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  line-height: 1.6;
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

.detail-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}
</style>
