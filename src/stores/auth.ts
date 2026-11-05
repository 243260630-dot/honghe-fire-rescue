/**
 * 登录状态管理 — 对接后端 /api/auth/login
 * 权限完全由登录账号决定，前端不做角色切换。
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AdminUser, AuthLoginRes } from '../types'
import { apiAuth } from '../api/request'

export type RoleLevel = '支队' | '大队'

/** 后端可能返回「支队级 / 大队级」或「支队 / 大队」，统一归一化 */
function normalizeRole(user: AdminUser): RoleLevel {
  const raw = user.level ?? user.role ?? ''
  return String(raw).includes('支队') ? '支队' : '大队'
}

function readCachedUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem('auth_user')
    return raw ? (JSON.parse(raw) as AdminUser) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('auth_token') || '')
  const user = ref<AdminUser | null>(readCachedUser())
  const crossNetEnabled = ref<boolean>(localStorage.getItem('cross_net') === '1')

  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => user.value?.username ?? '')
  const displayName = computed(() => user.value?.name || user.value?.username || '管理员')
  const role = computed<RoleLevel>(() => (user.value ? normalizeRole(user.value) : '大队'))
  const roleLabel = computed(() => (role.value === '支队' ? '支队级（上报端）' : '大队级（审核端）'))
  const unit = computed(() => user.value?.unit ?? '')

  /** 权限：可撰稿（上报） */
  const canWrite = computed(() => !!user.value?.canWrite)
  /** 权限：可审核发布 */
  const canAudit = computed(() => !!user.value?.canAudit)
  /** 权限：办公室直报（跳过审核） */
  const canOfficeDirect = computed(() => !!user.value?.canOfficeDirect)
  /** 权限：外链与跨网配置 */
  const canManageUsers = computed(() => !!user.value?.canManageUsers)
  /** 审核范围 */
  const auditScope = computed<'ALL' | 'UNIT_ONLY'>(() => user.value?.auditScope ?? 'UNIT_ONLY')
  /** 可操作栏目 */
  const allowedModules = computed<string[] | 'ALL'>(() => user.value?.allowedModules ?? 'ALL')

  /** 是否可操作某栏目 */
  function canAccessModule(mod: string): boolean {
    const allowed = allowedModules.value
    return allowed === 'ALL' || allowed.includes(mod)
  }

  /** 是否可审核某篇稿件（范围限制） */
  function canAuditArticle(article: { unit?: string }): boolean {
    if (!canAudit.value) return false
    return auditScope.value === 'ALL' || article.unit === unit.value
  }

  function persistUser() {
    if (user.value) localStorage.setItem('auth_user', JSON.stringify(user.value))
  }

  async function login(u: string, pass: string): Promise<boolean> {
    try {
      const res: AuthLoginRes = await apiAuth.login({ username: u, password: pass })
      token.value = res.token
      user.value = res.user
      localStorage.setItem('auth_token', res.token)
      persistUser()
      return true
    } catch {
      // 后端不可用时仅保留超级管理员演示账号，权限按全权限处理
      if (u === 'admin' && pass === 'admin123') {
        token.value = btoa(`${u}:${pass}`)
        user.value = {
          id: 1,
          username: u,
          name: '演示管理员',
          role: '大队',
          level: '大队',
          unit: '支队办公室',
          canWrite: true,
          canAudit: true,
          canOfficeDirect: true,
          canManageUsers: true,
          auditScope: 'ALL',
          allowedModules: 'ALL',
        }
        localStorage.setItem('auth_token', token.value)
        persistUser()
        return true
      }
      return false
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  function setCrossNet(v: boolean) {
    crossNetEnabled.value = v
    localStorage.setItem('cross_net', v ? '1' : '0')
  }

  return {
    token,
    user,
    isLoggedIn,
    username,
    displayName,
    role,
    roleLabel,
    unit,
    canWrite,
    canAudit,
    canOfficeDirect,
    canManageUsers,
    auditScope,
    allowedModules,
    canAccessModule,
    canAuditArticle,
    persistUser,
    login,
    logout,
    setCrossNet,
    crossNetEnabled,
  }
})
