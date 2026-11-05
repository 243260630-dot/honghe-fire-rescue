<template>
  <div class="app-root">
    <!-- ===== Admin 区域 ===== -->
    <template v-if="isAdminRoute">
      <!-- 登录页 -->
      <LoginPage v-if="isLoginRoute" />

      <!-- 已登录：加载后进入 -->
      <AdminLayout
        v-else
        @tab-change="onTabChange"
      >
        <DashboardTab
          v-if="activeTab === 'dashboard'"
          @go-tab="onGoTab"
          @select-module="onSelectModule"
        />
        <SubmitArticleTab
          ref="submitRef"
          v-else-if="activeTab === 'submit'"
        />
        <AuditTab v-else-if="activeTab === 'audit'" />
        <ModulesTab
          v-else-if="activeTab === 'modules'"
          :initial-module="selectedModule"
          @go-submit="onGoTab('submit')"
          @start-edit="onStartEdit"
        />
        <VisualsTab v-else-if="activeTab === 'visuals'" />
        <DiaryTab v-else-if="activeTab === 'diary'" />
        <RankingTab v-else-if="activeTab === 'ranking'" />
        <LinksTab v-else-if="activeTab === 'links'" />
        <div v-else class="p-10 text-center text-[#5c6b82]">未知页面</div>
      </AdminLayout>
    </template>

    <!-- ===== 前台区域 ===== -->
    <template v-else>
      <SitePage />

      <!-- 返回顶部 -->
      <transition name="fade">
        <button
          v-if="showBackTop"
          class="fixed bottom-[60px] right-[30px] z-[100] flex h-11 w-11 items-center justify-center rounded-full bg-ember text-white shadow-[0_4px_12px_rgba(232,84,30,0.3)] transition-all hover:-translate-y-1 hover:bg-ember-600"
          aria-label="返回顶部"
          @click="scrollToTop"
        >
          <span class="text-xl leading-none">↑</span>
        </button>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import { useHashRoute, navigate } from './utils/router'
import { useAuthStore } from './stores/auth'
import { useAdminStore } from './stores/admin'

import LoginPage from './admin/LoginPage.vue'
import AdminLayout from './admin/AdminLayout.vue'
import DashboardTab from './admin/DashboardTab.vue'
import SubmitArticleTab from './admin/SubmitArticleTab.vue'
import AuditTab from './admin/AuditTab.vue'
import ModulesTab from './admin/ModulesTab.vue'
import VisualsTab from './admin/VisualsTab.vue'
import DiaryTab from './admin/DiaryTab.vue'
import RankingTab from './admin/RankingTab.vue'
import LinksTab from './admin/LinksTab.vue'
import type { AdminTab } from './admin/types'
import type { Article } from './types'

import SitePage from './site/SitePage.vue'

const route = useHashRoute()
const auth = useAuthStore()
const admin = useAdminStore()

const path = computed(() => route.hash.value || '/')
const isAdminRoute = computed(() => path.value.startsWith('/admin'))
const isLoginRoute = computed(() => path.value === '/admin/login')

// 路由守卫
watch(
  [isAdminRoute, isLoginRoute, () => auth.isLoggedIn],
  ([adminRoute, loginRoute, loggedIn]) => {
    if (!adminRoute) return
    if (!loginRoute && !loggedIn) {
      navigate('/admin/login')
    } else if (loginRoute && loggedIn) {
      // 已登录访问 /admin/login → 跳到 /admin（但要避免死循环）
      // 只在 hash 真的是 /admin/login 时跳转
      if (route.hash.value === '/admin/login') navigate('/admin')
    }
  },
  { immediate: true },
)

// Tab 切换
const activeTab = ref<AdminTab>('dashboard')
const selectedModule = ref<string>('消防要闻')
const submitRef = ref<InstanceType<typeof SubmitArticleTab> | null>(null)

function onTabChange(tab: AdminTab) {
  activeTab.value = tab
  if (tab === 'dashboard') {
    // Dashboard 每次进来刷新 12 模块网格数据
  }
}

function onGoTab(tab: AdminTab) {
  activeTab.value = tab
}

function onSelectModule(m: string) {
  selectedModule.value = m
}

function onStartEdit(a: Article) {
  // 切到 submit tab 并填充
  activeTab.value = 'submit'
  // 下一 tick 确保组件已渲染
  setTimeout(() => {
    submitRef.value?.startEdit(a)
  }, 0)
}

// 前台返回顶部
const showBackTop = ref(false)
const handleScroll = () => { showBackTop.value = window.scrollY > 300 }
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// admin 页面挂载后拉取数据
watch(
  [isAdminRoute, () => auth.isLoggedIn],
  ([adminRoute, loggedIn]) => {
    if (adminRoute && loggedIn && admin.articles.length === 0) {
      admin.loadAll()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  background: #ffffff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
