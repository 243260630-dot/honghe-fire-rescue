<template>
  <footer class="bg-navy text-white/70">
    <div class="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-4 py-8 text-center">
      <div class="flex items-center gap-3">
        <Emblem :size="40" />
        <div class="text-left">
          <p class="font-serif text-base font-bold text-white">红河州消防救援支队</p>
          <p class="font-display text-xs uppercase tracking-widest text-white/50">
            Honghe Fire Rescue
          </p>
        </div>
      </div>
      <p class="text-xs">版权所有 © 2026 红河州消防救援支队 · 建议使用 1280×800 以上分辨率浏览</p>
      <div class="flex flex-wrap justify-center gap-3 text-xs text-white/50">
        <span v-for="e in topLinks" :key="e.id">{{ e.name }}：{{ e.desc }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { ExternalLinkItem } from './siteData'
import Emblem from './Emblem.vue'

defineProps<{ topLinks: ExternalLinkItem[] }>()
</script>
