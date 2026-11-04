import { Router } from 'express'
import { db, persist, type Notice } from '../db/index.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(db.notices.sort((a, b) => b.id - a.id))
})

router.post('/', (req, res) => {
  const body = req.body as Partial<Notice>
  const now = new Date().toISOString()
  const maxId = db.notices.reduce((m, a) => Math.max(m, a.id), 0)
  const item: Notice = {
    id: maxId + 1,
    title: body.title || '',
    url: body.url,
    date: body.date || now.slice(0, 10),
    created_at: now,
  }
  db.notices.push(item)
  persist()
  res.status(201).json(item)
})

router.put('/:id', (req, res) => {
  const idx = db.notices.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.notices[idx] = { ...db.notices[idx], ...req.body, id: db.notices[idx].id }
  persist()
  res.json(db.notices[idx])
})

router.delete('/:id', (req, res) => {
  db.notices = db.notices.filter(a => a.id !== Number(req.params.id))
  persist()
  res.json({ ok: true })
})

export default router
