<template>
  <div class="login-wrap bg-[#eef2f7] min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-xl rounded-md border border-[#dbe3ee] bg-white p-8 shadow-lg">
      <div class="mb-6 border-b border-[#dbe3ee] pb-4">
        <div class="flex items-center gap-3 mb-1">
          <div class="w-11 h-11 rounded-md bg-gradient-to-br from-[#0a2a55] to-[#e8541e] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 56 56" fill="none">
              <path
                d="M28 4C28 4 36 14 36 24C36 20 40 16 40 10C44 18 46 26 46 32C46 44 38 52 28 52C18 52 10 44 10 32C10 24 14 16 18 10C18 16 22 20 22 24C22 14 28 4 28 4Z"
                fill="#ffd66b"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-serif text-xl font-bold text-[#0a2a55]">后台管理身份认证</h3>
            <p class="mt-1 text-xs text-[#5c6b82]">
              管理后台默认限办公室内网访问，跨网访问需勾选安全授权。
            </p>
          </div>
        </div>
      </div>

      <!-- 账号权限说明：权限由账号绑定，不允许自行选择 -->
      <div class="mb-5 rounded-md border border-[#dbe3ee] bg-[#eaeff5]/60 p-4">
        <p class="text-xs font-bold text-[#0a2a55]">权限由登录账号绑定</p>
        <p class="mt-1 text-xs leading-relaxed text-[#5c6b82]">
          登录后仅显示该账号被授予的菜单、操作与数据范围：支队级账号用于内容上报，大队级账号用于审核发布。
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="a in demoAccounts"
            :key="a.username"
            type="button"
            @click="fillAccount(a)"
            class="rounded-sm border border-[#dbe3ee] bg-white px-2 py-1 text-[11px] text-[#0a2a55] transition-colors hover:border-[#e8541e] hover:text-[#e8541e]"
          >{{ a.label }}</button>
        </div>
      </div>

      <div class="space-y-3.5">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-medium text-[#0a2a55]">管理员账号</label>
            <input
              v-model="form.username"
              placeholder="用户名"
              class="w-full rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-[#0a2a55]">内网口令</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="密码"
              class="w-full rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
            />
          </div>
        </div>

        <label class="flex items-center gap-2 rounded-sm border border-[#dbe3ee] bg-[#eaeff5]/50 px-3 py-2.5 text-sm text-[#16233a]/85 cursor-pointer">
          <input type="checkbox" v-model="form.crossNet" class="accent-[#e8541e]" />
          <span>启用跨网安全访问通道（预留功能 · 经安全网关鉴权接入外链及跨网办公）</span>
        </label>

        <el-button
          type="primary"
          size="large"
          class="w-full rounded-sm bg-[#0a2a55] border-0 py-2.5 text-sm font-bold text-white hover:bg-[#e8541e]"
          :loading="loading"
          @click="handleSubmit"
        >
          进入后台管理平台
        </el-button>

        <div class="text-center text-xs text-[#5c6b82]">
          超级管理员演示账号: <code class="text-[#0a2a55]">admin</code> /
          <code class="text-[#0a2a55]">admin123</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth'
import { navigate } from '../utils/router'

const emit = defineEmits<{ (e: 'success'): void }>()

const auth = useAuthStore()
const loading = ref(false)

const demoAccounts = [
  { label: '超级管理员 admin_hhxf', username: 'admin_hhxf', password: 'admin123' },
  { label: '大队审核 audit_zhao', username: 'audit_zhao', password: '123456' },
  { label: '支队撰稿 writer_li', username: 'writer_li', password: '123456' },
  { label: '办公室直报 office_zhang', username: 'office_zhang', password: '123456' },
  { label: '大队报送 mz_writer', username: 'mz_writer', password: '123456' },
  { label: '大队审核 mz_auditor', username: 'mz_auditor', password: '123456' },
]

const form = reactive({
  username: 'admin',
  password: 'admin123',
  crossNet: false,
})

function fillAccount(a: { username: string; password: string }) {
  form.username = a.username
  form.password = a.password
}

async function handleSubmit() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入账号与口令')
    return
  }
  loading.value = true
  try {
    const ok = await auth.login(form.username, form.password)
    if (!ok) {
      ElMessage.error('账号或口令错误')
      return
    }
    // 权限完全来自账号，不接受前端覆盖
    auth.setCrossNet(form.crossNet)
    ElMessage.success(
      `欢迎登录：${auth.displayName} · ${auth.roleLabel} · ${auth.unit}`,
    )
    emit('success')
    navigate('/admin')
  } catch {
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>
