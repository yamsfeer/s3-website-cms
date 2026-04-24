<template>
  <div class="services-page">
    <div class="page-header">
      <h2 class="page-title">服务管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增服务
      </el-button>
    </div>

    <el-table :data="serviceList" v-loading="loading" border>
      <el-table-column label="图标" width="80">
        <template #default="{ row }">
          <el-image v-if="row.icon" :src="row.icon" fit="cover" style="width: 40px; height: 40px; border-radius: 4px;" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="服务名称" min-width="120" />
      <el-table-column prop="summary" label="简介" min-width="200" show-overflow-tooltip />
      <el-table-column prop="sort_order" label="排序" width="80" />
      <el-table-column label="状态" width="90">
        <template #default="{ row }">
          <el-tag :type="row.is_active ? 'success' : 'info'">
            {{ row.is_active ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑服务' : '新增服务'" width="600px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="服务名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleFileChange"
            accept="image/*"
          >
            <el-image v-if="form.icon" :src="form.icon" fit="cover" class="upload-preview" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="form.detail" type="textarea" :rows="5" placeholder="请输入详细介绍（支持 HTML）" />
        </el-form-item>
        <el-form-item label="排序值">
          <el-input-number v-model="form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_active" :active-value="1" :inactive-value="0" />
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
import { getServices, createService, updateService, deleteService, uploadFile } from '../api'

const loading = ref(false)
const serviceList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const formRef = ref(null)
const currentId = ref(null)

const form = ref({
  title: '', icon: '', summary: '', detail: '', sort_order: 0, is_active: 1
})

const rules = {
  title: [{ required: true, message: '请输入服务名称', trigger: 'blur' }]
}

async function loadServices() {
  loading.value = true
  try {
    const res = await getServices()
    if (res.code === 0) serviceList.value = res.data || []
  } finally { loading.value = false }
}

function handleAdd() {
  isEdit.value = false
  currentId.value = null
  form.value = { title: '', icon: '', summary: '', detail: '', sort_order: 0, is_active: 1 }
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
    if (res.code === 0 && res.data) form.value.icon = res.data.url
  } catch { ElMessage.error('上传失败') }
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate()
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateService(currentId.value, form.value)
      ElMessage.success('更新成功')
    } else {
      await createService(form.value)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    loadServices()
  } finally { submitting.value = false }
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确定删除该服务吗？', '提示', { type: 'warning' })
    await deleteService(row.id)
    ElMessage.success('删除成功')
    loadServices()
  } catch (err) { if (err !== 'cancel') console.error('删除失败:', err) }
}

onMounted(() => { loadServices() })
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
.avatar-uploader {
  border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer;
  width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;
}
.avatar-uploader:hover { border-color: #409EFF; }
.avatar-uploader-icon { font-size: 24px; color: #8c939d; }
.upload-preview { width: 80px; height: 80px; }
</style>
