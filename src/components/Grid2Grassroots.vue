<template>
  <div class="grid-2">
    <!-- 基层动态 -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">基层动态</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="tab-btn"
          :class="{ active: activeCat === cat.key }"
          @click="activeCat = cat.key"
        >
          {{ cat.name }}
        </button>
      </div>
      <ul class="item-list" style="margin-top: 12px;">
        <li v-for="(n, i) in currentNews" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 通报督导 (侧栏 320px) -->
    <div class="card">
      <div class="module-header">
        <h3 class="module-title">通报督导</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in supervision" :key="i" class="list-item">
          <a :href="n.url">{{ n.title }}</a>
          <span class="date">{{ n.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHomeStore } from '../stores/home'

const store = useHomeStore()

const activeCat = ref('training')

const categories = [
  { key: 'training', name: '执勤训练' },
  { key: 'management', name: '队伍管理' },
  { key: 'politics', name: '思想政治' },
  { key: 'logistics', name: '后勤保障' },
  { key: 'law', name: '监督执法' },
  { key: 'education', name: '宣传教育' },
  { key: 'info', name: '综合信息' },
]

// FALLBACK — 离线开发时兜底
const newsMapFallback: Record<string, Array<{title: string; date: string; url: string}>> = {
  training: [
    { title: '蒙自大队开展高层建筑灭火救援训练', date: '11-03', url: '#' },
    { title: '建水大队组织水域救援实战演练', date: '11-02', url: '#' },
    { title: '泸西大队开展绳索救援技术考核', date: '10-31', url: '#' },
    { title: '弥勒大队组织重型化工灾害处置训练', date: '10-30', url: '#' },
    { title: '石屏大队开展森林草原火灾扑救训练', date: '10-28', url: '#' },
    { title: '河口大队组织边境地区应急救援演练', date: '10-26', url: '#' },
  ],
  management: [
    { title: '各大队开展条令条例学习月活动', date: '11-02', url: '#' },
    { title: '蒙自大队完成新消防员考核工作', date: '10-31', url: '#' },
    { title: '建水大队开展安全隐患自查自纠', date: '10-29', url: '#' },
    { title: '弥勒大队组织驾驶员安全教育培训', date: '10-27', url: '#' },
    { title: '泸西大队开展正规化建设检查', date: '10-25', url: '#' },
    { title: '元阳大队组织开展内务卫生大检查', date: '10-23', url: '#' },
  ],
  politics: [
    { title: '各大队组织开展主题教育专题党课', date: '11-03', url: '#' },
    { title: '蒙自大队组织开展党史学习教育', date: '11-01', url: '#' },
    { title: '建水大队开展谈心谈话活动', date: '10-30', url: '#' },
    { title: '石屏大队组织参观红色教育基地', date: '10-28', url: '#' },
    { title: '弥勒大队开展"最美消防员"评选活动', date: '10-26', url: '#' },
    { title: '红河大队组织开展意识形态工作培训', date: '10-24', url: '#' },
  ],
  logistics: [
    { title: '各大队完成冬季物资储备工作', date: '11-02', url: '#' },
    { title: '蒙自大队完成营房设施维修改造', date: '10-31', url: '#' },
    { title: '建水大队购置配备新个人防护装备', date: '10-29', url: '#' },
    { title: '泸西大队开展车辆安全检查保养', date: '10-27', url: '#' },
    { title: '弥勒大队推进智慧营区建设', date: '10-25', url: '#' },
    { title: '河口大队完成边境营房配套建设', date: '10-23', url: '#' },
  ],
  law: [
    { title: '蒙自大队开展"双随机、一公开"检查', date: '11-03', url: '#' },
    { title: '建水大队查处一起消防通道堵塞违法行为', date: '11-01', url: '#' },
    { title: '石屏大队开展重点单位消防检查', date: '10-30', url: '#' },
    { title: '泸西大队依法查封一家火灾隐患单位', date: '10-28', url: '#' },
    { title: '弥勒大队开展消防产品专项检查', date: '10-26', url: '#' },
    { title: '各大队完成第三季度执法数据上报', date: '10-24', url: '#' },
  ],
  education: [
    { title: '蒙自大队开展消防知识进学校活动', date: '11-03', url: '#' },
    { title: '建水大队走进社区开展消防宣传', date: '11-01', url: '#' },
    { title: '石屏大队利用新媒体开展消防科普', date: '10-30', url: '#' },
    { title: '泸西大队组织开展消防演练进企业', date: '10-28', url: '#' },
    { title: '弥勒大队制作消防安全宣传片', date: '10-26', url: '#' },
    { title: '河口大队开展边境村寨消防宣传', date: '10-24', url: '#' },
  ],
  info: [
    { title: '支队信息中心完成系统升级改造', date: '11-02', url: '#' },
    { title: '蒙自大队信息化建设取得新进展', date: '10-31', url: '#' },
    { title: '建水大队完成消防大数据平台接入', date: '10-29', url: '#' },
    { title: '泸西大队开展信息化应用培训', date: '10-27', url: '#' },
    { title: '弥勒大队推进智慧消防建设', date: '10-25', url: '#' },
    { title: '各大队完成年度信息安全检查', date: '10-23', url: '#' },
  ],
}

const grassrootsNews = computed(() => {
  const src = store.data?.grassrootsNews
  if (!src || Object.keys(src).length === 0) return null
  const result: Record<string, Array<{title: string; date: string; url: string}>> = {}
  for (const key in src) {
    result[key] = src[key].map(n => ({ title: n.title, date: n.date, url: '#' }))
  }
  return result
})

const currentNews = computed(() => {
  const storeMap = grassrootsNews.value
  if (storeMap && storeMap[activeCat.value] && storeMap[activeCat.value].length > 0) {
    return storeMap[activeCat.value]
  }
  return newsMapFallback[activeCat.value] || []
})

const supervisionFallback = [
  { title: '关于第三季度消防安全检查情况的通报', date: '11-02', url: '#' },
  { title: '关于对蒙自市消防工作的督导意见', date: '10-30', url: '#' },
  { title: '支队督察组对基层单位进行暗访督察', date: '10-28', url: '#' },
  { title: '关于10月份消防执法质量的通报', date: '10-25', url: '#' },
  { title: '关于加强作战训练安全工作的督导通知', date: '10-22', url: '#' },
  { title: '督察通报：个别单位存在安全隐患', date: '10-20', url: '#' },
]

const supervision = computed(() => {
  const src = store.data?.supervision
  if (!src || src.length === 0) return supervisionFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})
</script>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  margin-bottom: 16px;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-bottom: 1px solid var(--card-border);
}

.tab-btn {
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -1px;
}

.tab-btn:hover { color: var(--accent); }

.tab-btn.active {
  color: #fff;
  background: var(--accent);
  border-bottom-color: var(--accent);
  border-radius: 4px 4px 0 0;
}

@media (max-width: 1024px) {
  .grid-2 { grid-template-columns: 1fr; }
}
</style>
