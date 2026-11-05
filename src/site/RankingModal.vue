<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
    @click="$emit('close')"
  >
    <div
      class="w-full max-w-xl overflow-hidden rounded-md border border-border bg-card shadow-2xl"
      @click.stop
    >
      <div class="flex items-center justify-between bg-navy px-5 py-3.5 text-white">
        <div>
          <h3 class="font-serif text-base font-bold">全州各县市消防救援大队稿件排行（{{ month }}）</h3>
          <p class="text-xs text-white/60">按大队级后台审核通过并发布的用稿数量实时统计</p>
        </div>
        <button class="text-white/70 hover:text-white" aria-label="关闭" @click="$emit('close')">✕</button>
      </div>
      <div class="max-h-[70vh] overflow-y-auto p-5">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted text-xs text-muted-foreground">
              <th class="w-16 py-2 font-medium">排序</th>
              <th class="py-2 text-left font-medium">单位</th>
              <th class="w-24 py-2 font-medium">报送总量</th>
              <th class="w-24 py-2 font-medium">采用用稿</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/60">
            <tr v-for="r in ranking" :key="r.unit" class="hover:bg-ember/5">
              <td class="py-2 text-center">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                  :class="r.rank <= 3 ? 'bg-ember text-white' : 'bg-navy/10 text-navy'"
                >
                  {{ r.rank }}
                </span>
              </td>
              <td class="py-2 font-medium text-navy">{{ r.unit }}</td>
              <td class="font-num py-2 text-center text-muted-foreground">{{ r.submitted }}</td>
              <td class="font-num py-2 text-center font-bold text-ember">{{ r.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RankingEntry } from './siteData'

defineProps<{ ranking: RankingEntry[]; month: string }>()
defineEmits<{ close: [] }>()
</script>
