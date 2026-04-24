<template>
  <div class="dashboard-page">
    <h2 class="page-title">仪表盘</h2>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card stat-card--danger" shadow="never" @click="goToMessages">
          <div class="stat-content">
            <div class="stat-icon"><el-icon size="32"><ChatDotRound /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.unread_messages || 0 }}</div>
              <div class="stat-label">未读留言</div>
            </div>
          </div>
          <el-badge v-if="stats.unread_messages > 0" :value="stats.unread_messages" class="stat-badge" type="danger" />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon"><el-icon size="32"><ChatLineRound /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.total_messages || 0 }}</div>
              <div class="stat-label">总留言数</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon"><el-icon size="32"><Document /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.published_news || 0 }} / {{ stats.total_news || 0 }}</div>
              <div class="stat-label">文章数（已发布/总）</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stat-card" shadow="never">
          <div class="stat-content">
            <div class="stat-icon"><el-icon size="32"><Service /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.active_services || 0 }} / {{ stats.total_services || 0 }}</div>
              <div class="stat-label">服务数（活跃/总）</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷入口 -->
    <el-card class="quick-links" shadow="never">
      <template #header>
        <span>快捷入口</span>
      </template>
      <el-row :gutter="16">
        <el-col :xs="12" :sm="8" :md="6" v-for="link in quickLinks" :key="link.path">
          <router-link :to="link.path" class="quick-link">
            <el-icon size="24"><component :is="link.icon" /></el-icon>
            <span>{{ link.label }}</span>
          </router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChatDotRound, ChatLineRound, Document, Service, Picture, Setting } from '@element-plus/icons-vue'
import { getDashboardStats } from '../api'

const router = useRouter()
const stats = ref({})

const quickLinks = [
  { path: '/banners', label: '轮播图管理', icon: Picture },
  { path: '/services', label: '服务管理', icon: Service },
  { path: '/news', label: '新闻管理', icon: Document },
  { path: '/messages', label: '留言管理', icon: ChatLineRound },
  { path: '/settings', label: '站点设置', icon: Setting },
]

async function loadStats() {
  try {
    const res = await getDashboardStats()
    if (res.code === 0 && res.data) {
      stats.value = res.data
    }
  } catch (err) {
    console.error('加载统计数据失败:', err)
  }
}

function goToMessages() {
  router.push('/messages')
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.page-title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}
.stats-row {
  margin-bottom: 20px;
}
.stat-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
}
.stat-card--danger {
  border-left: 4px solid #f56c6c;
}
.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon {
  color: #409EFF;
}
.stat-card--danger .stat-icon {
  color: #f56c6c;
}
.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  line-height: 1.2;
}
.stat-label {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}
.stat-badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
.quick-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #606266;
  transition: background-color 0.2s ease;
}
.quick-link:hover {
  background-color: #f5f7fa;
  color: #409EFF;
}
</style>
