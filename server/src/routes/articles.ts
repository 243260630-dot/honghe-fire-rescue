import { Router } from 'express'
import { db, persist, type Article } from '../db/index.js'

const router = Router()

// 列表
router.get('/', (req, res) => {
  const { category, subCategory, limit, keyword } = req.query as Record<string, string>
  let list = [...db.articles]

  if (category) list = list.filter(a => a.category === category)
  if (subCategory) list = list.filter(a => a.subCategory === subCategory)
  if (keyword) {
    const k = keyword.toLowerCase()
    list = list.filter(a => a.title.toLowerCase().includes(k))
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
    category: body.category || 'news',
    subCategory: body.subCategory,
    title: body.title || '',
    summary: body.summary,
    content: body.content,
    author: body.author,
    source: body.source,
    location: body.location,
    cover: body.cover,
    status: body.status,
    order: body.order,
    date: body.date || now.slice(0, 10),
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
