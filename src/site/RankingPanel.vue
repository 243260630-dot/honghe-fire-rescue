<template>
  <Panel>
    <PanelHeader title="稿件排名" accent />
    <div class="mt-2 overflow-hidden rounded-sm border border-border">
      <div class="flex items-center justify-between bg-navy px-3 py-1.5 text-xs font-bold text-white">
        <span>{{ month }}</span>
        <button class="font-num hover:text-[#ffd66b]" @click="$emit('more')">更多 &raquo;</button>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-muted text-xs text-muted-foreground">
            <th class="w-12 py-1.5 font-medium">排序</th>
            <th class="py-1.5 text-left font-medium">单位</th>
            <th class="w-14 py-1.5 font-medium">用稿</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="r in ranking.slice(0, 6)"
            :key="r.unit"
            class="border-t border-border/60 transition-colors hover:bg-ember/5"
          >
            <td class="py-1.5 text-center">
              <span
                class="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                :class="r.rank <= 3 ? 'bg-ember text-white' : 'bg-navy/10 text-navy'"
              >
                {{ r.rank }}
              </span>
            </td>
            <td class="py-1.5 text-navy">{{ r.unit }}</td>
            <td class="font-num py-1.5 text-center font-semibold tabular-nums text-ember">
              {{ r.count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { RankingEntry } from './siteData'
import Panel from './Panel.vue'
import PanelHeader from './PanelHeader.vue'

defineProps<{ ranking: RankingEntry[]; month: string }>()
defineEmits<{ more: [] }>()
</script>
