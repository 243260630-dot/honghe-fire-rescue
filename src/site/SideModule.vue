<template>
  <Panel>
    <PanelHeader :title="title" :accent="accent" :more="more" @more="$emit('more')" />
    <div class="mt-2">
      <ArticleList :items="items" @open="$emit('open', $event)" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { SiteArticle } from './siteData'
import Panel from './Panel.vue'
import PanelHeader from './PanelHeader.vue'
import ArticleList from './ArticleList.vue'

withDefaults(defineProps<{ title: string; items: SiteArticle[]; accent?: boolean; more?: boolean }>(), {
  accent: false,
  more: false,
})
defineEmits<{ more: []; open: [article: SiteArticle] }>()
</script>
