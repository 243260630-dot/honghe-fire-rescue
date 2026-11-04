<template>
  <div class="admin-overview">
    <div class="page-header">
      <h2 class="page-title">数据概览</h2>
      <el-button :icon="Refresh" @click="loadData" :loading="loading">
        刷新
      </el-button>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card" v-for="stat in stats" :key="stat.key">
        <div class="stat-icon" :style="{ background: stat.iconBg }">
          <el-icon :size="28"><component :is="stat.icon" /></el-icon>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ stat.count }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 欢迎信息 -->
    <div class="welcome-card">
      <div class="welcome-left">
        <el-icon :size="40" color="#e8541e"><Promotion /></el-icon>
      </div>
      <div class="welcome-content">
        <h3>欢迎回到红河消防救援管理后台</h3>
        <p>在这里您可以管理网站的所有内容，包括文章、公告、Banner、领导批示和稿件排名。</p>
        <div class="quick-links">
          <el-button type="primary" :icon="Document" size="small" @click="go('/admin/articles')">
            管理文章
          </el-button>
          <el-button :icon="Picture" size="small" @click="go('/admin/banners')">
            管理 Banner
          </el-button>
          <el-button :icon="Bell" size="small" @click="go('/admin/notices')">
            管理公告
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {
  Refresh,
  Document,
  Picture,
  Bell,
  Trophy,
  Promotion,
} from '@element-plus/icons-vue'
import { useHashRoute } from '../utils/router'

const route = useHashRoute()

const loading = ref(false)

const stats = reactive([
  { key: 'articles', label: '文章总数', count: 0, icon: Document, iconBg: 'linear-gradient(135deg, #e8541e, #c44412)', api: '/api/articles' },
  { key: 'banners', label: 'Banner数量', count: 0, icon: Picture, iconBg: 'linear-gradient(135deg, #0e3a72, #1657a8)', api: '/api/banners' },
  { key: 'notices', label: '公告数量', count: 0, icon: Bell, iconBg: 'linear-gradient(135deg, #ffd66b, #e8a51e)', api: '/api/notices' },
  { key: 'rankings', label: '排名单位数', count: 0, icon: Trophy, iconBg: 'linear-gradient(135deg, #2e7d32, #1b5e20)', api: '/api/rankings' },
])

async function loadData() {
  loading.value = true
  try {
    await Promise.all(
      stats.map(async (stat) => {
        try {
          const res = await axios.get(stat.api)
          // response interceptor returns data, but raw axios may return array directly
          const arr = Array.isArray(res) ? res : res.data || []
          stat.count = arr.length
        } catch {
          stat.count = 0
        }
      })
    )
  } catch (e) {
    console.error(e)
    ElMessage.error('数据加载失败')
  } finally {
    loading.value = false
  }
}

function go(path: string) {
  route.navigate(path)
}

onMounted(loadData)
</script>

<style scoped>
.admin-overview {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #16233a;
}

/* ===== 统计卡片 ===== */
.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-left: 3px solid #0e3a72;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(10, 42, 85, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 42, 85, 0.12);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #0e3a72;
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: #5c6b82;
  margin-top: 2px;
}

/* ===== 欢迎卡片 ===== */
.welcome-card {
  background: #fff;
  border-radius: 6px;
  padding: 28px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(10, 42, 85, 0.06);
}

.welcome-content h3 {
  font-size: 17px;
  font-weight: 600;
  color: #16233a;
  margin-bottom: 8px;
}

.welcome-content p {
  font-size: 14px;
  color: #5c6b82;
  margin-bottom: 16px;
}

.quick-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
