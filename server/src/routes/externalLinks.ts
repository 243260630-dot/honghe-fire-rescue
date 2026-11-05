import { Router } from 'express'
import { db, persist, type ExternalLink } from '../db/index.js'

const router = Router()

// 列表
router.get('/', (_req, res) => {
  res.json(db.externalLinks)
})

// 创建
router.post('/', (req, res) => {
  const body = req.body as Partial<ExternalLink>
  const now = new Date().toISOString()
  const maxId = db.externalLinks.reduce((m, a) => Math.max(m, Number(a.id)), 0)
  const item: ExternalLink = {
    id: body.id ?? maxId + 1,
    name: body.name || '',
    href: body.href || '',
    desc: body.desc || '',
    position: body.position || 'footer',
    requireCrossNet: body.requireCrossNet ?? false,
    created_at: now,
  }
  db.externalLinks.push(item)
  persist()
  res.status(201).json(item)
})

// 更新
router.put('/:id', (req, res) => {
  const idx = db.externalLinks.findIndex(a => String(a.id) === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.externalLinks[idx] = { ...db.externalLinks[idx], ...req.body, id: db.externalLinks[idx].id }
  persist()
  res.json(db.externalLinks[idx])
})

// 删除
router.delete('/:id', (req, res) => {
  const before = db.externalLinks.length
  db.externalLinks = db.externalLinks.filter(a => String(a.id) !== req.params.id)
  if (db.externalLinks.length === before) return res.status(404).json({ error: 'Not found' })
  persist()
  res.json({ ok: true })
})

export default router
