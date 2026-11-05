import { Router } from 'express'
import { db } from '../db/index.js'

const router = Router()

/** 前台只展示已发布/办公室直报的稿件，待审与退回不对外 */
const isPublic = (status?: string) =>
  !status || status === '已发布' || status === '办公室直报'

// 首页聚合数据（一次请求拿到所有区块）
router.get('/home', (_req, res) => {
  const now = Date.now()

  const sortByDate = <T extends { date: string }>(list: T[]) =>
    [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const { articles, leaders, rankings, notices, banners } = db

  const publicArticles = articles.filter((a) => isPublic(a.status))

  const byModule = (module: string, limit = 6) =>
    sortByDate(publicArticles.filter((a) => a.module === module)).slice(0, limit)

  const byGrassroots = (tab: string, limit = 6) =>
    sortByDate(
      publicArticles.filter((a) => a.module === '基层动态' && a.grassrootsTab === tab),
    ).slice(0, limit)

  const rescueAll = byModule('救援速递', 5)

  res.json({
    banners: [...banners].sort((a, b) => a.order - b.order),
    notices: sortByDate(notices).slice(0, 4),
    mainNews: byModule('消防要闻', 6),
    orgNews: byModule('机关动态', 7),
    supervision: byModule('通报督导', 6),
    recommend: byModule('推荐阅读', 6),
    rescueMain: rescueAll[0] || null,
    rescueList: rescueAll.slice(1),
    research: byModule('调研专栏', 6),
    library: byModule('资料库', 5),
    media: byModule('媒体聚焦', 5),
    excerpts: byModule('精品文摘', 5),
    grassrootsCategories: [
      { key: 'training', name: '执勤训练' },
      { key: 'management', name: '队伍管理' },
      { key: 'politics', name: '思想政治' },
      { key: 'logistics', name: '后勤保障' },
      { key: 'law', name: '监督执法' },
      { key: 'education', name: '宣传教育' },
      { key: 'info', name: '综合信息' },
    ],
    grassrootsNews: {
      training: byGrassroots('执勤训练'),
      management: byGrassroots('队伍管理'),
      politics: byGrassroots('思想政治'),
      logistics: byGrassroots('后勤保障'),
      law: byGrassroots('监督执法'),
      education: byGrassroots('宣传教育'),
      info: byGrassroots('综合信息'),
    },
    leaders: [...leaders].sort((a, b) => b.id - a.id),
    rankings: [...rankings].sort((a, b) => b.count - a.count),
    _generatedAt: new Date(now).toISOString(),
  })
})

router.get('/health', (_req, res) => {
  res.json({
    ok: true,
    collections: {
      articles: db.articles.length,
      leaders: db.leaders.length,
      rankings: db.rankings.length,
      notices: db.notices.length,
      banners: db.banners.length,
      users: db.users.length,
    },
  })
})

export default router
