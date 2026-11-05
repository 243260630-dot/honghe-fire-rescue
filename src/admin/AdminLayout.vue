<template>
  <div class="admin-shell flex min-h-screen flex-col bg-[#eef2f7]">
    <!-- 顶部标题栏 -->
    <header class="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-[#0a2a55] via-[#0e3a72] to-[#0a2a55] px-6 py-4 text-white shadow-md">
      <div class="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-md bg-gradient-to-br from-[#ffd66b]/20 to-[#e8541e]/20 border border-white/20 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
              <path
                d="M28 4C28 4 36 14 36 24C36 20 40 16 40 10C44 18 46 26 46 32C46 44 38 52 28 52C18 52 10 44 10 32C10 24 14 16 18 10C18 16 22 20 22 24C22 14 28 4 28 4Z"
                fill="#ffd66b"
              />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="font-serif text-xl font-bold tracking-wide text-[#ffd66b]">
                红河消防救援 · 综合内容管理与办公自动化平台
              </h1>
              <span class="rounded-sm border border-white/25 bg-white/10 px-2 py-0.5 text-[11px] text-white/90">
                支队/大队两级权限
              </span>
              <span
                v-if="auth.crossNetEnabled"
                class="rounded-sm bg-[#e8541e] px-2 py-0.5 text-[11px] font-bold text-white"
              >跨网访问已开启</span>
            </div>
            <p class="text-xs text-white/65">
              流程规范：支队各部门或大队上报内容 → 经大队审核后发布至相应模块 · 通知公告（已上会/审核文件）由办公室直接上报
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- 当前账号（只读，权限由账号绑定） -->
          <div class="flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 text-xs">
            <span class="text-white/70">当前账号：</span>
            <span class="font-bold text-white">{{ auth.displayName }}</span>
            <span class="text-white/40">|</span>
            <span class="rounded-sm bg-[#e8541e] px-1.5 py-0.5 text-[10px] font-bold text-white">
              {{ auth.roleLabel }}
            </span>
            <span class="text-white/75">{{ auth.unit }}</span>
          </div>
          <button
            @click="doSwitchAccount"
            class="rounded-sm border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/20"
          >切换账号</button>
          <button
            @click="goHome"
            class="rounded-sm bg-[#e8541e] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#c9430f]"
          >← 返回门户网站主页</button>
        </div>
      </div>
    </header>

    <!-- 主工作区 -->
    <div class="mx-auto flex w-full max-w-[1600px] flex-1">
      <!-- 左侧导航栏 -->
      <aside class="flex w-64 shrink-0 flex-col border-r border-[#dbe3ee] bg-white">
        <div class="border-b border-[#dbe3ee] bg-white p-3.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#0a2a55]">{{ auth.displayName }}</span>
            <span
              :class="[
                'rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white',
                auth.canAudit ? 'bg-[#e8541e]' : 'bg-[#1657a8]',
              ]"
            >{{ auth.canAudit ? '审核与发布' : '内容上报' }}</span>
          </div>
          <div class="mt-2">
            <div class="rounded-sm border border-[#dbe3ee] bg-[#eaeff5]/50 px-2 py-1 text-xs text-[#0a2a55]">
              <div class="text-[10px] text-[#5c6b82]">当前所属</div>
              <div class="font-bold">{{ auth.unit }}</div>
            </div>
          </div>
        </div>

        <nav class="flex-1 space-y-1 overflow-y-auto p-2.5 scroll-soft">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="activeTab = item.id; emit('tab-change', item.id)"
            :class="[
              'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors',
              activeTab === item.id ? 'bg-[#0a2a55] text-white shadow-sm' : 'text-[#16233a]/85 hover:bg-[#0a2a55]/10',
            ]"
          >
            <div>
              <p class="text-sm font-bold leading-tight">{{ item.label }}</p>
              <p
                :class="[
                  'mt-0.5 text-[11px]',
                  activeTab === item.id ? 'text-white/70' : 'text-[#5c6b82]',
                ]"
              >{{ item.sub }}</p>
            </div>
            <span
              v-if="item.badge !== undefined && item.badge > 0"
              :class="[
                'font-num rounded-full px-2 py-0.5 text-xs font-bold',
                item.id === 'audit'
                  ? 'bg-[#e8541e] text-white'
                  : activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#0a2a55]/10 text-[#0a2a55]',
              ]"
            >{{ item.badge }}</span>
          </button>
        </nav>

        <div class="border-t border-[#dbe3ee] p-3 text-xs text-[#5c6b82]">
          <div class="font-medium text-[#0a2a55]">{{ auth.displayName }} · {{ auth.username }}</div>
          <div class="mt-0.5">权限范围：{{ auth.auditScope === 'ALL' ? '全站' : auth.unit }}</div>
          <button
            @click="doSwitchAccount"
            class="mt-1 text-[#e8541e] hover:underline"
          >切换账号 / 退出登录</button>
        </div>
      </aside>

      <!-- 右侧主内容区 -->
      <main class="min-w-0 flex-1 bg-[#eef2f7] p-6">
        <slot :active-tab="activeTab" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAdminStore } from '../stores/admin'
import { navigate } from '../utils/router'
import type { AdminTab } from './types'

const emit = defineEmits<{
  (e: 'tab-change', tab: AdminTab): void
}>()

defineProps<{
  defaultTab?: AdminTab
}>()

const auth = useAuthStore()
const admin = useAdminStore()

const activeTab = ref<AdminTab>('dashboard')

/** 切换账号：清空登录态并回到登录页 */
function doSwitchAccount() {
  auth.logout()
  navigate('/admin/login')
}

function goHome() {
  navigate('/')
}

/** 全部菜单项定义（按账号权限过滤后展示） */
const allNavItems = computed(() => [
  { id: 'dashboard' as const, label: '工作台总览', sub: '全站12模块与数据态势', need: 'none' },
  {
    id: 'submit' as const,
    label: '稿件上报 / 直报',
    sub: auth.canOfficeDirect ? '部门大队报送·办公室直报' : '部门大队报送',
    need: 'write',
  },
  {
    id: 'audit' as const,
    label: '两级审核流转',
    sub: auth.auditScope === 'ALL' ? '待大队审核·发布与退回' : `仅本单范围（${auth.unit}）`,
    need: 'audit',
    badge: admin.pendingArticles.length,
  },
  {
    id: 'modules' as const,
    label: '十二大栏目管理',
    sub: '主页各模块及基层7子栏',
    need: 'audit',
    badge: admin.publishedArticles.length,
  },
  {
    id: 'visuals' as const,
    label: '焦点图与滚动公告',
    sub: '双大图配置·顶栏跑马灯',
    need: 'audit',
  },
  {
    id: 'diary' as const,
    label: '要事日记管理',
    sub: '支队大事记时间轴维护',
    need: 'audit',
    badge: admin.diaryEvents.length,
  },
  { id: 'ranking' as const, label: '稿件排名管理', sub: '13县市大队月度用稿统计', need: 'audit' },
  { id: 'links' as const, label: '外链与跨网访问', sub: '顶底外链·跨网安全网关', need: 'admin' },
])

/** 仅展示当前账号被授予的菜单 */
const navItems = computed(() =>
  allNavItems.value.filter((item) => {
    if (item.need === 'write') return auth.canWrite
    if (item.need === 'audit') return auth.canAudit
    if (item.need === 'admin') return auth.canManageUsers
    return true
  }),
)

// 账号权限变化后，若当前 Tab 不在可访问范围则回到第一个可用 Tab
watch(
  navItems,
  (items) => {
    if (!items.some((i) => i.id === activeTab.value)) {
      activeTab.value = items[0]?.id ?? 'dashboard'
      emit('tab-change', activeTab.value)
    }
  },
  { immediate: true },
)
</script>
