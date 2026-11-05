// 对齐后端 Article 接口
export type ArticleStatus = '已发布' | '待大队审核' | '办公室直报' | '已退回'

export interface Article {
  id: number
  title: string
  date: string
  unit?: string
  author?: string
  writerId?: number
  auditor?: string
  auditTime?: string
  isNew?: boolean
  category?: string
  module?: ModuleName
  grassrootsTab?: GrassrootsTab
  subCategory?: string
  status?: ArticleStatus
  content?: string
  rejectReason?: string
  docNo?: string
  images?: string[]
  summary?: string
  source?: string
  location?: string
  cover?: string
  order?: number
  created_at: string
  updated_at: string
}

export type Category = '作战训练' | '思想政治' | '战勤保障' | '火灾防控'
export const CATEGORIES: Category[] = ['作战训练', '思想政治', '战勤保障', '火灾防控']

export type ModuleName =
  | '消防要闻'
  | '通知公告'
  | '领导批示'
  | '机关动态'
  | '通报督导'
  | '基层动态'
  | '推荐阅读'
  | '救援速递'
  | '调研专栏'
  | '资料库'
  | '媒体聚焦'
  | '精品文摘'

export const MODULE_NAMES: ModuleName[] = [
  '消防要闻', '通知公告', '领导批示', '机关动态', '通报督导', '基层动态',
  '推荐阅读', '救援速递', '调研专栏', '资料库', '媒体聚焦', '精品文摘',
]

export type GrassrootsTab = '执勤训练' | '队伍管理' | '思想政治' | '后勤保障' | '监督执法' | '宣传教育' | '综合信息'
export const GRASSROOTS_TABS: GrassrootsTab[] = [
  '执勤训练', '队伍管理', '思想政治', '后勤保障', '监督执法', '宣传教育', '综合信息',
]

export const DETACHMENT_DEPTS = [
  '支队办公室', '作战训练处', '政治部', '战勤保障处', '防火监督处', '纪检督察室', '新闻宣传处',
]

export const BRIGADE_UNITS = [
  '蒙自市消防大队', '开远市消防大队', '个旧市消防大队', '弥勒市消防大队',
  '建水县消防大队', '石屏县消防大队', '泸西县消防大队', '红河县消防大队',
  '元阳县消防大队', '绿春县消防大队', '金平县消防大队', '河口县消防大队', '屏边县消防大队',
]

export type Unit = typeof DETACHMENT_DEPTS[number] | typeof BRIGADE_UNITS[number]

// Ranking
export interface RankingEntry {
  id: number
  unit: string
  count: number
  submitted?: number
  rank?: number
  month?: string
  created_at?: string
}

// Banner
export interface HeroBannerConfig {
  id: number
  title?: string
  caption?: string
  description?: string
  img: string
  bg?: string
  articleId?: number
  order: number
  created_at?: string
}

// Announcement / Notice
export interface AnnouncementItem {
  id: number
  text: string
  date: string
  active?: boolean
  issuer?: string
  url?: string
  created_at?: string
}

// External Link
export interface ExternalLinkItem {
  id: number
  name: string
  href: string
  desc?: string
  position?: 'top' | 'footer' | 'both'
  crossNet?: boolean
  created_at?: string
}

// Diary Event
export interface DiaryEvent {
  id: number
  date: string
  tag: string
  unit: string
  text: string
  created_at?: string
}

// Leader
export interface Leader {
  id: number
  name: string
  position: string
  content: string
  color?: string
  date: string
  created_at?: string
}

// Auth
export interface AdminUser {
  id: number
  username: string
  password?: string
  name?: string
  role: '支队' | '大队' | '支队级' | '大队级'
  level?: '支队' | '大队'
  unit: string
  /** 权限：可撰稿 */
  canWrite?: boolean
  /** 权限：可审核 */
  canAudit?: boolean
  /** 权限：办公室直报（跳过审核） */
  canOfficeDirect?: boolean
  /** 权限：可管理外链与跨网配置 */
  canManageUsers?: boolean
  /** 审核范围：ALL 全类型 / UNIT_ONLY 仅本单位 */
  auditScope?: 'ALL' | 'UNIT_ONLY'
  /** 可操作栏目：ALL 或指定模块数组 */
  allowedModules?: ModuleName[] | 'ALL'
  created_at?: string
}

export interface AuthLoginReq {
  username: string
  password: string
}

export interface AuthLoginRes {
  token: string
  user: AdminUser
}

// Upload
export interface UploadRes {
  url: string
  filename: string
}
