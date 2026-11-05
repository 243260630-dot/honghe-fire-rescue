<template>
  <div class="border-b border-border bg-card">
    <div class="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-2">
      <span class="flex shrink-0 items-center gap-1.5 rounded-sm bg-navy/5 px-2 py-1 text-xs font-bold text-navy">
        <span class="text-ember">📢</span> 最新公告
      </span>
      <div class="relative flex-1 overflow-hidden">
        <div class="flex w-max animate-marquee gap-16 whitespace-nowrap text-sm text-foreground/80">
          <span v-for="k in [0, 1]" :key="k" class="flex gap-16">
            <span v-for="a in activeList" :key="`${k}-${a.id}`">{{ a.text }}</span>
          </span>
        </div>
      </div>
      <div class="flex shrink-0 items-center overflow-hidden rounded-sm border border-border">
        <input
          :value="query"
          placeholder="标题、作者"
          class="w-36 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
          @input="$emit('update:query', ($event.target as HTMLInputElement).value)"
          @keydown.enter="$emit('search')"
        />
        <button
          class="h-full bg-navy px-3 py-1.5 text-sm text-white transition-colors hover:bg-ember"
          @click="$emit('search')"
        >
          检索
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AnnouncementItem } from './siteData'

const props = defineProps<{ announcements: AnnouncementItem[]; query: string }>()
defineEmits<{ 'update:query': [value: string]; search: [] }>()

const activeList = computed(() => {
  const list = props.announcements.filter((a) => a.active)
  return list.length > 0
    ? list
    : [{ id: 0, text: '红河州消防救援支队内网门户网站运行正常', date: '', active: true, issuer: '' }]
})
</script>
