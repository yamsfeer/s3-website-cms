<template>
  <div class="settings-page">
    <div class="page-header">
      <h2 class="page-title">站点设置</h2>
    </div>

    <el-form :model="form" label-width="120px" v-loading="loading">
      <el-card class="settings-card" shadow="never">
        <template #header><span>基本信息</span></template>
        <el-form-item label="站点名称">
          <el-input v-model="form.site_name" placeholder="请输入站点名称" />
        </el-form-item>
        <el-form-item label="站点描述">
          <el-input v-model="form.site_desc" type="textarea" :rows="2" placeholder="请输入站点描述" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="form.address" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="公司介绍">
          <el-input v-model="form.about" type="textarea" :rows="5" placeholder="请输入公司介绍（支持 HTML）" />
        </el-form-item>
      </el-card>

      <el-card class="settings-card" shadow="never">
        <template #header><span>SEO 设置</span></template>
        <el-form-item label="SEO 标题">
          <el-input v-model="form.seo_title" placeholder="请输入 SEO 标题" />
        </el-form-item>
        <el-form-item label="SEO 关键词">
          <el-input v-model="form.seo_keywords" placeholder="请输入 SEO 关键词，用逗号分隔" />
        </el-form-item>
        <el-form-item label="SEO 描述">
          <el-input v-model="form.seo_description" type="textarea" :rows="3" placeholder="请输入 SEO 描述" />
        </el-form-item>
      </el-card>

      <el-form-item>
        <el-button type="primary" @click="handleSave" :loading="saving">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getSettings, updateSettings } from '../api'

const loading = ref(false)
const saving = ref(false)
const form = ref({
  site_name: '', site_desc: '', phone: '', address: '', about: '',
  seo_title: '', seo_keywords: '', seo_description: ''
})

async function loadSettings() {
  loading.value = true
  try {
    const res = await getSettings()
    if (res.code === 0 && res.data) {
      form.value = { ...form.value, ...res.data }
    }
  } finally { loading.value = false }
}

async function handleSave() {
  saving.value = true
  try {
    await updateSettings(form.value)
    ElMessage.success('保存成功')
  } catch (err) { console.error('保存失败:', err)
  } finally { saving.value = false }
}

onMounted(() => { loadSettings() })
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
.page-title { font-size: 20px; font-weight: 600; margin: 0; }
.settings-card { margin-bottom: 20px; }
</style>
