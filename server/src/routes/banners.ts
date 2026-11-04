import { Router } from 'express'
import { db, persist, type Banner } from '../db/index.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(db.banners.sort((a, b) => a.order - b.order))
})

router.post('/', (req, res) => {
  const body = req.body as Partial<Banner>
  const now = new Date().toISOString()
  const maxId = db.banners.reduce((m, a) => Math.max(m, a.id), 0)
  const item: Banner = {
    id: maxId + 1,
    title: body.title || '',
    description: body.description,
    bg: body.bg || 'linear-gradient(135deg, #0e3a72, #e8541e)',
    order: body.order || 0,
    created_at: now,
  }
  db.banners.push(item)
  persist()
  res.status(201).json(item)
})

router.put('/:id', (req, res) => {
  const idx = db.banners.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.banners[idx] = { ...db.banners[idx], ...req.body, id: db.banners[idx].id }
  persist()
  res.json(db.banners[idx])
})

router.delete('/:id', (req, res) => {
  db.banners = db.banners.filter(a => a.id !== Number(req.params.id))
  persist()
  res.json({ ok: true })
})

export default router
