/**
 * 首页数据 Store — 从后端 API 加载
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHomeData } from '../api/request'

export interface Article {
  id: number
  category: string
  subCategory?: string
  title: string
  summary?: string
  date: string
  source?: string
  location?: string
  status?: string
}

export interface Banner {
  id: number
  title: string
  description?: string
  bg: string
  order: number
}

export interface HomeData {
  banners: Banner[]
  notices: Array<{ id: number; title: string; date: string }>
  mainNews: Article[]
  orgNews: Article[]
  supervision: Article[]
  recommend: Article[]
  rescueMain: Article | null
  rescueList: Article[]
  research: Article[]
  library: Article[]
  media: Article[]
  excerpts: Article[]
  grassrootsNews: Record<string, Article[]>
  leaders: Array<{ id: number; name: string; position: string; content: string; color?: string; date: string }>
  rankings: Array<{ id: number; unit: string; count: number }>
  _generatedAt: string
}

export const useHomeStore = defineStore('home', () => {
  const data = ref<HomeData | null>(null)
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (loaded.value && data.value) return data.value
    loading.value = true
    error.value = null
    try {
      data.value = await getHomeData() as unknown as HomeData
      loaded.value = true
      return data.value
    } catch (e: any) {
      error.value = e?.message || '加载失败'
      // 加载失败时返回 null，组件可 fallback 到 mock 数据
      return null
    } finally {
      loading.value = false
    }
  }

  function getOrEmpty<T extends keyof HomeData>(key: T): HomeData[T] | (T extends 'grassrootsNews' ? Record<string, any> : Array<any>) {
    if (!data.value) {
      if (key === 'grassrootsNews') return {} as any
      return [] as any
    }
    return data.value[key]
  }

  return { data, loading, loaded, error, load, getOrEmpty }
})
