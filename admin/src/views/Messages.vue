<template>
  <div class="messages-page">
    <div class="page-header">
      <h2 class="page-title">留言管理</h2>
    </div>

    <el-table :data="messageList" v-loading="loading" border>
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="phone" label="电话" width="130" />
      <el-table-column prop="content" label="内容" min-width="250" show-overflow-tooltip />
      <el-table-column label="状态" width="90">
        <template #default="{ row }">
          <el-tag :type="row.is_read ? 'info' : 'danger'">
            {{ row.is_read ? '已处理' : '待处理' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="时间" width="160" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="handleView(row)">查看</el-button>
          <el-button v-if="!row.is_read" size="small" type="primary" @click="handleMarkRead(row)">标记已处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="total > 0"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      @current-change="loadMessages"
    />

    <el-dialog v-model="detailVisible" title="留言详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ currentMessage.name }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ currentMessage.phone }}</el-descriptions-item>
        <el-descriptions-item label="时间">{{ currentMessage.created_at }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentMessage.is_read ? 'info' : 'danger'">
            {{ currentMessage.is_read ? '已处理' : '待处理' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="内容">
          <div style="white-space: pre-wrap;">{{ currentMessage.content }}</div>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button v-if="!currentMessage.is_read" type="primary" @click="handleMarkRead(currentMessage); detailVisible = false">标记已处理</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getMessages, markMessageRead } from '../api'

const loading = ref(false)
const messageList = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const detailVisible = ref(false)
const currentMessage = ref({})

async function loadMessages() {
  loading.value = true
  try {
    const res = await getMessages({ page: page.value, pageSize: pageSize.value })
    if (res.code === 0) {
      messageList.value = res.data.list || []
      total.value = res.data.total || 0
    }
  } finally { loading.value = false }
}

function handleView(row) {
  currentMessage.value = { ...row }
  detailVisible.value = true
}

async function handleMarkRead(row) {
  try {
    await markMessageRead(row.id)
    ElMessage.success('已标记为已处理')
    loadMessages()
  } catch (err) { console.error('标记失败:', err) }
}

onMounted(() => { loadMessages() })
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
</style>
