<template>
  <Panel>
    <div class="flex items-center gap-1 border-b-2 border-navy/15">
      <button
        v-for="(t, i) in tabs"
        :key="t.label"
        class="-mb-0.5 border-b-2 px-3 pb-2 font-serif text-base font-bold transition-colors"
        :class="
          i === active
            ? 'border-ember text-ember'
            : 'border-transparent text-muted-foreground hover:text-navy'
        "
        @click="active = i"
      >
        {{ t.label }}
      </button>
    </div>
    <div class="mt-3">
      <ArticleList :items="tabs[active]?.items ?? []" @open="$emit('open', $event)" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SiteArticle } from './siteData'
import Panel from './Panel.vue'
import ArticleList from './ArticleList.vue'

defineProps<{ tabs: Array<{ label: string; items: SiteArticle[] }> }>()
defineEmits<{ open: [article: SiteArticle] }>()

const active = ref(0)
</script>
