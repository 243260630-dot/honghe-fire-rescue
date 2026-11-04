import { Router } from 'express'
import { db, persist, type Ranking } from '../db/index.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(db.rankings.sort((a, b) => b.count - a.count))
})

router.post('/', (req, res) => {
  const body = req.body as Partial<Ranking>
  const now = new Date().toISOString()
  const maxId = db.rankings.reduce((m, a) => Math.max(m, a.id), 0)
  const item: Ranking = {
    id: maxId + 1,
    unit: body.unit || '',
    count: body.count || 0,
    month: body.month,
    created_at: now,
  }
  db.rankings.push(item)
  persist()
  res.status(201).json(item)
})

router.put('/:id', (req, res) => {
  const idx = db.rankings.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.rankings[idx] = { ...db.rankings[idx], ...req.body, id: db.rankings[idx].id }
  persist()
  res.json(db.rankings[idx])
})

router.delete('/:id', (req, res) => {
  db.rankings = db.rankings.filter(a => a.id !== Number(req.params.id))
  persist()
  res.json({ ok: true })
})

export default router
