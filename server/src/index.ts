import express from 'express'
import cors from 'cors'
import { initDb, db } from './db/index.js'
import articleRoutes from './routes/articles.js'
import leaderRoutes from './routes/leaders.js'
import rankingRoutes from './routes/rankings.js'
import noticeRoutes from './routes/notices.js'
import bannerRoutes from './routes/banners.js'
import siteRoutes from './routes/site.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

// 统一响应格式
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// 路由
app.use('/api/articles', articleRoutes)
app.use('/api/leaders', leaderRoutes)
app.use('/api/rankings', rankingRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/banners', bannerRoutes)
app.use('/api/site', siteRoutes)

// 错误处理
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

async function start() {
  await initDb()
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
    console.log(`📊 API docs at http://localhost:${PORT}/api/health`)
  })
}

start()
