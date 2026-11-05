<template>
  <Panel>
    <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ember/40 pb-3">
      <div>
        <button class="mb-1 text-xs text-muted-foreground hover:text-ember" @click="$emit('back')">
          ← 返回首页
        </button>
        <h2 class="flex items-center gap-2 font-serif text-2xl font-black text-navy">
          <span class="inline-block h-6 w-2 rounded-sm bg-ember" />
          {{ query ? `检索：“${query}”` : category }}
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          {{
            isCat
              ? '点选顶部栏目自动检索该类稿件，以目录方式集中展示'
              : query
                ? '按标题 / 作者 / 单位全站检索'
                : '栏目稿件目录'
          }}
          <span class="ml-2 font-num font-semibold text-ember">共 {{ results.length }} 篇</span>
        </p>
      </div>
      <div v-if="isCat" class="flex gap-1">
        <button
          v-for="c in CATEGORIES"
          :key="c"
          class="rounded-sm border px-2 py-1 text-xs"
          :class="
            c === category
              ? 'border-ember bg-ember text-white'
              : 'border-border text-muted-foreground hover:border-ember hover:text-ember'
          "
          @click="$emit('select', c)"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <div v-if="results.length === 0" class="py-16 text-center text-muted-foreground">
      <p class="text-4xl">🔍</p>
      <p class="mt-3">未检索到相关稿件</p>
    </div>
    <ol v-else class="mt-3 divide-y divide-border/60">
      <li v-for="(a, i) in results" :key="a.id">
        <button class="group flex w-full items-center gap-3 py-2.5 text-left" @click="$emit('open', a)">
          <span class="font-num w-6 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span
            class="shrink-0 rounded-sm border border-navy/20 bg-navy/5 px-1.5 py-0.5 text-[10px] font-medium text-navy"
          >
            {{ a.category }}
          </span>
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
    </ol>
  </Panel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CATEGORIES, type SiteArticle } from './siteData'
import Panel from './Panel.vue'

const props = defineProps<{ category: string; query?: string; articles: SiteArticle[] }>()
defineEmits<{ open: [article: SiteArticle]; select: [category: string]; back: [] }>()

const isCat = computed(() => (CATEGORIES as readonly string[]).includes(props.category))

const results = computed(() => {
  if (props.query) {
    const q = props.query.toLowerCase()
    return props.articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.unit ?? '').toLowerCase().includes(q) ||
        (a.author ?? '').toLowerCase().includes(q),
    )
  }
  return props.articles.filter((a) => a.category === props.category || a.module === props.category)
})
</script>
