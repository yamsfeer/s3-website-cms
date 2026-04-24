<template>
  <div id="app-wrapper">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { getSettings } from './api'

async function updateMeta() {
  try {
    const res = await getSettings()
    if (res.code === 0 && res.data) {
      const s = res.data
      if (s.seo_title) {
        document.title = s.seo_title
      }
      updateMetaTag('keywords', s.seo_keywords)
      updateMetaTag('description', s.seo_description)
    }
  } catch (err) {
    console.error('更新 SEO meta 失败:', err)
  }
}

function updateMetaTag(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

onMounted(() => {
  updateMeta()
})
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - var(--nav-height) - 280px);
  margin-top: var(--nav-height);
}
</style>
