/**
 * 简易 JSON 文件数据库
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { seedData } from '../seed.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = join(__dirname, '../../data/db.json')

export interface Article {
  id: number
  category: string
  subCategory?: string
  title: string
  summary?: string
  content?: string
  author?: string
  source?: string
  location?: string
  cover?: string
  status?: string
  order?: number
  date: string
  created_at: string
  updated_at: string
}

export interface Leader {
  id: number
  name: string
  position: string
  content: string
  color?: string
  date: string
  created_at: string
}

export interface Ranking {
  id: number
  unit: string
  count: number
  month?: string
  created_at: string
}

export interface Notice {
  id: number
  title: string
  url?: string
  date: string
  created_at: string
}

export interface Banner {
  id: number
  title: string
  description?: string
  bg: string
  order: number
  created_at: string
}

export interface User {
  id: number
  username: string
  password: string
  role: string
  created_at: string
}

export interface DataSchema {
  articles: Article[]
  leaders: Leader[]
  rankings: Ranking[]
  notices: Notice[]
  banners: Banner[]
  users: User[]
}

function defaultData(): DataSchema {
  return {
    articles: [], leaders: [], rankings: [], notices: [], banners: [], users: [],
  }
}

// 模块级数据 — 启动时从文件加载
export let db: DataSchema = defaultData()

export function initDb(): void {
  if (!existsSync(dataFile)) {
    console.log(`⚠️  db.json 不存在，使用种子数据初始化: ${dataFile}`)
    db = JSON.parse(JSON.stringify(seedData)) as DataSchema
    persist()
    return
  }
  try {
    const raw = readFileSync(dataFile, 'utf-8')
    db = JSON.parse(raw) as DataSchema
    // 确保所有 key 存在
    const def = defaultData()
    for (const key of Object.keys(def) as Array<keyof DataSchema>) {
      if (!db[key]) db[key] = def[key]
    }
    console.log(`✅ 数据库已加载: articles=${db.articles.length} banners=${db.banners.length} notices=${db.notices.length} leaders=${db.leaders.length} rankings=${db.rankings.length}`)
  } catch (e) {
    console.error('❌ db.json 读取失败:', e)
    db = defaultData()
  }
}

export function persist(): void {
  writeFileSync(dataFile, JSON.stringify(db, null, 2), 'utf-8')
}
