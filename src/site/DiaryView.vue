<template>
  <Panel>
    <div class="border-b-2 border-ember/40 pb-3">
      <button class="mb-1 text-xs text-muted-foreground hover:text-ember" @click="$emit('back')">
        ← 返回首页
      </button>
      <h2 class="flex items-center gap-2 font-serif text-2xl font-black text-navy">
        <span class="inline-block h-6 w-2 rounded-sm bg-ember" />
        要事日记
      </h2>
      <p class="mt-1 text-sm text-muted-foreground">支队重要工作、重大活动、重大救援大事记（按时间倒序）</p>
    </div>
    <ol class="mt-5 space-y-5 border-l-2 border-navy/15 pl-6">
      <li v-for="e in events" :key="e.id" class="relative">
        <span class="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-ember bg-card" />
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-num text-sm font-bold tabular-nums text-navy">{{ e.date }}</span>
          <span class="rounded-sm border border-navy/20 bg-navy/5 px-1.5 py-0.5 text-[10px] text-navy">
            {{ e.tag }}
          </span>
          <span
            v-if="e.unit"
            class="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            {{ e.unit }}
          </span>
        </div>
        <p class="mt-1 text-[15px] leading-7 text-foreground/85">{{ e.text }}</p>
      </li>
    </ol>
  </Panel>
</template>

<script setup lang="ts">
import type { DiaryEvent } from './siteData'
import Panel from './Panel.vue'

defineProps<{ events: DiaryEvent[] }>()
defineEmits<{ back: [] }>()
</script>
