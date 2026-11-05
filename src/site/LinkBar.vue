<template>
  <div class="border-t border-border bg-muted">
    <div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-3 px-4 py-5">
      <button
        v-for="l in links"
        :key="l.id"
        class="rounded-sm border border-navy/20 bg-gradient-to-b from-navy-500 to-navy px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:from-ember hover:to-ember-600"
        @click="$emit('external', l.name)"
      >
        {{ l.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExternalLinkItem } from './siteData'

defineProps<{ links: ExternalLinkItem[] }>()
defineEmits<{ external: [name: string] }>()
</script>
