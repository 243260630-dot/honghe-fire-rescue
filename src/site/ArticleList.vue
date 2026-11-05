<template>
  <ul :class="dense ? 'divide-y divide-border/60' : 'space-y-0'">
    <li v-for="a in items" :key="a.id">
      <button class="group flex w-full items-center gap-2 py-1.5 text-left" @click="$emit('open', a)">
        <span class="text-ember/70 transition-transform group-hover:translate-x-0.5">▸</span>
        <span class="flex-1 truncate text-sm text-foreground/90 transition-colors group-hover:text-ember">
          {{ a.title }}
        </span>
        <span
          v-if="a.isNew"
          class="rounded-sm bg-ember px-1 text-[9px] font-bold uppercase leading-4 text-white"
        >
          new
        </span>
        <span class="font-num shrink-0 text-xs tabular-nums text-muted-foreground">{{ a.date }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SiteArticle } from './siteData'

withDefaults(defineProps<{ items: SiteArticle[]; dense?: boolean }>(), { dense: false })
defineEmits<{ open: [article: SiteArticle] }>()
</script>
