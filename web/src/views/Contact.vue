<template>
  <div class="contact page">
    <div class="container">
      <h1 class="page__title">在线留言</h1>
      <p class="section__subtitle">如有需求，请留言给我们，我们会尽快回复</p>

      <div class="contact-grid">
        <div class="contact-form-wrapper">
          <h3 class="contact-section-title">填写留言</h3>
          <ContactForm />
        </div>

        <div class="contact-info-wrapper">
          <h3 class="contact-section-title">联系方式</h3>
          <div class="contact-info">
            <div class="contact-info__item">
              <span class="contact-info__icon">📞</span>
              <div>
                <div class="contact-info__label">联系电话</div>
                <div class="contact-info__value">{{ settings.phone || '400-888-8888' }}</div>
              </div>
            </div>
            <div class="contact-info__item">
              <span class="contact-info__icon">📍</span>
              <div>
                <div class="contact-info__label">公司地址</div>
                <div class="contact-info__value">{{ settings.address || '北京市朝阳区xxx大厦' }}</div>
              </div>
            </div>
            <div class="contact-info__item">
              <span class="contact-info__icon">🏢</span>
              <div>
                <div class="contact-info__label">公司名称</div>
                <div class="contact-info__value">{{ settings.site_name || '万家官网管家' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ContactForm from '../components/ContactForm.vue'
import { getSettings } from '../api'

const settings = ref({})

async function loadSettings() {
  try {
    const res = await getSettings()
    if (res.code === 0) settings.value = res.data || {}
  } catch (err) {
    console.error('加载设置失败:', err)
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2xl);
  max-width: 900px;
  margin: 0 auto;
}
.contact-form-wrapper,
.contact-info-wrapper {
  background: var(--color-bg-white);
  border-radius: 12px;
  padding: var(--spacing-xl);
  border: 1px solid var(--color-border);
}
.contact-section-title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
.contact-info__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}
.contact-info__icon {
  font-size: 24px;
  flex-shrink: 0;
}
.contact-info__label {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}
.contact-info__value {
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}
@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}
</style>
