/**
 * 简易 JSON 文件数据库
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { seedData } from '../seed.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = join(__dirname, '../../data/db.json')

// ===== 常量定义（与前端 data.ts 对齐）=====
export const CATEGORIES = ['作战训练', '思想政治', '战勤保障', '火灾防控'] as const
export type Category = (typeof CATEGORIES)[number]

export const MODULE_NAMES = [
  '消防要闻',
  '通知公告',
  '领导批示',
  '机关动态',
  '通报督导',
  '基层动态',
  '推荐阅读',
  '救援速递',
  '调研专栏',
  '资料库',
  '媒体聚焦',
  '精品文摘',
] as const
export type ModuleName = (typeof MODULE_NAMES)[number]

export const GRASSROOTS_TABS = ['执勤训练', '队伍管理', '思想政治', '后勤保障', '监督执法', '宣传教育', '综合信息'] as const
export type GrassrootsTab = (typeof GRASSROOTS_TABS)[number]

export const DETACHMENT_DEPTS = [
  '支队办公室',
  '作战训练处',
  '政治部',
  '战勤保障处',
  '防火监督处',
  '纪检督察室',
  '新闻宣传处',
] as const

export const BRIGADE_UNITS = [
  '蒙自市消防大队',
  '开远市消防大队',
  '个旧市消防大队',
  '弥勒市消防大队',
  '建水县消防大队',
  '石屏县消防大队',
  '泸西县消防大队',
  '元阳县消防大队',
  '红河县消防大队',
  '绿春县消防大队',
  '金平县消防大队',
  '屏边县消防大队',
  '河口县消防大队',
  '特勤大队',
] as const

export const ALL_UNITS = [...DETACHMENT_DEPTS, ...BRIGADE_UNITS] as const

// ===== 数据模型 =====
export interface Article {
  id: number
  title: string
  date: string
  category: string                // 稿件类别（四大类之一，用于顶部检索）
  subCategory?: string            // 旧字段保留兼容
  grassrootsTab?: string          // 基层动态子分类（映射到 subCategory）
  module?: string                 // 所属主页模块（MODULE_NAMES 之一）
  unit?: string                   // 报送单位
  author?: string                 // 作者
  writerId?: number
  auditor?: string
  auditTime?: string
  isNew?: boolean
  status?: '已发布' | '待大队审核' | '办公室直报' | '已退回'
  rejectReason?: string
  docNo?: string
  content?: string                // 富文本 HTML
  images?: string[]               // 图片 URL 列表
  summary?: string
  source?: string
  location?: string
  cover?: string
  order?: number
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
  submitted?: number   // 报送数
  count: number        // 采用/已发布用稿数
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
  role: string        // 支队级 / 大队级
  unit?: string
  created_at: string
}

export interface AdminUser {
  id: number
  username: string
  name: string
  unit: string
  level: '支队' | '大队'
  jobTitle: string
  canWrite: boolean
  canAudit: boolean
  canOfficeDirect: boolean
  canManageUsers: boolean
  auditScope: 'ALL' | 'UNIT_ONLY'
  allowedModules: 'ALL' | string[]
  active: boolean
  created_at?: string
}

export interface ExternalLink {
  id: number | string
  name: string
  href: string
  desc: string
  position: 'top' | 'footer' | 'both'
  requireCrossNet: boolean
  created_at?: string
}

export interface DiaryEvent {
  id: number
  date: string
  text: string
  tag: string   // Category
  unit?: string
  created_at?: string
}

export interface DataSchema {
  articles: Article[]
  leaders: Leader[]
  rankings: Ranking[]
  notices: Notice[]
  banners: Banner[]
  users: User[]
  adminUsers: AdminUser[]
  externalLinks: ExternalLink[]
  diaryEvents: DiaryEvent[]
}

function defaultData(): DataSchema {
  return {
    articles: [], leaders: [], rankings: [], notices: [], banners: [], users: [],
    adminUsers: [], externalLinks: [], diaryEvents: [],
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
      if (!db[key]) (db as any)[key] = (def as any)[key]
    }
    console.log(`✅ 数据库已加载: articles=${db.articles.length} banners=${db.banners.length} notices=${db.notices.length} leaders=${db.leaders.length} rankings=${db.rankings.length} adminUsers=${db.adminUsers.length} externalLinks=${db.externalLinks.length} diaryEvents=${db.diaryEvents.length}`)
  } catch (e) {
    console.error('❌ db.json 读取失败:', e)
    db = defaultData()
  }
}

export function persist(): void {
  const dir = dirname(dataFile)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(dataFile, JSON.stringify(db, null, 2), 'utf-8')
}
