<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-pattern"></div>
    </div>

    <div class="login-card">
      <!-- Logo -->
      <div class="login-logo">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <defs>
            <linearGradient id="flameGrad" x1="28" y1="4" x2="28" y2="52" gradientUnits="userSpaceOnUse">
              <stop stop-color="#e8541e" />
              <stop offset="1" stop-color="#ffd66b" />
            </linearGradient>
          </defs>
          <path
            d="M28 4C28 4 36 14 36 24C36 20 40 16 40 10C44 18 46 26 46 32C46 44 38 52 28 52C18 52 10 44 10 32C10 24 14 16 18 10C18 16 22 20 22 24C22 14 28 4 28 4Z"
            fill="url(#flameGrad)"
          />
          <path
            d="M28 36C28 36 32 30 32 26C32 28 34 30 34 32C34 38 30 42 28 42C26 42 22 38 22 32C22 30 24 28 24 26C24 30 28 36 28 36Z"
            fill="#fff"
            opacity="0.6"
          />
        </svg>
      </div>

      <h1 class="login-title">后台管理登录</h1>
      <p class="login-subtitle">Honghe Fire Rescue · Admin</p>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            size="large"
            show-password
            :prefix-icon="Lock"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>

        <el-button
          type="primary"
          size="large"
          class="login-btn"
          :loading="loading"
          @click="handleSubmit"
        >
          登 录
        </el-button>

        <div class="login-tip">
          <el-icon :size="14"><InfoFilled /></el-icon>
          演示账号: admin / admin123
        </div>
      </el-form>

      <div class="login-footer">
        <a href="#/" class="back-link">
          <el-icon><ArrowLeft /></el-icon>
          返回前台
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock, InfoFilled, ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const auth = useAuthStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: 'admin123',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const success = auth.login(form.username, form.password)
      if (success) {
        ElMessage.success('登录成功')
        emit('success')
      } else {
        ElMessage.error('用户名或密码错误')
      }
    } catch (e) {
      ElMessage.error('登录失败，请稍后重试')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0e3a72;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(232, 84, 30, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(255, 214, 107, 0.1) 0%, transparent 50%);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ===== 登录卡片 ===== */
.login-card {
  position: relative;
  z-index: 1;
  width: 400px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px 40px 32px;
}

.login-logo {
  text-align: center;
  margin-bottom: 16px;
}

.login-title {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: #16233a;
  margin-bottom: 4px;
}

.login-subtitle {
  text-align: center;
  font-size: 13px;
  color: #5c6b82;
  margin-bottom: 28px;
  letter-spacing: 0.5px;
}

/* ===== 表单 ===== */
.login-form :deep(.el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 0 0 1px #dbe3ee inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #e8541e inset;
}

.login-btn {
  width: 100%;
  height: 44px;
  background: #e8541e;
  border-color: #e8541e;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
}

.login-btn:hover {
  background: #d14816 !important;
  border-color: #d14816 !important;
}

.login-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: #5c6b82;
  margin-top: 12px;
}

/* ===== Footer ===== */
.login-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #dbe3ee;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #0e3a72;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e8541e;
}
</style>
