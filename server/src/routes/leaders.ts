import { Router } from 'express'
import { db, persist, type Leader } from '../db/index.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(db.leaders.sort((a, b) => b.id - a.id))
})

router.post('/', (req, res) => {
  const body = req.body as Partial<Leader>
  const now = new Date().toISOString()
  const maxId = db.leaders.reduce((m, a) => Math.max(m, a.id), 0)
  const item: Leader = {
    id: maxId + 1,
    name: body.name || '',
    position: body.position || '',
    content: body.content || '',
    color: body.color,
    date: body.date || now.slice(0, 10),
    created_at: now,
  }
  db.leaders.push(item)
  persist()
  res.status(201).json(item)
})

router.put('/:id', (req, res) => {
  const idx = db.leaders.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.leaders[idx] = { ...db.leaders[idx], ...req.body, id: db.leaders[idx].id }
  persist()
  res.json(db.leaders[idx])
})

router.delete('/:id', (req, res) => {
  db.leaders = db.leaders.filter(a => a.id !== Number(req.params.id))
  persist()
  res.json({ ok: true })
})

export default router
