<template>
  <div class="admin-layout">
    <!-- 左侧导航栏 -->
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <div class="logo-icon">
          <el-icon :size="28"><Promotion /></el-icon>
        </div>
        <div class="logo-text">
          <div class="logo-title">红河消防救援</div>
          <div class="logo-sub">管理后台</div>
        </div>
      </div>

      <nav class="admin-menu">
        <div
          v-for="item in menuItems"
          :key="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
          @click="handleMenuClick(item)"
        >
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </nav>

      <div class="admin-footer">
        <div class="admin-user">admin</div>
        <el-button type="danger" size="small" text @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-button>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <div class="admin-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DataAnalysis,
  Document,
  Bell,
  Picture,
  User,
  Trophy,
  HomeFilled,
  Promotion,
  SwitchButton,
} from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth'

interface MenuItem {
  path: string
  label: string
  icon: any
  special?: boolean
}

const props = defineProps<{
  currentPath: string
}>()

const emit = defineEmits<{
  (e: 'navigate', path: string): void
}>()

const auth = useAuthStore()

const menuItems: MenuItem[] = [
  { path: '/admin', label: '首页概览', icon: DataAnalysis },
  { path: '/admin/articles', label: '文章管理', icon: Document },
  { path: '/admin/notices', label: '公告管理', icon: Bell },
  { path: '/admin/banners', label: 'Banner管理', icon: Picture },
  { path: '/admin/leaders', label: '领导批示', icon: User },
  { path: '/admin/rankings', label: '稿件排名', icon: Trophy },
  { path: '/', label: '返回前台', icon: HomeFilled, special: true },
]

const normalizedPath = computed(() => {
  const p = props.currentPath
  if (p === '/admin/' || p === '/admin') return '/admin'
  return p
})

function isActive(path: string): boolean {
  if (path === '/') return false
  return normalizedPath.value === path || normalizedPath.value.startsWith(path)
}

function handleMenuClick(item: MenuItem) {
  if (item.path === '/') {
    // 返回前台 — 清除 hash
    window.location.hash = '/'
    return
  }
  emit('navigate', item.path)
}

function handleLogout() {
  auth.logout()
  window.location.hash = '/admin/login'
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f3f7;
}

/* ===== 侧边栏 ===== */
.admin-sidebar {
  width: 200px;
  background: #0e3a72;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.admin-logo {
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 214, 107, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd66b;
  flex-shrink: 0;
}

.logo-title {
  font-size: 15px;
  font-weight: 700;
  color: #ffd66b;
  line-height: 1.3;
}

.logo-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

/* ===== 菜单 ===== */
.admin-menu {
  flex: 1;
  padding: 12px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.2s;
  border-left: 3px solid transparent;
  user-select: none;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.menu-item.active {
  background: rgba(232, 84, 30, 0.15);
  color: #ffd66b;
  border-left-color: #e8541e;
  font-weight: 600;
}

/* ===== Footer ===== */
.admin-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.admin-user {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

/* ===== 内容区 ===== */
.admin-content {
  flex: 1;
  padding: 20px 24px;
  overflow-y: auto;
}
</style>
