<template>
  <router-link :to="`/services/${service.id}`" class="service-card">
    <div class="service-card__image" v-if="service.icon">
      <img :src="service.icon" :alt="service.title" />
    </div>
    <div class="service-card__image service-card__image--placeholder" v-else>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </div>
    <div class="service-card__body">
      <h3 class="service-card__title">{{ service.title }}</h3>
      <p class="service-card__summary">{{ service.summary }}</p>
      <span class="service-card__link">
        了解详情
        <svg class="service-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </div>
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
  background: var(--bg-white);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.service-card:hover .service-card__arrow {
  transform: translateX(3px);
}

.service-card:hover .service-card__image img {
  transform: scale(1.03);
}

.service-card__image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.service-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.service-card__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gray);
  color: var(--apple-blue);
}

.service-card__image--placeholder svg {
  width: 40px;
  height: 40px;
}

.service-card__body {
  padding: var(--space-lg);
  text-align: center;
}

.service-card__title {
  font-family: var(--font-display);
  font-size: var(--fs-card);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.022em;
  color: var(--text-dark);
  margin-bottom: var(--space-sm);
}

.service-card__summary {
  font-size: var(--fs-small);
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-md);
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-small);
  color: var(--apple-blue);
  letter-spacing: -0.016em;
}

.service-card__arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}
</style>
