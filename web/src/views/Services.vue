<template>
  <div class="services page">
    <div class="container">
      <h1 class="page__title">服务介绍</h1>
      <p class="section__subtitle">我们提供的专业服务项目</p>
      <div v-if="services.length > 0" class="service-grid">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
      <div v-else class="empty-state">暂无服务数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { getServices } from '../api'

const services = ref([])

async function loadServices() {
  try {
    const res = await getServices()
    if (res.code === 0) services.value = res.data || []
  } catch (err) {
    console.error('加载服务失败:', err)
  }
}

onMounted(() => {
  loadServices()
})
</script>

<style scoped>
.service-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing-lg);
}
@media (min-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
