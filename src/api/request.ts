/**
 * 统一 API 客户端 — 对接 Express 后端
 */
import axios from 'axios'
import type {
  Article, ArticleStatus, Category, ModuleName, GrassrootsTab,
  RankingEntry, HeroBannerConfig, AnnouncementItem, ExternalLinkItem, DiaryEvent,
  AuthLoginReq, AuthLoginRes, UploadRes,
} from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API Error:', err.message)
    return Promise.reject(err)
  },
)

// ─── Auth ───
export const apiAuth = {
  login: (data: AuthLoginReq) => request.post<any, AuthLoginRes>('/auth/login', data),
}

// ─── Articles ───
export interface ArticleListParams {
  module?: ModuleName
  category?: Category
  grassrootsTab?: GrassrootsTab
  status?: ArticleStatus
  unit?: string
  q?: string
  limit?: number
  [k: string]: any
}

export const apiArticles = {
  list: (params?: ArticleListParams) => request.get<any, Article[]>('/articles', { params }),
  get: (id: number) => request.get<any, Article>(`/articles/${id}`),
  create: (data: Partial<Article>) => request.post<any, Article>('/articles', data),
  update: (id: number, data: Partial<Article>) => request.put<any, Article>(`/articles/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/articles/${id}`),
}

// ─── Banners / Hero ───
export const apiBanners = {
  list: () => request.get<any, HeroBannerConfig[]>('/banners'),
  create: (data: Partial<HeroBannerConfig>) => request.post<any, HeroBannerConfig>('/banners', data),
  update: (id: number, data: Partial<HeroBannerConfig>) => request.put<any, HeroBannerConfig>(`/banners/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/banners/${id}`),
}

// ─── Announcements / Notices ───
export const apiNotices = {
  list: () => request.get<any, AnnouncementItem[]>('/notices'),
  create: (data: Partial<AnnouncementItem>) => request.post<any, AnnouncementItem>('/notices', data),
  update: (id: number, data: Partial<AnnouncementItem>) => request.put<any, AnnouncementItem>(`/notices/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/notices/${id}`),
}

// ─── External Links ───
export const apiExternalLinks = {
  list: () => request.get<any, ExternalLinkItem[]>('/external-links'),
  create: (data: Partial<ExternalLinkItem>) => request.post<any, ExternalLinkItem>('/external-links', data),
  update: (id: number, data: Partial<ExternalLinkItem>) => request.put<any, ExternalLinkItem>(`/external-links/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/external-links/${id}`),
}

// ─── Diary Events ───
export const apiDiaryEvents = {
  list: () => request.get<any, DiaryEvent[]>('/diary-events'),
  create: (data: Partial<DiaryEvent>) => request.post<any, DiaryEvent>('/diary-events', data),
  update: (id: number, data: Partial<DiaryEvent>) => request.put<any, DiaryEvent>(`/diary-events/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/diary-events/${id}`),
}

// ─── Rankings ───
export const apiRankings = {
  list: () => request.get<any, RankingEntry[]>('/rankings'),
  create: (data: Partial<RankingEntry>) => request.post<any, RankingEntry>('/rankings', data),
  update: (id: number, data: Partial<RankingEntry>) => request.put<any, RankingEntry>(`/rankings/${id}`, data),
  delete: (id: number) => request.delete<any, { ok: boolean }>(`/rankings/${id}`),
}

// ─── Upload ───
export async function uploadFile(file: File): Promise<UploadRes> {
  const fd = new FormData()
  fd.append('file', file)
  return request.post<any, UploadRes>('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// ─── Home Aggregated ───
export function getHomeData() {
  return request.get<any, any>('/site/home')
}
