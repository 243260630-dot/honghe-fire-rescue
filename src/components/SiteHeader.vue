<template>
  <header class="site-header">
    <!-- ===== Header Banner ===== -->
    <div class="header-banner">
      <div class="banner-bg"></div>
      <div class="banner-content">
        <div class="brand">
          <div class="brand-logo">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#ffd66b" stroke-width="2"/>
              <path d="M50 18 C50 18 38 35 38 50 C38 62 44 70 50 70 C46 62 48 55 50 50 C52 55 54 62 50 70 C56 70 62 62 62 50 C62 35 50 18 50 18 Z"
                    fill="#e8541e"/>
              <polygon points="50,30 53,37 60,37 54,42 56,49 50,45 44,49 46,42 40,37 47,37" fill="#ffd66b"/>
            </svg>
          </div>
          <div class="brand-text">
            <h1 class="brand-cn">红河消防救援</h1>
            <p class="brand-en">Honghe Fire Rescue</p>
            <p class="brand-slogan">对党忠诚 · 纪律严明 · 赴汤蹈火 · 竭诚为民</p>
          </div>
        </div>
        <div class="header-actions">
          <a href="#/admin" class="login-btn" @click="goAdmin">
            <el-icon><User /></el-icon>
            后台管理登录
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- ===== Navigation ===== -->
    <nav class="site-nav">
      <div class="nav-inner">
        <ul class="nav-list">
          <li v-for="(item, idx) in navItems" :key="item.cn"
              :class="{ active: idx === 0 }">
            <a :href="item.url">
              <span class="nav-cn">{{ item.cn }}</span>
              <span class="nav-en">{{ item.en }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- ===== 公告栏 ===== -->
    <div class="notice-bar">
      <span class="notice-label">📢 最新公告</span>
      <div class="notice-scroll">
        <div class="notice-scroll-inner">
          <a v-for="(n, i) in notices" :key="i" :href="n.url" class="notice-item">
            {{ n.title }}
          </a>
        </div>
      </div>
      <a href="#" class="notice-more">更多 »</a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '../stores/home'
import { navigate } from '../utils/router'

const store = useHomeStore()

// 点击"后台管理登录"跳转到后台（已有 token 则直接进后台，否则自动跳登录页）
function goAdmin() {
  navigate('/admin')
}

const navItems = [
  { cn: '首页', en: 'HOME', url: '#' },
  { cn: '作战训练', en: 'TRAINING', url: '#' },
  { cn: '思想政治', en: 'POLITICS', url: '#' },
  { cn: '战勤保障', en: 'SUPPORT', url: '#' },
  { cn: '火灾防控', en: 'PREVENTION', url: '#' },
  { cn: '火灾统计', en: 'STATISTICS', url: '#' },
  { cn: '消防员之家', en: 'FIREMAN HOME', url: '#' },
  { cn: '要事日记', en: 'DIARY', url: '#' },
  { cn: '办公自动化', en: 'OA', url: '#' },
]

// FALLBACK — 离线开发时兜底
const noticesFallback = [
  { title: '关于开展2026年度消防安全重点单位检查工作的通知', url: '#' },
  { title: '红河州消防救援支队2026年第三季度工作汇报', url: '#' },
  { title: '关于组织开展新入职消防员岗前培训的通知', url: '#' },
  { title: '红河州119消防宣传月活动方案', url: '#' },
]

const notices = computed(() => {
  const src = store.data?.notices
  if (!src || src.length === 0) return noticesFallback
  return src.map(n => ({ title: n.title, url: '#' }))
})
</script>

<style scoped>
/* ===== Header Banner ===== */
.header-banner {
  position: relative;
  height: 208px;
  overflow: hidden;
}

.banner-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 85% -20%, rgba(232, 84, 30, 0.5), transparent 45%),
    linear-gradient(to right, #0a2a55 0%, #0e3a72 50%, #0a2a55 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
  height: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.brand-logo {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-cn {
  font-family: var(--font-serif);
  font-size: 30px;
  font-weight: 900;
  line-height: 36px;
  color: var(--gold);
  letter-spacing: 4px;
}

.brand-en {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 2px;
}

.brand-slogan {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 3px;
  margin-top: 4px;
}

.header-actions {
  flex-shrink: 0;
}

.login-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.login-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.login-btn .arrow { font-weight: 400; }

/* ===== Navigation ===== */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--navy-700);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 12px;
}

.nav-list {
  display: flex;
  align-items: center;
}

.nav-list li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 700;
  gap: 1px;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-list li a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-list li.active a {
  background: var(--accent);
  color: #fff;
}

.nav-cn { letter-spacing: 1px; }
.nav-en { font-size: 10px; font-weight: 400; opacity: 0.6; }

/* ===== 公告栏 ===== */
.notice-bar {
  height: 51px;
  background: #fff;
  border-bottom: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
}

.notice-label {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: var(--navy);
  padding: 4px 14px;
  border-radius: 4px;
  flex-shrink: 0;
}

.notice-scroll {
  flex: 1;
  overflow: hidden;
  height: 20px;
}

.notice-scroll-inner {
  animation: scrollNotice 20s linear infinite;
}

@keyframes scrollNotice {
  0%, 20% { transform: translateY(0); }
  25%, 45% { transform: translateY(-20px); }
  50%, 70% { transform: translateY(-40px); }
  75%, 95% { transform: translateY(-60px); }
  100% { transform: translateY(0); }
}

.notice-item {
  display: block;
  height: 20px;
  font-size: 14px;
  color: rgba(22, 35, 58, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notice-more {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.notice-more:hover { color: var(--accent); }

@media (max-width: 768px) {
  .header-banner { height: 140px; }
  .brand-cn { font-size: 22px; letter-spacing: 2px; }
  .brand-en { font-size: 12px; }
  .brand-slogan { display: none; }
  .nav-cn { font-size: 13px; }
  .nav-en { display: none; }
  .nav-list li a { padding: 0 10px; }
}
</style>
