<template>
  <div class="banner-carousel" v-if="banners.length > 0">
    <el-carousel height="520px" :interval="4000" arrow="always" indicator-position="outside">
      <el-carousel-item v-for="banner in banners" :key="banner.id">
        <div class="banner-item">
          <img :src="banner.image_url" :alt="banner.title" class="banner-image" />
          <div v-if="banner.title" class="banner-overlay">
            <div class="banner-title">{{ banner.title }}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBanners } from '../api'

const banners = ref([])

async function loadBanners() {
  try {
    const res = await getBanners()
    if (res.code === 0) {
      banners.value = res.data || []
    }
  } catch (err) {
    console.error('加载轮播图失败:', err)
  }
}

onMounted(() => {
  loadBanners()
})
</script>

<style scoped>
.banner-carousel {
  width: 100%;
  margin-bottom: 0;
}

.banner-item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-3xl) var(--space-lg);
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
}

.banner-title {
  color: var(--text-white);
  font-family: var(--font-display);
  font-size: var(--fs-tile);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.022em;
  text-align: center;
}

@media (max-width: 768px) {
  .banner-carousel :deep(.el-carousel__container) {
    height: 280px !important;
  }

  .banner-title {
    font-size: var(--fs-card);
  }
}

/* Element Plus 轮播图样式覆盖 */
.banner-carousel :deep(.el-carousel__indicators--outside) {
  padding-top: var(--space-md);
}

.banner-carousel :deep(.el-carousel__indicator) {
  padding: var(--space-xs) var(--space-sm);
}

.banner-carousel :deep(.el-carousel__button) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}

.banner-carousel :deep(.el-carousel__indicator.is-active .el-carousel__button) {
  background-color: var(--apple-blue);
}
</style>
