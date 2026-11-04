/**
 * 登录状态管理 — 简易 localStorage token
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('admin_token') || '')
  const username = ref<string>(localStorage.getItem('admin_user') || '')

  const isLoggedIn = computed(() => !!token.value)

  function login(user: string, pass: string): boolean {
    // 简易校验 — 用户名密码硬编码 demo
    if (user === 'admin' && pass === 'admin123') {
      token.value = btoa(`${user}:${pass}`)
      username.value = user
      localStorage.setItem('admin_token', token.value)
      localStorage.setItem('admin_user', user)
      return true
    }
    return false
  }

  function logout() {
    token.value = ''
    username.value = ''
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return { token, username, isLoggedIn, login, logout }
})
