<template>
  <div class="grid-0">
    <!-- 消防要闻 -->
    <div class="card news-featured">
      <div class="module-header">
        <h3 class="module-title">消防要闻</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <div class="featured-body">
        <div class="main-carousel">
          <el-carousel height="200px" :interval="5000" indicator-position="outside">
            <el-carousel-item v-for="(b, i) in banners" :key="i">
              <div class="carousel-slide" :style="{ background: b.bg }">
                <div class="slide-overlay">
                  <span class="slide-tag">头条</span>
                  <h4 class="slide-title">{{ b.title }}</h4>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="news-lists">
          <ul class="item-list">
            <li v-for="(n, i) in mainNews" :key="i" class="list-item">
              <a :href="n.url">{{ n.title }}</a>
              <span class="date">{{ n.date }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 通知公告 (侧栏 320px) -->
    <div class="card notice-sidebar">
      <div class="module-header">
        <h3 class="module-title">通知公告</h3>
        <a href="#" class="module-more">更多 »</a>
      </div>
      <ul class="item-list">
        <li v-for="(n, i) in notices" :key="i" class="list-item">
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
const bannersFallback = [
  { title: '红河州消防救援支队开展2026年度实战化演练', bg: 'linear-gradient(135deg, #0e3a72, #e8541e)' },
  { title: '消防安全宣传月活动正式启动', bg: 'linear-gradient(135deg, #16233a, #0e3a72)' },
  { title: '新装备列装提升救援能力', bg: 'linear-gradient(135deg, #e8541e, #ffd66b)' },
]

const mainNewsFallback = [
  { title: '红河州召开2026年消防工作联席会议', date: '11-03', url: '#' },
  { title: '支队组织开展高层建筑灭火救援演练', date: '11-02', url: '#' },
  { title: '蒙自市消防救援大队开展企业消防安全检查', date: '11-02', url: '#' },
  { title: '消防员张某某荣获"最美逆行者"称号', date: '11-01', url: '#' },
  { title: '关于加强冬季火灾防控工作的通知', date: '10-31', url: '#' },
]

const noticesFallback = [
  { title: '关于开展2026年度消防安全重点单位检查工作的通知', date: '11-03', url: '#' },
  { title: '关于开展2026年度消防执法质量考评的通知', date: '11-01', url: '#' },
  { title: '红河州消防救援支队关于选拔干部的通知', date: '10-30', url: '#' },
  { title: '关于组织参加全国消防知识竞赛的通知', date: '10-28', url: '#' },
  { title: '支队机关食堂改造项目招标公告', date: '10-25', url: '#' },
]

const banners = computed(() => {
  const src = store.data?.banners
  if (!src || src.length === 0) return bannersFallback
  return src.map(b => ({ title: b.title, bg: b.bg }))
})

const mainNews = computed(() => {
  const src = store.data?.mainNews
  if (!src || src.length === 0) return mainNewsFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})

const notices = computed(() => {
  const src = store.data?.notices
  if (!src || src.length === 0) return noticesFallback
  return src.map(n => ({ title: n.title, date: n.date, url: '#' }))
})
</script>

<style scoped>
.grid-0 {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  margin-bottom: 16px;
}

.news-featured { padding: 16px; }

.featured-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 16px 14px;
  background: linear-gradient(to top, rgba(22, 35, 58, 0.95), transparent);
  color: #fff;
}

.slide-tag {
  display: inline-block;
  background: var(--accent);
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 2px;
  margin-bottom: 8px;
}

.slide-title {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
}

.news-lists {
  padding-top: 4px;
}

.notice-sidebar .list-item {
  padding: 8px 0;
}

@media (max-width: 1024px) {
  .grid-0 { grid-template-columns: 1fr; }
  .featured-body { grid-template-columns: 1fr; }
}
</style>
