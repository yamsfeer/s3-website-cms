<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">姓名 *</label>
      <input
        v-model="form.name"
        type="text"
        class="form-input"
        placeholder="请输入您的姓名"
        required
      />
    </div>
    <div class="form-group">
      <label class="form-label">电话 *</label>
      <input
        v-model="form.phone"
        type="tel"
        class="form-input"
        placeholder="请输入您的联系电话"
        required
        pattern="^1[3-9]\d{9}$"
      />
      <p v-if="phoneError" class="form-error">请输入正确的手机号</p>
    </div>
    <div class="form-group">
      <label class="form-label">需求描述 *</label>
      <textarea
        v-model="form.content"
        class="form-input form-textarea"
        rows="4"
        placeholder="请描述您的需求"
        required
      ></textarea>
    </div>
    <button type="submit" class="btn btn--primary btn--lg btn--block" :disabled="submitting">
      {{ submitting ? '提交中...' : '提交留言' }}
    </button>
    <p v-if="successMsg" class="form-success">{{ successMsg }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { submitMessage } from '../api'

const form = ref({ name: '', phone: '', content: '' })
const submitting = ref(false)
const phoneError = ref(false)
const successMsg = ref('')

async function handleSubmit() {
  phoneError.value = false
  successMsg.value = ''

  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    phoneError.value = true
    return
  }

  submitting.value = true
  try {
    await submitMessage(form.value)
    successMsg.value = '提交成功，我们将尽快联系您！'
    form.value = { name: '', phone: '', content: '' }
  } catch (err) {
    console.error('提交失败:', err)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
