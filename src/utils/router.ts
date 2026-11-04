/**
 * 简单 hash 路由 — 不引入 vue-router 也能切换前台/后台
 */
import { ref } from 'vue'

const hash = ref<string>(window.location.hash.replace('#', '') || '/')

window.addEventListener('hashchange', () => {
  hash.value = window.location.hash.replace('#', '') || '/'
})

export function useHashRoute() {
  function navigate(path: string) {
    window.location.hash = path
  }

  return { hash, navigate }
}

export function navigate(path: string) {
  window.location.hash = path
}
