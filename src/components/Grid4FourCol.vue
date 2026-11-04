<template>
  <div class="grid-4">
    <!-- 资料库 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">资料库</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in library" :key="i" class="list-item">
          <span class="tag tag-blue">资料</span>
          <a :href="n.url">{{ n.title }}</a>
        </li>
      </ul>
    </div>

    <!-- 媒体聚焦 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">媒体聚焦</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in media" :key="i" class="list-item">
          <span class="tag tag-accent">{{ n.source }}</span>
          <a :href="n.url">{{ n.title }}</a>
        </li>
      </ul>
    </div>

    <!-- 精品文摘 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">精品文摘</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <div class="excerpts">
        <div v-for="(e, i) in excerpts" :key="i" class="excerpt-item">
          <span class="excerpt-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="excerpt-body">
            <a :href="e.url" class="excerpt-title">{{ e.title }}</a>
            <p class="excerpt-summary">{{ e.summary }}</p>
            <span class="excerpt-date">{{ e.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 稿件排名 -->
    <div class="card ranking-card">
      <div class="module-header">
        <h3 class="module-title">稿件排名</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <table class="ranking-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>单位</th>
            <th class="right">用稿</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rankings" :key="i">
            <td>
              <span class="rank-badge" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
            </td>
            <td><a :href="r.url">{{ r.unit }}</a></td>
            <td class="right">{{ r.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '../stores/home'

const store = useHomeStore()

// FALLBACK — 离线开发时兜底
const libraryFallback = [
  { title: '消防法律法规汇编2026版', url: '#' },
  { title: '灭火救援战术手册', url: '#' },
  { title: '消防安全检查指南', url: '#' },
  { title: '应急救援装备操作手册', url: '#' },
  { title: '消防知识科普资料包', url: '#' },
]

const mediaFallback = [
  { source: '央视', title: '红河消防：守护边境安全的逆行者', url: '#' },
  { source: '云南日报', title: '红河州构建多元消防宣传格局', url: '#' },
  { source: '人民网', title: '消防指战员的一天：赴汤蹈火为人民', url: '#' },
  { source: '新华网', title: '红河消防数字化建设成效显著', url: '#' },
]

const excerptsFallback = [
  { title: '《火焰蓝》——写给每一位消防指战员的诗', summary: '献给默默守护的逆行者们', date: '11-03', url: '#' },
  { title: '平凡岗位上的不平凡', summary: '记蒙自大队后勤班班长王某某的一天', date: '10-30', url: '#' },
  { title: '我的消防梦', summary: '一名新消防员的成长心路历程', date: '10-25', url: '#' },
]

const rankingsFallback = [
  { unit: '石屏县消防救援大队', count: 39, url: '#' },
  { unit: '建水县消防救援大队', count: 39, url: '#' },
  { unit: '泸西县消防救援大队', count: 38, url: '#' },
  { unit: '河口县消防救援大队', count: 37, url: '#' },
  { unit: '蒙自市消防救援大队', count: 35, url: '#' },
  { unit: '弥勒市消防救援大队', count: 34, url: '#' },
]

const library = computed(() => {
  const src = store.data?.library
  if (!src || src.length === 0) return libraryFallback
  return src.map(n => ({ title: n.title, url: '#' }))
})

const media = computed(() => {
  const src = store.data?.media
  if (!src || src.length === 0) return mediaFallback
  return src.map(n => ({ source: n.source || '媒体', title: n.title, url: '#' }))
})

const excerpts = computed(() => {
  const src = store.data?.excerpts
  if (!src || src.length === 0) return excerptsFallback
  return src.map(n => ({ title: n.title, summary: n.summary || '', date: n.date, url: '#' }))
})

const rankings = computed(() => {
  const src = store.data?.rankings
  if (!src || src.length === 0) return rankingsFallback
  return src.map(r => ({ unit: r.unit, count: r.count, url: '#' }))
})
</script>

<style scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

/* 标签 */
.tag {
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  flex-shrink: 0;
  margin-right: 6px;
}

.tag-blue { background: linear-gradient(135deg, #1657a8, #0a2a55); color: #fff; }
.tag-accent { background: var(--accent); color: #fff; }

/* 精品文摘 */
.excerpts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.excerpt-item {
  display: flex;
  gap: 10px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 6px;
}

.excerpt-num {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 900;
  color: var(--accent);
  opacity: 0.35;
  line-height: 1;
  flex-shrink: 0;
}

.excerpt-body { flex: 1; min-width: 0; }

.excerpt-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.excerpt-title:hover { color: var(--accent); }

.excerpt-summary {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 4px;
}

.excerpt-date { font-size: 11px; color: var(--text-muted); }

/* 稿件排名表格 */
.ranking-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.ranking-table th {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-align: left;
  padding: 6px 0;
  border-bottom: 1px solid var(--card-border);
}

.ranking-table th.right, .ranking-table td.right { text-align: right; }

.ranking-table td {
  padding: 8px 0;
  border-bottom: 1px solid var(--card-border);
}

.ranking-table tbody tr:last-child td { border-bottom: none; }

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  background: #eaeff5;
  color: var(--text-muted);
}

.rank-1 { background: var(--accent); color: #fff; }
.rank-2 { background: #c0c0c0; color: #fff; }
.rank-3 { background: #cd7f32; color: #fff; }

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-4 { grid-template-columns: 1fr; }
}
</style>
