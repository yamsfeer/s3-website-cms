<template>
  <section class="hero" :style="heroStyle">
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__subtitle">{{ subtitle }}</p>
      <div class="hero__actions">
        <router-link to="/services" class="btn btn--white-outline btn--lg">
          了解服务
        </router-link>
        <router-link to="/contact" class="btn btn--primary btn--lg">
          立即咨询
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '专业服务，品质生活' },
  subtitle: { type: String, default: '您身边值得信赖的本地服务专家' },
  imageUrl: { type: String, default: '' }
})

const heroStyle = computed(() => {
  if (props.imageUrl) {
    return { backgroundImage: `url(${props.imageUrl})` }
  }
  return {}
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 560px;
  background: var(--bg-black);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 var(--space-lg);
  max-width: var(--content-max);
}

.hero__title {
  font-family: var(--font-display);
  font-size: var(--fs-hero);
  font-weight: 600;
  line-height: 1.07;
  letter-spacing: -0.022em;
  color: var(--text-white);
  margin-bottom: var(--space-md);
}

.hero__subtitle {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.47;
  letter-spacing: -0.022em;
  color: var(--text-white-secondary);
  margin-bottom: var(--space-xl);
}

.hero__actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero {
    height: 400px;
  }

  .hero__title {
    font-size: 32px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: center;
  }

  .hero__actions .btn {
    width: 200px;
  }
}
</style>
