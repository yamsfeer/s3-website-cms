<template>
  <div class="banner-carousel" v-if="banners.length > 0">
    <el-carousel height="400px" :interval="3000" arrow="always" indicator-position="outside">
      <el-carousel-item v-for="banner in banners" :key="banner.id">
        <div class="banner-item">
          <img :src="banner.image_url" :alt="banner.title" class="banner-image" />
          <div v-if="banner.title" class="banner-title">{{ banner.title }}</div>
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
  margin-bottom: 0;
}
.banner-item {
  position: relative;
  width: 100%;
  height: 100%;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner-title {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  padding: 8px 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
@media (max-width: 768px) {
  .banner-carousel :deep(.el-carousel__container) {
    height: 220px !important;
  }
  .banner-title {
    font-size: 16px;
    bottom: 20px;
  }
}
</style>
