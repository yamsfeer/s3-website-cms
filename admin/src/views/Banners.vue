<template>
  <div class="banners-page">
    <div class="page-header">
      <h2 class="page-title">轮播图管理</h2>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增轮播图
      </el-button>
    </div>

    <el-table :data="bannerList" v-loading="loading" border>
      <el-table-column label="图片" width="180">
        <template #default="{ row }">
          <el-image :src="row.image_url" fit="cover" style="width: 120px; height: 60px; border-radius: 4px;" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="150" />
      <el-table-column prop="sort_order" label="排序值" width="100" />
      <el-table-column label="状态" width="100">
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

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑轮播图' : '新增轮播图'" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="图片" prop="image_url">
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleFileChange"
            accept="image/*"
          >
            <el-image v-if="form.image_url" :src="form.image_url" fit="cover" class="upload-preview" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div v-if="uploading" class="upload-tip">上传中...</div>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="排序值" prop="sort_order">
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
import { getBanners, createBanner, updateBanner, deleteBanner, uploadFile } from '../api'

const loading = ref(false)
const bannerList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const uploading = ref(false)
const formRef = ref(null)
const currentId = ref(null)

const form = ref({
  image_url: '',
  title: '',
  sort_order: 0,
  is_active: 1
})

const rules = {
  image_url: [{ required: true, message: '请上传图片', trigger: 'change' }]
}

async function loadBanners() {
  loading.value = true
  try {
    const res = await getBanners()
    if (res.code === 0) {
      bannerList.value = res.data || []
    }
  } catch (err) {
    console.error('加载轮播图失败:', err)
  } finally {
    loading.value = false
  }
}

function handleAdd() {
  isEdit.value = false
  currentId.value = null
  form.value = { image_url: '', title: '', sort_order: 0, is_active: 1 }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  currentId.value = row.id
  form.value = { ...row }
  dialogVisible.value = true
}

async function handleFileChange(file) {
  uploading.value = true
  try {
    const res = await uploadFile(file.raw)
    if (res.code === 0 && res.data) {
      form.value.image_url = res.data.url
    }
  } catch (err) {
    ElMessage.error('上传失败')
  } finally {
    uploading.value = false
  }
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate()

  submitting.value = true
  try {
    if (isEdit.value) {
      await updateBanner(currentId.value, form.value)
      ElMessage.success('更新成功')
    } else {
      await createBanner(form.value)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    loadBanners()
  } catch (err) {
    // error handled by interceptor
  } finally {
    submitting.value = false
  }
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确定删除该轮播图吗？', '提示', { type: 'warning' })
    await deleteBanner(row.id)
    ElMessage.success('删除成功')
    loadBanners()
  } catch (err) {
    if (err !== 'cancel') console.error('删除失败:', err)
  }
}

onMounted(() => {
  loadBanners()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.upload-preview {
  width: 200px;
  height: 100px;
}
.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
