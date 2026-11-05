import { Router } from 'express'
import multer from 'multer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'

const router = Router()

// 上传目录
const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadDir = join(__dirname, '../../data/uploads')
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true })
}

// multer 配置
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    const ext = file.originalname.split('.').pop() || 'jpg'
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
    cb(null, unique)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('仅支持图片文件 (image/*)'))
      return
    }
    cb(null, true)
  },
})

// POST /api/upload — 单文件上传
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: '未收到文件' })
    return
  }
  const filename = req.file.filename
  const url = `/uploads/${filename}`
  res.json({ url, filename })
})

// multer 错误处理
router.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: '文件大小超过 5MB 限制' })
      return
    }
  }
  res.status(400).json({ error: err.message || '上传失败' })
})

export default router
