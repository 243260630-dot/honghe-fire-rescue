<template>
  <div class="min-h-screen bg-background">
    <SiteHeader
      :active-name="activeName"
      :pending-count="0"
      @admin="openAdmin"
      @nav="handleNav"
    />
    <NoticeBar v-model:query="query" :announcements="announcements" @search="runSearch" />

    <main class="mx-auto min-w-0 max-w-[1180px] px-3 py-4">
      <div v-if="view.kind === 'home'" class="space-y-4">
        <!-- 头条区 -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FeatureCard
              :img="heroHeadline.img"
              :caption="heroHeadline.caption"
              @click="openBanner(heroHeadline, byModule['消防要闻'])"
            />
            <Panel class="flex flex-col">
              <PanelHeader title="消防要闻" more @more="openCategory('作战训练')" />
              <div class="mt-2 flex-1">
                <ArticleList :items="byModule['消防要闻'].slice(0, 7)" @open="openArticle" />
              </div>
            </Panel>
          </div>
          <TabbedPanel :tabs="noticeTabs" @open="openArticle" />
        </div>

        <!-- 机关动态 + 通报督导 -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Panel class="flex flex-col">
              <PanelHeader title="机关动态" more @more="openCategory('思想政治')" />
              <div class="mt-2 flex-1">
                <ArticleList :items="byModule['机关动态'].slice(0, 6)" @open="openArticle" />
              </div>
            </Panel>
            <FeatureCard
              :img="heroAgency.img"
              :caption="heroAgency.caption"
              @click="openBanner(heroAgency, byModule['机关动态'])"
            />
          </div>
          <SideModule
            title="通报督导"
            :items="byModule['通报督导'].slice(0, 6)"
            accent
            more
            @more="openCategory('战勤保障')"
            @open="openArticle"
          />
        </div>

        <!-- 基层动态 + 推荐阅读 -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <GrassrootsPanel :articles="grassrootsArticles" @open="openArticle" />
          <SideModule
            title="推荐阅读"
            :items="byModule['推荐阅读'].slice(0, 6)"
            more
            @more="openCategory('火灾防控')"
            @open="openArticle"
          />
        </div>

        <!-- 救援速递 / 调研专栏 / 资料库 -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SideModule
            title="救援速递"
            :items="byModule['救援速递'].slice(0, 6)"
            accent
            more
            @more="openCategory('战勤保障')"
            @open="openArticle"
          />
          <SideModule
            title="调研专栏"
            :items="byModule['调研专栏'].slice(0, 6)"
            more
            @more="openCategory('思想政治')"
            @open="openArticle"
          />
          <SideModule
            title="资料库"
            :items="byModule['资料库'].slice(0, 6)"
            more
            @more="openCategory('资料库')"
            @open="openArticle"
          />
        </div>

        <!-- 媒体聚焦 / 精品文摘 / 稿件排名 -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SideModule
            title="媒体聚焦"
            :items="byModule['媒体聚焦'].slice(0, 6)"
            more
            @more="openCategory('战勤保障')"
            @open="openArticle"
          />
          <SideModule
            title="精品文摘"
            :items="byModule['精品文摘'].slice(0, 6)"
            more
            @more="openCategory('思想政治')"
            @open="openArticle"
          />
          <RankingPanel :ranking="ranking" :month="rankingMonth" @more="rankingModalOpen = true" />
        </div>
      </div>

      <CatalogView
        v-else-if="view.kind === 'category'"
        :category="catalogCategory"
        :query="catalogQuery"
        :articles="catalogArticles"
        @open="openArticle"
        @select="changeCategory"
        @back="goHome"
      />

      <DiaryView
        v-else-if="view.kind === 'diary'"
        :events="INITIAL_DIARY_EVENTS"
        @back="goHome"
      />
    </main>

    <LinkBar :links="footerLinks" @external="flash(`「${$event}」外链入口 · 通过跨网访问跳转`)" />
    <SiteFooter :top-links="topLinks" />

    <RankingModal
      v-if="rankingModalOpen"
      :ranking="ranking"
      :month="rankingMonth"
      @close="rankingModalOpen = false"
    />
    <Reader v-if="reading" :article="reading" @close="reading = null" />
    <div
      v-if="toast"
      class="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-navy px-5 py-3 text-sm text-white shadow-xl"
    >
      {{ toast }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { useHomeStore } from '../stores/home'
import { navigate } from '../utils/router'
import type { ModuleName } from '../types'

import {
  ALL_ARTICLES,
  GRASSROOTS,
  GRASSROOTS_KEYS,
  GRASSROOTS_TABS,
  HEADLINE_NEWS,
  INITIAL_DIARY_EVENTS,
  INITIAL_EXTERNAL_LINKS,
  INITIAL_HERO_BANNERS,
  INITIAL_RANKING,
  INITIAL_ANNOUNCEMENTS,
  NOTICES,
  DIRECTIVES,
  AGENCY_NEWS,
  SUPERVISION,
  RECOMMENDED,
  RESCUE_EXPRESS,
  RESEARCH,
  LIBRARY_DOCS,
  MEDIA_FOCUS,
  DIGEST,
  type AnnouncementItem,
  type GrassrootsTab,
  type HeroBannerConfig,
  type NavItem,
  type RankingEntry,
  type SiteArticle,
} from './siteData'

import SiteHeader from './SiteHeader.vue'
import NoticeBar from './NoticeBar.vue'
import Panel from './Panel.vue'
import PanelHeader from './PanelHeader.vue'
import ArticleList from './ArticleList.vue'
import FeatureCard from './FeatureCard.vue'
import TabbedPanel from './TabbedPanel.vue'
import GrassrootsPanel from './GrassrootsPanel.vue'
import SideModule from './SideModule.vue'
import RankingPanel from './RankingPanel.vue'
import CatalogView from './CatalogView.vue'
import DiaryView from './DiaryView.vue'
import LinkBar from './LinkBar.vue'
import SiteFooter from './SiteFooter.vue'
import RankingModal from './RankingModal.vue'
import Reader from './Reader.vue'

type View =
  | { kind: 'home' }
  | { kind: 'category'; category: string; query?: string }
  | { kind: 'diary' }

const home = useHomeStore()
const view = ref<View>({ kind: 'home' })
const query = ref('')
const reading = ref<SiteArticle | null>(null)
const rankingModalOpen = ref(false)
const toast = ref<string | null>(null)
let toastTimer: number | undefined

onMounted(() => {
  home.load()
})
onUnmounted(() => window.clearTimeout(toastTimer))

function flash(msg: string) {
  toast.value = msg
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.value = null
  }, 2600)
}

/* ---------- API → 前台数据结构映射 ---------- */
const CATEGORY_BY_MODULE: Record<ModuleName, string> = {
  消防要闻: '作战训练',
  通知公告: '战勤保障',
  领导批示: '思想政治',
  机关动态: '思想政治',
  通报督导: '战勤保障',
  基层动态: '作战训练',
  推荐阅读: '火灾防控',
  救援速递: '作战训练',
  调研专栏: '思想政治',
  资料库: '作战训练',
  媒体聚焦: '战勤保障',
  精品文摘: '思想政治',
}

type ApiArticle = {
  id: number
  title: string
  date: string
  category?: string
  unit?: string
  author?: string
  isNew?: boolean
  status?: string
  content?: string
  images?: string[]
  grassrootsTab?: string
}

function mapArticles(list: ApiArticle[] | undefined | null, module: ModuleName): SiteArticle[] {
  if (!list || list.length === 0) return []
  return list.map((a, i) => ({
    id: a.id ?? i + 1,
    title: a.title,
    date: a.date ?? '',
    unit: a.unit,
    author: a.author,
    isNew: a.isNew,
    category: a.category ?? CATEGORY_BY_MODULE[module],
    module,
    grassrootsTab: a.grassrootsTab as GrassrootsTab | undefined,
    status: a.status as SiteArticle['status'],
    content: a.content,
    images: a.images,
  }))
}

const apiNoticeArticles = computed<SiteArticle[]>(() => {
  const list = home.data?.notices
  if (!list || list.length === 0) return []
  return list.map((n, i) => ({
    id: n.id ?? i + 1,
    title: n.title,
    date: n.date,
    category: '战勤保障',
    module: '通知公告',
    status: '已发布',
  }))
})

const apiLeaderArticles = computed<SiteArticle[]>(() => {
  const list = home.data?.leaders
  if (!list || list.length === 0) return []
  return list.map((l, i) => ({
    id: l.id ?? i + 1,
    title: l.content,
    date: l.date,
    unit: l.position,
    category: '思想政治',
    module: '领导批示',
    status: '已发布',
  }))
})

const announcements = computed<AnnouncementItem[]>(() => {
  const list = home.data?.notices
  if (!list || list.length === 0) return INITIAL_ANNOUNCEMENTS
  return list.map((n, i) => ({
    id: n.id ?? i + 1,
    text: n.title,
    date: n.date,
    active: true,
    issuer: '支队办公室',
  }))
})

const byModule = computed<Record<ModuleName, SiteArticle[]>>(() => {
  const d = home.data
  const mainNews = mapArticles(d?.mainNews, '消防要闻')
  const orgNews = mapArticles(d?.orgNews, '机关动态')
  const supervision = mapArticles(d?.supervision, '通报督导')
  const recommend = mapArticles(d?.recommend, '推荐阅读')
  const rescue = [...mapArticles(d?.rescueMain ? [d.rescueMain] : [], '救援速递'), ...mapArticles(d?.rescueList, '救援速递')]
  const research = mapArticles(d?.research, '调研专栏')
  const library = mapArticles(d?.library, '资料库')
  const media = mapArticles(d?.media, '媒体聚焦')
  const excerpts = mapArticles(d?.excerpts, '精品文摘')
  const notices = apiNoticeArticles.value
  const directives = apiLeaderArticles.value

  return {
    消防要闻: mainNews.length ? mainNews : HEADLINE_NEWS,
    通知公告: notices.length ? notices : NOTICES,
    领导批示: directives.length ? directives : DIRECTIVES,
    机关动态: orgNews.length ? orgNews : AGENCY_NEWS,
    通报督导: supervision.length ? supervision : SUPERVISION,
    基层动态: [],
    推荐阅读: recommend.length ? recommend : RECOMMENDED,
    救援速递: rescue.length ? rescue : RESCUE_EXPRESS,
    调研专栏: research.length ? research : RESEARCH,
    资料库: library.length ? library : LIBRARY_DOCS,
    媒体聚焦: media.length ? media : MEDIA_FOCUS,
    精品文摘: excerpts.length ? excerpts : DIGEST,
  }
})

const grassrootsArticles = computed<SiteArticle[]>(() => {
  const map = home.data?.grassrootsNews
  const out: SiteArticle[] = []
  for (const tab of GRASSROOTS_TABS) {
    const key = GRASSROOTS_KEYS[tab]
    const apiList = map ? map[key] : undefined
    const mapped = mapArticles(apiList, '基层动态')
    const list = mapped.length ? mapped : GRASSROOTS[tab]
    for (const a of list) out.push({ ...a, grassrootsTab: tab })
  }
  return out
})

const heroBanners = computed<HeroBannerConfig[]>(() => {
  const list = home.data?.banners ?? []
  return INITIAL_HERO_BANNERS.map((base, i) => {
    const b = list[i]
    if (!b) return base
    return {
      ...base,
      caption: b.title || base.caption,
      articleId: (b as { articleId?: number }).articleId ?? base.articleId,
    }
  })
})

const heroHeadline = computed(() => heroBanners.value[0] ?? INITIAL_HERO_BANNERS[0])
const heroAgency = computed(() => heroBanners.value[1] ?? INITIAL_HERO_BANNERS[1])

const ranking = computed<RankingEntry[]>(() => {
  const list = home.data?.rankings
  if (!list || list.length === 0) return INITIAL_RANKING
  return [...list]
    .sort((a, b) => b.count - a.count)
    .map((r, i) => ({
      rank: i + 1,
      unit: r.unit,
      submitted: (r as { submitted?: number }).submitted ?? 0,
      count: r.count,
    }))
})

const rankingMonth = computed(() => {
  const first = home.data?.rankings?.[0] as { month?: string } | undefined
  if (!first?.month) return '2026 年 09 月份'
  const [year, month] = first.month.split('-')
  return `${year} 年 ${month} 月份`
})

const noticeTabs = computed(() => [
  { label: '通知公告', items: byModule.value['通知公告'].slice(0, 6) },
  { label: '领导批示', items: byModule.value['领导批示'].slice(0, 6) },
])

const footerLinks = INITIAL_EXTERNAL_LINKS.filter(
  (l) => l.position === 'footer' || l.position === 'both',
)
const topLinks = INITIAL_EXTERNAL_LINKS.filter((l) => l.position === 'top' || l.position === 'both')

const catalogArticles = computed<SiteArticle[]>(() => {
  const merged = [...ALL_ARTICLES, ...Object.values(byModule.value).flat(), ...grassrootsArticles.value]
  const seen = new Set<string>()
  return merged.filter((a) => {
    const key = `${a.module}-${a.title}-${a.date}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
})

const activeName = computed(() => {
  if (view.value.kind === 'home') return '首页'
  if (view.value.kind === 'diary') return '要事日记'
  return view.value.query ? '' : view.value.category
})

const catalogCategory = computed(() =>
  view.value.kind === 'category' ? view.value.category : '',
)
const catalogQuery = computed(() =>
  view.value.kind === 'category' ? view.value.query : undefined,
)

/* ---------- 交互 ---------- */
function openArticle(a: SiteArticle) {
  reading.value = a
}

function openBanner(banner: HeroBannerConfig, fallbackList: SiteArticle[]) {
  const found = catalogArticles.value.find((a) => a.id === banner.articleId) ?? fallbackList[0]
  if (found) reading.value = found
}

function openCategory(category: string) {
  view.value = { kind: 'category', category }
}

function changeCategory(category: string) {
  view.value = { kind: 'category', category }
}

function goHome() {
  view.value = { kind: 'home' }
}

function openAdmin() {
  navigate('/admin')
}

function runSearch() {
  if (!query.value.trim()) return
  view.value = { kind: 'category', category: '全站检索', query: query.value.trim() }
}

function handleNav(item: NavItem) {
  if (item.type === 'home') {
    goHome()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (item.type === 'category') {
    changeCategory(item.name)
  } else if (item.type === 'link') {
    flash(`「${item.name}」为外部系统入口 · 即将通过跨网访问跳转`)
  } else if (item.name === '办公自动化') {
    openAdmin()
  } else if (item.name === '要事日记') {
    view.value = { kind: 'diary' }
  } else {
    goHome()
  }
}
</script>
