/**
 * Axios 实例 — 统一封装
 */
import axios from 'axios'

export const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API Error:', err.message)
    return Promise.reject(err)
  }
)

// 首页聚合接口
export const getHomeData = () => request.get('/site/home')

// 通用 CRUD
export const api = {
  articles: {
    list: (params?: any) => request.get('/articles', { params }),
    get: (id: number) => request.get(`/articles/${id}`),
    create: (data: any) => request.post('/articles', data),
    update: (id: number, data: any) => request.put(`/articles/${id}`, data),
    delete: (id: number) => request.delete(`/articles/${id}`),
  },
  banners: {
    list: () => request.get('/banners'),
    create: (data: any) => request.post('/banners', data),
    update: (id: number, data: any) => request.put(`/banners/${id}`, data),
    delete: (id: number) => request.delete(`/banners/${id}`),
  },
  notices: {
    list: () => request.get('/notices'),
    create: (data: any) => request.post('/notices', data),
    update: (id: number, data: any) => request.put(`/notices/${id}`, data),
    delete: (id: number) => request.delete(`/notices/${id}`),
  },
  leaders: {
    list: () => request.get('/leaders'),
    create: (data: any) => request.post('/leaders', data),
    update: (id: number, data: any) => request.put(`/leaders/${id}`, data),
    delete: (id: number) => request.delete(`/leaders/${id}`),
  },
  rankings: {
    list: () => request.get('/rankings'),
    create: (data: any) => request.post('/rankings', data),
    update: (id: number, data: any) => request.put(`/rankings/${id}`, data),
    delete: (id: number) => request.delete(`/rankings/${id}`),
  },
}
