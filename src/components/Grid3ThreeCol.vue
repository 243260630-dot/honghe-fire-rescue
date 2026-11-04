<template>
  <div class="grid-3">
    <!-- 推荐阅读 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">推荐阅读</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in recommend" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 救援速递 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">救援速递</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <div class="rescue-highlight" :style="{ background: rescueMain.bg }">
        <div class="rescue-time">
          <span>⏱ {{ rescueMain.time }}</span>
          <span class="status-badge" :class="rescueMain.status">{{ rescueMain.statusText }}</span>
        </div>
        <h4 class="rescue-title">{{ rescueMain.title }}</h4>
        <p class="rescue-desc">{{ rescueMain.desc }}</p>
      </div>
      <ul class="item-list" style="margin-top: 10px;">
        <li v-for="(n, i) in rescueList" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 调研专栏 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">调研专栏</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in research" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '../stores/home'

const store = useHomeStore()

// FALLBACK — 离线开发时兜底
const recommendFallback = [
  { title: '习近平总书记关于应急管理重要论述摘编', date: '11-03', url: '#' },
  { title: '新时代消防救援队伍建设的根本遵循', date: '11-01', url: '#' },
  { title: '消防指战员心理健康维护指南', date: '10-28', url: '#' },
  { title: '国内外典型火灾案例分析汇编', date: '10-25', url: '#' },
  { title: '应急救援战术与技术研究', date: '10-20', url: '#' },
]

const rescueMainFallback = {
  time: '2026-11-03 14:32',
  title: '红河州建水县发生山体滑坡 消防紧急救援',
  desc: '出动3车18人，已成功救出3名被困人员',
  status: 'ongoing',
  statusText: '救援中',
  bg: 'linear-gradient(135deg, #0e3a72, #1657a8)'
}

const rescueListFallback = [
  { title: '蒙自市一民房失火 消防成功扑救', date: '11-03 09:15', url: '#' },
  { title: '泸西县消防开展森林灭火行动', date: '11-02 16:48', url: '#' },
  { title: '弥勒市一车辆侧翻 消防紧急施救', date: '11-02 11:20', url: '#' },
]

const researchFallback = [
  { title: '关于红河州高层建筑消防安全管理的调研报告', date: '11-02', url: '#' },
  { title: '边疆少数民族地区消防宣传工作思考', date: '10-28', url: '#' },
  { title: '消防救援队伍职业化建设路径探索', date: '10-25', url: '#' },
  { title: '乡村振兴背景下农村消防工作研究', date: '10-20', url: '#' },
  { title: '智慧消防建设在红河州的实践与思考', date: '10-15', url: '#' },
]

const recommend = computed(() => {
  const src = store.data?.recommend
  if (!src || src.length === 0) return recommendFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})

const rescueMain = computed(() => {
  const src = store.data?.rescueMain as any
  // 检查后端是否已返回适配后的结构（含 time 字段）
  if (src && src.time) return src
  return rescueMainFallback
})

const rescueList = computed(() => {
  const src = store.data?.rescueList
  if (!src || src.length === 0) return rescueListFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})

const research = computed(() => {
  const src = store.data?.research
  if (!src || src.length === 0) return researchFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})
</script>

<style scoped>
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.rescue-highlight {
  border-radius: 6px;
  padding: 16px;
  color: #fff;
  margin-bottom: 4px;
}

.rescue-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.status-badge {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  font-size: 11px;
  font-weight: 600;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.rescue-title {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  line-height: 1.4;
}

.rescue-desc {
  font-size: 13px;
  opacity: 0.85;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-3 { grid-template-columns: 1fr; }
}
</style>
