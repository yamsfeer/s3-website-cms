<template>
  <div class="news-page">
    <div class="page-header">
      <h2 class="page-title">新闻管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增新闻
      </el-button>
    </div>

    <el-table :data="newsList" v-loading="loading" border>
      <el-table-column label="封面" width="120">
        <template #default="{ row }">
          <el-image v-if="row.cover" :src="row.cover" fit="cover" style="width: 80px; height: 50px; border-radius: 4px;" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
      <el-table-column label="发布状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.is_published ? 'success' : 'info'">
            {{ row.is_published ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="160" />
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="handleTogglePublish(row)">
            {{ row.is_published ? '撤回' : '发布' }}
          </el-button>
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="total > 0"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      @current-change="loadNews"
    />

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑新闻' : '新增新闻'" width="700px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleFileChange"
            accept="image/*"
          >
            <el-image v-if="form.cover" :src="form.cover" fit="cover" class="upload-preview" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入正文内容（支持 HTML）" />
        </el-form-item>
        <el-form-item label="发布状态">
          <el-switch v-model="form.is_published" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getNews, createNews, updateNews, deleteNews, uploadFile } from '../api'

const loading = ref(false)
const newsList = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const formRef = ref(null)
const currentId = ref(null)

const form = ref({
  title: '', cover: '', content: '', is_published: 0
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }]
}

async function loadNews() {
  loading.value = true
  try {
    const res = await getNews({ page: page.value, pageSize: pageSize.value })
    if (res.code === 0) {
      newsList.value = res.data.list || []
      total.value = res.data.total || 0
    }
  } finally { loading.value = false }
}

function handleAdd() {
  isEdit.value = false
  currentId.value = null
  form.value = { title: '', cover: '', content: '', is_published: 0 }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  currentId.value = row.id
  form.value = { ...row }
  dialogVisible.value = true
}

async function handleFileChange(file) {
  try {
    const res = await uploadFile(file.raw)
    if (res.code === 0 && res.data) form.value.cover = res.data.url
  } catch { ElMessage.error('上传失败') }
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate()
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateNews(currentId.value, form.value)
      ElMessage.success('更新成功')
    } else {
      await createNews(form.value)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    loadNews()
  } finally { submitting.value = false }
}

async function handleTogglePublish(row) {
  try {
    await updateNews(row.id, { is_published: row.is_published ? 0 : 1 })
    ElMessage.success(row.is_published ? '已撤回' : '已发布')
    loadNews()
  } catch (err) { console.error('操作失败:', err) }
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确定删除该新闻吗？', '提示', { type: 'warning' })
    await deleteNews(row.id)
    ElMessage.success('删除成功')
    loadNews()
  } catch (err) { if (err !== 'cancel') console.error('删除失败:', err) }
}

onMounted(() => { loadNews() })
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
.avatar-uploader {
  border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer;
  width: 120px; height: 80px; display: flex; align-items: center; justify-content: center;
}
.avatar-uploader:hover { border-color: #409EFF; }
.avatar-uploader-icon { font-size: 24px; color: #8c939d; }
.upload-preview { width: 120px; height: 80px; }
</style>
