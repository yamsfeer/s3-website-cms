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
              <svg class="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <div>
                <div class="contact-info__label">联系电话</div>
                <div class="contact-info__value">{{ settings.phone || '400-888-8888' }}</div>
              </div>
            </div>
            <div class="contact-info__item">
              <svg class="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <div class="contact-info__label">公司地址</div>
                <div class="contact-info__value">{{ settings.address || '北京市朝阳区xxx大厦' }}</div>
              </div>
            </div>
            <div class="contact-info__item">
              <svg class="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
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
  gap: var(--space-2xl);
  max-width: 900px;
  margin: 0 auto;
}

.contact-form-wrapper,
.contact-info-wrapper {
  background: var(--bg-white);
  border-radius: 8px;
  padding: var(--space-2xl);
  border: none;
  box-shadow: var(--shadow-card);
}

.contact-section-title {
  font-family: var(--font-display);
  font-size: var(--fs-card);
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--text-dark);
  margin-bottom: var(--space-lg);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.contact-info__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.contact-info__icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: var(--apple-blue);
  margin-top: 2px;
}

.contact-info__label {
  font-size: var(--fs-small);
  color: var(--text-muted);
  margin-bottom: var(--space-xs);
  letter-spacing: -0.01em;
}

.contact-info__value {
  font-size: var(--fs-body);
  color: var(--text-dark);
  font-weight: 600;
  letter-spacing: -0.022em;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}
</style>
