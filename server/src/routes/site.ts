import { Router } from 'express'
import { db } from '../db/index.js'

const router = Router()

// 首页聚合数据（一次请求拿到所有区块）
router.get('/home', (_req, res) => {
  const now = Date.now()

  const sortByDate = <T extends { date: string }>(list: T[]) =>
    [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const { articles, leaders, rankings, notices, banners } = db

  const filterArticles = (category: string, limit = 6, subCategory?: string) =>
    sortByDate(articles.filter(a =>
      a.category === category && (!subCategory || a.subCategory === subCategory)
    )).slice(0, limit)

  res.json({
    banners: banners.sort((a, b) => a.order - b.order),
    notices: sortByDate(notices).slice(0, 4),
    mainNews: filterArticles('news', 5),
    orgNews: filterArticles('org', 6),
    supervision: filterArticles('supervision', 6),
    recommend: filterArticles('recommend', 5),
    rescueMain: filterArticles('rescue', 1)[0] || null,
    rescueList: filterArticles('rescue', 4).slice(1),
    research: filterArticles('research', 5),
    library: filterArticles('library', 5),
    media: filterArticles('media', 4),
    excerpts: filterArticles('excerpt', 4),
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
      training: filterArticles('grassroots', 6, 'training'),
      management: filterArticles('grassroots', 6, 'management'),
      politics: filterArticles('grassroots', 6, 'politics'),
      logistics: filterArticles('grassroots', 6, 'logistics'),
      law: filterArticles('grassroots', 6, 'law'),
      education: filterArticles('grassroots', 6, 'education'),
      info: filterArticles('grassroots', 6, 'info'),
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
