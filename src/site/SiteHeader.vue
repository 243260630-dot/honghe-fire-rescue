<template>
  <!-- ============ 头部徽标 ============ -->
  <header class="relative overflow-hidden bg-gradient-to-r from-navy via-navy-700 to-navy text-white">
    <div
      class="pointer-events-none absolute inset-0 opacity-30"
      style="
        background-image: radial-gradient(circle at 85% -20%, rgba(232, 84, 30, 0.5), transparent 45%),
          repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 40px);
      "
    />
    <div class="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-5">
      <Emblem :size="64" />
      <div class="flex-1">
        <h1 class="font-serif text-3xl font-black tracking-[0.08em] text-[#ffd66b] drop-shadow-sm md:text-4xl">
          红河消防救援
        </h1>
        <p class="font-display text-sm font-medium uppercase tracking-[0.35em] text-white/80 md:text-base">
          Honghe Fire Rescue
        </p>
      </div>
      <div class="hidden flex-col items-end gap-2 text-right md:flex">
        <p class="font-serif text-lg font-bold tracking-widest text-white/90">
          对党忠诚 · 纪律严明 · 赴汤蹈火 · 竭诚为民
        </p>
        <div class="flex items-center gap-2">
          <button
            class="flex items-center gap-1.5 rounded-sm border border-white/30 bg-white/10 px-3 py-1 text-xs tracking-wide transition-colors hover:border-ember hover:bg-ember"
            @click="$emit('admin')"
          >
            <span>进入后台管理页面 →</span>
            <span
              v-if="pendingCount > 0"
              class="font-num rounded-full bg-ember px-1.5 py-0.2 text-[10px] font-bold text-white"
            >
              待审 {{ pendingCount }}
            </span>
          </button>
          <a
            href="#/admin"
            target="_blank"
            rel="noreferrer"
            class="rounded-sm border border-white/25 bg-white/5 px-2.5 py-1 text-xs text-white/85 transition-colors hover:border-ember hover:bg-ember hover:text-white"
            title="在新窗口/新页面中打开后台管理平台"
            @click="$emit('admin')"
          >
            新窗口打开 ↗
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ============ 主导航 ============ -->
  <nav class="sticky top-0 z-40 border-y border-white/10 bg-navy-700 shadow-md">
    <ul class="mx-auto flex max-w-[1280px] flex-wrap items-stretch px-2">
      <li v-for="item in NAV" :key="item.name" class="relative">
        <button
          class="relative flex h-12 items-center gap-1.5 px-4 font-serif text-[15px] font-bold tracking-wide transition-colors"
          :class="item.name === activeName ? 'bg-ember text-white' : 'text-white/90 hover:bg-white/10'"
          @click="$emit('nav', item)"
        >
          {{ item.name }}
          <span
            v-if="item.type === 'category'"
            class="text-[10px] text-white/50"
            title="点选自动检索该类稿件"
          >
            ⌕
          </span>
          <span v-if="item.type === 'link'" class="text-[10px] text-white/50">↗</span>
          <span
            v-if="item.name === '办公自动化' && pendingCount > 0"
            class="font-num rounded-full bg-ember px-1.5 text-[10px] leading-4 text-white"
          >
            {{ pendingCount }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { NAV, type NavItem } from './siteData'
import Emblem from './Emblem.vue'

defineProps<{ activeName: string; pendingCount: number }>()
defineEmits<{ admin: []; nav: [item: NavItem] }>()
</script>
