import multer from 'multer'
import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'
import { initDb, db } from './db/index.js'
import articleRoutes from './routes/articles.js'
import leaderRoutes from './routes/leaders.js'
import rankingRoutes from './routes/rankings.js'
import noticeRoutes from './routes/notices.js'
import bannerRoutes from './routes/banners.js'
import siteRoutes from './routes/site.js'
import uploadRoutes from './routes/upload.js'
import authRoutes from './routes/auth.js'
import externalLinkRoutes from './routes/externalLinks.js'
import diaryEventRoutes from './routes/diaryEvents.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// 统一响应格式
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

const __dirname = dirname(fileURLToPath(import.meta.url))

// 静态托管：data/uploads 目录（供上传的图片通过 /uploads/xxx.jpg 访问）
const uploadsDir = join(__dirname, '../data/uploads')
if (existsSync(uploadsDir)) {
  app.use('/uploads', express.static(uploadsDir))
  console.log(`📁 上传文件静态目录已挂载: ${uploadsDir} -> /uploads`)
} else {
  console.log(`📁 上传目录不存在（首次运行时将由 multer 创建）: ${uploadsDir}`)
}

// 健康检查（含上传中间件可用性验证）
app.get('/api/health', (_req, res) => {
  const multerOk = typeof multer === 'function'
  res.json({
    ok: true,
    time: new Date().toISOString(),
    db: {
      articles: db.articles.length,
      banners: db.banners.length,
      notices: db.notices.length,
      leaders: db.leaders.length,
      rankings: db.rankings.length,
      adminUsers: db.adminUsers?.length ?? 0,
      externalLinks: db.externalLinks?.length ?? 0,
      diaryEvents: db.diaryEvents?.length ?? 0,
    },
    multer: { ok: multerOk },
  })
})

// 路由
app.use('/api/articles', articleRoutes)
app.use('/api/leaders', leaderRoutes)
app.use('/api/rankings', rankingRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/banners', bannerRoutes)
app.use('/api/site', siteRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/external-links', externalLinkRoutes)
app.use('/api/diary-events', diaryEventRoutes)

// 生产环境：托管前端构建产物（单服务部署，前后端同域名）
const distDir = join(__dirname, '../../dist')
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
  console.log(`📦 静态资源目录: ${distDir}`)
}

// 错误处理
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

async function start() {
  await initDb()
  const HOST = '0.0.0.0'
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`)
    console.log(`📊 Healthcheck: /api/health`)
  })
}

start()
