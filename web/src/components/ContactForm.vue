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
  gap: var(--spacing-md);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
.form-label {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.form-input {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: var(--font-size-body);
  transition: border-color 0.2s ease;
  width: 100%;
}
.form-input:focus {
  border-color: var(--color-primary);
}
.form-textarea {
  resize: vertical;
  min-height: 100px;
}
.form-error {
  font-size: var(--font-size-small);
  color: var(--color-danger);
  margin-top: 2px;
}
.form-success {
  font-size: var(--font-size-body);
  color: var(--color-secondary);
  text-align: center;
  padding: var(--spacing-md);
  background: rgba(16, 185, 129, 0.1);
  border-radius: 8px;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
