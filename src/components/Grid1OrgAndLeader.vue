<template>
  <div class="grid-1">
    <!-- 机关动态 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">机关动态</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in orgNews" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 领导批示 (侧栏 320px) -->
    <div class="card leader-sidebar">
      <div class="module-header">
        <h3 class="module-title">领导批示</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <div class="leaders">
        <div v-for="(l, i) in leaders" :key="i" class="leader-item">
          <div class="leader-avatar" :style="{ background: l.color }">
            {{ l.name.charAt(0) }}
          </div>
          <div class="leader-body">
            <div class="leader-meta">
              <span class="leader-name">{{ l.name }}</span>
              <span class="leader-position">{{ l.position }}</span>
            </div>
            <p class="leader-quote">"{{ l.content }}"</p>
            <span class="leader-date">{{ l.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '../stores/home'

const store = useHomeStore()

// FALLBACK — 离线开发时兜底
const orgNewsFallback = [
  { title: '支队召开党委扩大会研究部署四季度工作', date: '11-03', url: '#' },
  { title: '机关组织开展主题教育专题学习研讨', date: '11-02', url: '#' },
  { title: '支队机关工会组织开展文体活动', date: '10-31', url: '#' },
  { title: '政治部组织干部选拔任用公示', date: '10-29', url: '#' },
  { title: '后勤装备科完成年度物资采购任务', date: '10-27', url: '#' },
  { title: '司令部组织开展战训参谋业务培训', date: '10-25', url: '#' },
]

const leadersFallback = [
  {
    name: '张政委', position: '红河州消防救援支队政委',
    content: '要切实做好冬季火灾防控工作，确保全州消防安全形势持续稳定。',
    date: '2026-11-02',
    color: 'linear-gradient(135deg, #e8541e, #c44412)'
  },
  {
    name: '李支队长', position: '红河州消防救援支队支队长',
    content: '加强实战化训练，提升队伍战斗力，随时准备处置各类急难险重任务。',
    date: '2026-10-28',
    color: 'linear-gradient(135deg, #0e3a72, #1657a8)'
  },
]

const orgNews = computed(() => {
  const src = store.data?.orgNews
  if (!src || src.length === 0) return orgNewsFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})

const leaders = computed(() => {
  const src = store.data?.leaders
  if (!src || src.length === 0) return leadersFallback
  return src.map(l => ({
    name: l.name,
    position: l.position,
    content: l.content,
    date: l.date,
    color: l.color || 'linear-gradient(135deg, #e8541e, #c44412)'
  }))
})
</script>

<style scoped>
.grid-1 {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  margin-bottom: 16px;
}

.leaders {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leader-item {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 6px;
  border-left: 3px solid var(--accent);
}

.leader-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.leader-body { flex: 1; min-width: 0; }

.leader-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.leader-name { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.leader-position { font-size: 12px; color: var(--text-muted); }

.leader-quote {
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 4px;
}

.leader-date { font-size: 11px; color: var(--text-muted); }

@media (max-width: 1024px) {
  .grid-1 { grid-template-columns: 1fr; }
}
</style>
