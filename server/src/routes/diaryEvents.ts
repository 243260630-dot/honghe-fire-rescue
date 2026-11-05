import { Router } from 'express'
import { db, persist, type DiaryEvent } from '../db/index.js'

const router = Router()

// 列表，可按 tag / unit 筛选
router.get('/', (req, res) => {
  const { tag, unit } = req.query as Record<string, string | undefined>
  let list = [...db.diaryEvents]
  if (tag) list = list.filter(d => d.tag === tag)
  if (unit) list = list.filter(d => d.unit === unit)
  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  res.json(list)
})

// 创建
router.post('/', (req, res) => {
  const body = req.body as Partial<DiaryEvent>
  const now = new Date().toISOString()
  const maxId = db.diaryEvents.reduce((m, a) => Math.max(m, a.id), 0)
  const item: DiaryEvent = {
    id: maxId + 1,
    date: body.date || now.slice(0, 10),
    text: body.text || '',
    tag: body.tag || '',
    unit: body.unit,
    created_at: now,
  }
  db.diaryEvents.push(item)
  persist()
  res.status(201).json(item)
})

// 更新
router.put('/:id', (req, res) => {
  const idx = db.diaryEvents.findIndex(a => a.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  db.diaryEvents[idx] = { ...db.diaryEvents[idx], ...req.body, id: db.diaryEvents[idx].id }
  persist()
  res.json(db.diaryEvents[idx])
})

// 删除
router.delete('/:id', (req, res) => {
  const before = db.diaryEvents.length
  db.diaryEvents = db.diaryEvents.filter(a => a.id !== Number(req.params.id))
  if (db.diaryEvents.length === before) return res.status(404).json({ error: 'Not found' })
  persist()
  res.json({ ok: true })
})

export default router
