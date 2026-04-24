<template>
  <router-link :to="`/services/${service.id}`" class="service-card">
    <div class="service-card__icon" v-if="service.icon">
      <img :src="service.icon" :alt="service.title" />
    </div>
    <div class="service-card__icon service-card__icon--placeholder" v-else>
      {{ service.title.charAt(0) }}
    </div>
    <h3 class="service-card__title">{{ service.title }}</h3>
    <p class="service-card__summary">{{ service.summary }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  service: { type: Object, required: true }
})
</script>

<style scoped>
.service-card {
  display: block;
  background: var(--color-bg-white);
  border-radius: 12px;
  padding: var(--spacing-xl);
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary);
}
.service-card__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
}
.service-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.service-card__icon--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 28px;
  font-weight: 600;
  border-radius: 50%;
}
.service-card__title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}
.service-card__summary {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
