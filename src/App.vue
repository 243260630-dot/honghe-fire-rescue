<template>
  <div class="app-root">
    <!-- ===== Admin 区域 ===== -->
    <template v-if="isAdminRoute">
      <LoginPage v-if="isLoginRoute" @success="onLoginSuccess" />

      <template v-else-if="auth.isLoggedIn">
        <AdminLayout :currentPath="path" @navigate="route.navigate">
          <AdminOverview v-if="path === '/admin' || path === '/admin/'" />
          <ArticleManage v-else-if="path === '/admin/articles'" />
          <SimpleManage
            v-else-if="path === '/admin/notices'"
            title="公告管理"
            apiPath="notices"
            :columns="noticeColumns"
            :form-fields="noticeFormFields"
          />
          <SimpleManage
            v-else-if="path === '/admin/banners'"
            title="Banner管理"
            apiPath="banners"
            :columns="bannerColumns"
            :form-fields="bannerFormFields"
          />
          <SimpleManage
            v-else-if="path === '/admin/leaders'"
            title="领导批示管理"
            apiPath="leaders"
            :columns="leaderColumns"
            :form-fields="leaderFormFields"
          />
          <SimpleManage
            v-else-if="path === '/admin/rankings'"
            title="稿件排名管理"
            apiPath="rankings"
            :columns="rankingColumns"
            :form-fields="rankingFormFields"
          />
          <div v-else class="not-found">
            <el-result icon="warning" title="页面不存在" sub-title="请检查 URL 或从侧边栏选择页面">
              <template #extra>
                <el-button type="primary" @click="route.navigate('/admin')">返回首页</el-button>
              </template>
            </el-result>
          </div>
        </AdminLayout>
      </template>
    </template>

    <!-- ===== 前台区域（保持原有代码） ===== -->
    <template v-else>
      <SiteHeader />

      <main class="main-wrapper">
        <Grid0News />
        <Grid1OrgAndLeader />
        <Grid2Grassroots />
        <Grid3ThreeCol />
        <Grid4FourCol />
      </main>

      <SiteFooter />

      <!-- 返回顶部 -->
      <transition name="fade">
        <div v-if="showBackTop" class="back-to-top" @click="scrollToTop">
          <el-icon :size="24"><Top /></el-icon>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Top } from '@element-plus/icons-vue'

// ===== Admin 相关 =====
import { useHashRoute } from './utils/router'
import { useAuthStore } from './stores/auth'
import AdminLayout from './admin/AdminLayout.vue'
import LoginPage from './admin/LoginPage.vue'
import AdminOverview from './admin/AdminOverview.vue'
import ArticleManage from './admin/ArticleManage.vue'
import SimpleManage from './admin/SimpleManage.vue'
import type { ColumnDef, FormFieldDef } from './admin/SimpleManage.vue'

const route = useHashRoute()
const auth = useAuthStore()

const path = computed(() => route.hash.value || '/')
const isAdminRoute = computed(() => path.value.startsWith('/admin'))
const isLoginRoute = computed(() => path.value === '/admin/login')

// 路由守卫：未登录访问 admin 非 login 页 → 跳转登录
watch(
  [isAdminRoute, isLoginRoute, () => auth.isLoggedIn],
  ([adminRoute, loginRoute, loggedIn]) => {
    if (adminRoute && !loginRoute && !loggedIn) {
      window.location.hash = '/admin/login'
    }
  },
  { immediate: true }
)

function onLoginSuccess() {
  route.navigate('/admin')
}

// ===== SimpleManage 配置 =====
// --- Notices ---
const noticeColumns: ColumnDef[] = [
  { key: 'title', label: '标题' },
  { key: 'url', label: '链接' },
  { key: 'date', label: '日期', type: 'date' },
]
const noticeFormFields: FormFieldDef[] = [
  { key: 'title', label: '标题', type: 'text', required: true },
  { key: 'url', label: '链接', type: 'text' },
  { key: 'date', label: '日期', type: 'date', required: true },
]

// --- Banners ---
const bannerColumns: ColumnDef[] = [
  { key: 'title', label: '标题' },
  { key: 'description', label: '描述' },
  { key: 'bg', label: '背景', type: 'color' },
  { key: 'order', label: '排序', type: 'number' },
]
const bannerFormFields: FormFieldDef[] = [
  { key: 'title', label: '标题', type: 'text', required: true },
  { key: 'description', label: '描述', type: 'text' },
  { key: 'bg', label: '背景', type: 'color', default: 'linear-gradient(135deg, #0e3a72, #e8541e)' },
  { key: 'order', label: '排序', type: 'number', default: 0 },
]

// --- Leaders ---
const leaderColumns: ColumnDef[] = [
  { key: 'name', label: '姓名' },
  { key: 'position', label: '职务' },
  { key: 'content', label: '批示内容', type: 'textarea' },
  { key: 'color', label: '背景色', type: 'color' },
  { key: 'date', label: '日期', type: 'date' },
]
const leaderFormFields: FormFieldDef[] = [
  { key: 'name', label: '姓名', type: 'text', required: true },
  { key: 'position', label: '职务', type: 'text', required: true },
  { key: 'content', label: '批示内容', type: 'textarea', required: true },
  { key: 'color', label: '背景色', type: 'color', default: 'linear-gradient(135deg, #e8541e, #c44412)' },
  { key: 'date', label: '日期', type: 'date', required: true },
]

// --- Rankings ---
const rankingColumns: ColumnDef[] = [
  { key: 'unit', label: '单位' },
  { key: 'count', label: '稿件数', type: 'number' },
  { key: 'month', label: '月份' },
]
const rankingFormFields: FormFieldDef[] = [
  { key: 'unit', label: '单位', type: 'text', required: true },
  { key: 'count', label: '稿件数', type: 'number', default: 0 },
  { key: 'month', label: '月份', type: 'text', default: new Date().toISOString().slice(0, 7) },
]

// ===== 前台相关（保持原有代码） =====
import { useHomeStore } from './stores/home'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import Grid0News from './components/Grid0News.vue'
import Grid1OrgAndLeader from './components/Grid1OrgAndLeader.vue'
import Grid2Grassroots from './components/Grid2Grassroots.vue'
import Grid3ThreeCol from './components/Grid3ThreeCol.vue'
import Grid4FourCol from './components/Grid4FourCol.vue'

const store = useHomeStore()

const showBackTop = ref(false)
const handleScroll = () => { showBackTop.value = window.scrollY > 300 }
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => {
  store.load()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  background: #ffffff;
}

.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 60px;
  width: 44px;
  height: 44px;
  background: var(--accent, #e8541e);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(232, 84, 30, 0.3);
  z-index: 100;
  transition: all 0.3s;
}

.back-to-top:hover {
  transform: translateY(-4px);
  background: #d14816;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Admin 404 */
.not-found {
  padding: 60px;
  text-align: center;
}
</style>
