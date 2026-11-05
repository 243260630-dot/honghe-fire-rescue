import { Router } from 'express'
import { db, persist, type Article } from '../db/index.js'

const router = Router()

// 列表
router.get('/', (req, res) => {
  const q = req.query as Record<string, string | undefined>
  const { category, subCategory, module, grassrootsTab, unit, status, q: keyword, limit } = q
  let list = [...db.articles]

  if (category) list = list.filter(a => a.category === category)
  if (subCategory) list = list.filter(a => a.subCategory === subCategory)
  if (grassrootsTab) list = list.filter(a => a.grassrootsTab === grassrootsTab)
  if (module) list = list.filter(a => a.module === module)
  if (unit) list = list.filter(a => a.unit === unit)
  if (status) list = list.filter(a => a.status === status)
  if (keyword) {
    const k = keyword.toLowerCase()
    list = list.filter(a =>
      a.title.toLowerCase().includes(k) ||
      (a.content && a.content.toLowerCase().includes(k)) ||
      (a.author && a.author.toLowerCase().includes(k))
    )
  }

  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const lim = limit ? parseInt(limit) : undefined
  if (lim) list = list.slice(0, lim)
  res.json(list)
})

// 详情
router.get('/:id', (req, res) => {
  const a = db.articles.find(x => x.id === Number(req.params.id))
  if (!a) return res.status(404).json({ error: 'Not found' })
  res.json(a)
})

// 创建
router.post('/', (req, res) => {
  const body = req.body as Partial<Article>
  const now = new Date().toISOString()
  const maxId = db.articles.reduce((m, a) => Math.max(m, a.id), 0)
  const article: Article = {
    id: maxId + 1,
    title: body.title || '',
    date: body.date || now.slice(0, 10),
    category: body.category || '',
    subCategory: body.subCategory,
    grassrootsTab: body.grassrootsTab,
    module: body.module,
    unit: body.unit,
    author: body.author,
    writerId: body.writerId,
    auditor: body.auditor,
    auditTime: body.auditTime,
    isNew: body.isNew,
    status: body.status,
    rejectReason: body.rejectReason,
    docNo: body.docNo,
    content: body.content,
    images: body.images,
    summary: body.summary,
    source: body.source,
    location: body.location,
    cover: body.cover,
    order: body.order,
    created_at: now,
    updated_at: now,
  }
  db.articles.push(article)
  persist()
  res.status(201).json(article)
})

// 更新
router.put('/:id', (req, res) => {
  const idx = db.articles.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.articles[idx] = {
    ...db.articles[idx],
    ...req.body,
    id: db.articles[idx].id,
    updated_at: new Date().toISOString(),
  }
  persist()
  res.json(db.articles[idx])
})

// 删除
router.delete('/:id', (req, res) => {
  const before = db.articles.length
  db.articles = db.articles.filter(a => a.id !== Number(req.params.id))
  if (db.articles.length === before) return res.status(404).json({ error: 'Not found' })
  persist()
  res.json({ ok: true })
})

export default router
