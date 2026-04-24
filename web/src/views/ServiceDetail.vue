<template>
  <div class="service-detail page">
    <div class="container">
      <div v-if="service" class="detail-card">
        <div class="detail-header">
          <img v-if="service.icon" :src="service.icon" :alt="service.title" class="detail-icon" />
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
  background: var(--color-bg-white);
  border-radius: 12px;
  padding: var(--spacing-2xl);
}
.detail-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}
.detail-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
.detail-title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
.detail-summary {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.8;
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
.detail-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
</style>
