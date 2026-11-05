/**
 * 后台数据 Store — 聚合拉取 6 类资源
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  apiArticles,
  apiBanners,
  apiNotices,
  apiRankings,
  apiExternalLinks,
  apiDiaryEvents,
} from '../api/request'
import type {
  Article,
  HeroBannerConfig,
  AnnouncementItem,
  RankingEntry,
  ExternalLinkItem,
  DiaryEvent,
} from '../types'

export type CrossNetLog = {
  id: number
  time: string
  user: string
  action: string
  ip: string
  status: '已放行' | '待审批'
}

export const useAdminStore = defineStore('admin', () => {
  // 原始数据
  const articles = ref<Article[]>([])
  const banners = ref<HeroBannerConfig[]>([])
  const announcements = ref<AnnouncementItem[]>([])
  const rankings = ref<RankingEntry[]>([])
  const externalLinks = ref<ExternalLinkItem[]>([])
  const diaryEvents = ref<DiaryEvent[]>([])

  const loading = ref(false)

  // 计算属性
  const publishedArticles = computed(() =>
    articles.value.filter(
      (a) => !a.status || a.status === '已发布' || a.status === '办公室直报',
    ),
  )
  const pendingArticles = computed(() =>
    articles.value.filter((a) => a.status === '待大队审核'),
  )
  const officeDirectArticles = computed(() =>
    articles.value.filter((a) => a.status === '办公室直报'),
  )
  const rejectedArticles = computed(() =>
    articles.value.filter((a) => a.status === '已退回'),
  )
  const activeAnnouncements = computed(() =>
    announcements.value.filter((a) => a.active !== false),
  )

  // 模块计数（12 模块 x 已发布/待审）
  const moduleCounts = computed(() => {
    const map: Record<string, { published: number; pending: number }> = {}
    for (const m of [
      '消防要闻', '通知公告', '领导批示', '机关动态', '通报督导', '基层动态',
      '推荐阅读', '救援速递', '调研专栏', '资料库', '媒体聚焦', '精品文摘',
    ]) {
      map[m] = { published: 0, pending: 0 }
    }
    for (const a of articles.value) {
      const m = a.module ?? '消防要闻'
      if (!map[m]) map[m] = { published: 0, pending: 0 }
      if (a.status === '待大队审核') map[m].pending += 1
      else if (a.status !== '已退回') map[m].published += 1
    }
    return map
  })

  async function loadAll() {
    loading.value = true
    try {
      await Promise.all([
        apiArticles.list().then((r) => (articles.value = Array.isArray(r) ? r : [])).catch(() => {}),
        apiBanners.list().then((r) => (banners.value = Array.isArray(r) ? r : [])).catch(() => {}),
        apiNotices.list().then((r) => (announcements.value = Array.isArray(r) ? r : [])).catch(() => {}),
        apiRankings.list().then((r) => (rankings.value = Array.isArray(r) ? r : [])).catch(() => {}),
        apiExternalLinks.list().then((r) => (externalLinks.value = Array.isArray(r) ? r : [])).catch(() => {}),
        apiDiaryEvents.list().then((r) => (diaryEvents.value = Array.isArray(r) ? r : [])).catch(() => {}),
      ])
    } finally {
      loading.value = false
    }
  }

  // ─── 稿件操作 ───
  async function createArticle(payload: Partial<Article>) {
    const a = await apiArticles.create(payload)
    articles.value = [a as Article, ...articles.value]
    return a
  }
  async function updateArticle(id: number, payload: Partial<Article>) {
    const a = await apiArticles.update(id, payload)
    articles.value = articles.value.map((x) => (x.id === id ? (a as Article) : x))
    return a
  }
  async function deleteArticle(id: number) {
    await apiArticles.delete(id)
    articles.value = articles.value.filter((x) => x.id !== id)
  }
  async function approveArticle(id: number) {
    return updateArticle(id, { status: '已发布', rejectReason: undefined })
  }
  async function rejectArticle(id: number, reason: string) {
    return updateArticle(id, { status: '已退回', rejectReason: reason })
  }
  async function batchApprove(ids?: number[]) {
    const targets = ids ?? pendingArticles.value.map((a) => a.id)
    await Promise.all(targets.map((id) => approveArticle(id)))
    return targets.length
  }

  // ─── Banner ───
  async function updateBanner(id: number, payload: Partial<HeroBannerConfig>) {
    const b = await apiBanners.update(id, payload)
    banners.value = banners.value.map((x) => (x.id === id ? (b as HeroBannerConfig) : x))
    return b
  }

  // ─── Announcements ───
  async function createAnnouncement(payload: Partial<AnnouncementItem>) {
    const a = await apiNotices.create(payload)
    announcements.value = [a as AnnouncementItem, ...announcements.value]
    return a
  }
  async function updateAnnouncement(id: number, payload: Partial<AnnouncementItem>) {
    const a = await apiNotices.update(id, payload)
    announcements.value = announcements.value.map((x) => (x.id === id ? (a as AnnouncementItem) : x))
    return a
  }
  async function deleteAnnouncement(id: number) {
    await apiNotices.delete(id)
    announcements.value = announcements.value.filter((x) => x.id !== id)
  }

  // ─── Rankings ───
  async function updateRanking(id: number, payload: Partial<RankingEntry>) {
    const r = await apiRankings.update(id, payload)
    rankings.value = rankings.value.map((x) => (x.id === id ? (r as RankingEntry) : x))
    return r
  }

  // ─── External Links ───
  async function createExternalLink(payload: Partial<ExternalLinkItem>) {
    const l = await apiExternalLinks.create(payload)
    externalLinks.value = [l as ExternalLinkItem, ...externalLinks.value]
    return l
  }
  async function updateExternalLink(id: number, payload: Partial<ExternalLinkItem>) {
    const l = await apiExternalLinks.update(id, payload)
    externalLinks.value = externalLinks.value.map((x) => (x.id === id ? (l as ExternalLinkItem) : x))
    return l
  }
  async function deleteExternalLink(id: number) {
    await apiExternalLinks.delete(id)
    externalLinks.value = externalLinks.value.filter((x) => x.id !== id)
  }

  // ─── Diary ───
  async function createDiary(payload: Partial<DiaryEvent>) {
    const d = await apiDiaryEvents.create(payload)
    diaryEvents.value = [d as DiaryEvent, ...diaryEvents.value]
    return d
  }
  async function updateDiary(id: number, payload: Partial<DiaryEvent>) {
    const d = await apiDiaryEvents.update(id, payload)
    diaryEvents.value = diaryEvents.value.map((x) => (x.id === id ? (d as DiaryEvent) : x))
    return d
  }
  async function deleteDiary(id: number) {
    await apiDiaryEvents.delete(id)
    diaryEvents.value = diaryEvents.value.filter((x) => x.id !== id)
  }

  return {
    // state
    articles, banners, announcements, rankings, externalLinks, diaryEvents,
    loading,
    // computed
    publishedArticles, pendingArticles, officeDirectArticles, rejectedArticles,
    activeAnnouncements, moduleCounts,
    // load
    loadAll,
    // actions
    createArticle, updateArticle, deleteArticle,
    approveArticle, rejectArticle, batchApprove,
    updateBanner,
    createAnnouncement, updateAnnouncement, deleteAnnouncement,
    updateRanking,
    createExternalLink, updateExternalLink, deleteExternalLink,
    createDiary, updateDiary, deleteDiary,
  }
})
