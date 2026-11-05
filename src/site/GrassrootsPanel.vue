<template>
  <Panel>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-navy/15 pb-2">
      <h3 class="flex items-center gap-2 font-serif text-lg font-bold text-navy">
        <span class="inline-block h-4 w-1.5 rounded-sm bg-navy" />
        基层动态
      </h3>
      <div class="ml-1 flex flex-wrap gap-1">
        <button
          v-for="t in GRASSROOTS_TABS"
          :key="t"
          class="rounded-sm px-2 py-0.5 text-xs font-medium transition-colors"
          :class="
            t === tab ? 'bg-ember text-white' : 'text-muted-foreground hover:bg-navy/5 hover:text-navy'
          "
          @click="tab = t"
        >
          {{ t }}
        </button>
      </div>
    </div>
    <div class="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
      <ArticleList :items="items.slice(0, half)" @open="$emit('open', $event)" />
      <ArticleList :items="items.slice(half)" @open="$emit('open', $event)" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { GRASSROOTS_TABS, type SiteArticle } from './siteData'
import Panel from './Panel.vue'
import ArticleList from './ArticleList.vue'

const props = defineProps<{ articles: SiteArticle[] }>()
defineEmits<{ open: [article: SiteArticle] }>()

const tab = ref<string>(GRASSROOTS_TABS[0])

const items = computed(() =>
  props.articles.filter((a) => (a.grassrootsTab ?? '执勤训练') === tab.value),
)
const half = computed(() => Math.ceil(items.value.length / 2))
</script>
