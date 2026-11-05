<template>
  <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe3ee] pb-3">
      <div>
        <h3 class="font-serif text-lg font-bold text-[#0a2a55]">全州各大队稿件排名与用稿量统计</h3>
        <p class="text-xs text-[#5c6b82]">对应前端右下角「稿件排名」板块</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-[#5c6b82]">统计月份标题：</span>
        <input
          v-model="rankingMonth"
          class="w-36 rounded-sm border border-[#dbe3ee] px-2.5 py-1 text-xs font-bold text-[#0a2a55] outline-none focus:border-[#e8541e]"
        />
      </div>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-[#dbe3ee] bg-[#eaeff5]/40 text-left text-xs text-[#5c6b82]">
            <th class="w-16 px-3 py-2 font-medium">当前名次</th>
            <th class="px-3 py-2 font-medium">大队名称</th>
            <th class="px-3 py-2 font-medium">主页展示状态</th>
            <th class="px-3 py-2 font-medium">累计上报数</th>
            <th class="px-3 py-2 font-medium">审核采用（用稿数）</th>
            <th class="px-3 py-2 text-right font-medium">用稿核算调整</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#dbe3ee]/60">
          <tr v-for="(r, idx) in sortedRankings" :key="r.unit || r.id" class="hover:bg-[#eaeff5]/20">
            <td class="px-3 py-2.5">
              <span
                :class="[
                  'inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold',
                  r.rank <= 3 ? 'bg-[#e8541e] text-white' : r.rank <= 6 ? 'bg-[#0a2a55] text-white' : 'bg-[#eaeff5] text-[#5c6b82]',
                ]"
              >{{ r.rank }}</span>
            </td>
            <td class="px-3 py-2.5 font-medium text-[#0a2a55]">{{ r.unit }}</td>
            <td class="px-3 py-2.5 text-xs">
              <span
                v-if="r.rank <= 6"
                class="rounded-sm bg-emerald-100 px-2 py-0.5 text-emerald-800"
              >主页前6名直显</span>
              <span v-else class="rounded-sm bg-[#eaeff5] px-2 py-0.5 text-[#5c6b82]">更多榜单展示</span>
            </td>
            <td class="font-num px-3 py-2.5 text-[#5c6b82]">{{ r.submitted ?? 0 }}</td>
            <td class="font-num px-3 py-2.5 font-bold text-[#e8541e]">{{ r.count }}</td>
            <td class="px-3 py-2.5 text-right">
              <div class="inline-flex items-center gap-1">
                <button
                  @click="adj(idx, -1)"
                  class="rounded-sm border border-[#dbe3ee] px-2 py-0.5 text-xs hover:bg-[#eaeff5]"
                >-1</button>
                <button
                  @click="adj(idx, +1)"
                  class="rounded-sm border border-[#e8541e]/40 bg-[#e8541e]/10 px-2 py-0.5 text-xs font-bold text-[#e8541e] hover:bg-[#e8541e] hover:text-white"
                >+1 用稿</button>
              </div>
            </td>
          </tr>
          <tr v-if="admin.rankings.length === 0">
            <td colspan="6" class="px-3 py-10 text-center text-xs text-[#5c6b82]">暂无排名数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'


const admin = useAdminStore()

const rankingMonth = ref(new Date().toISOString().slice(0, 7))

onMounted(async () => {
  if (admin.rankings.length === 0) await admin.loadAll()
})

const sortedRankings = computed(() =>
  [...admin.rankings]
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .map((r, idx) => ({ ...r, rank: idx + 1 })),
)

async function adj(idx: number, delta: number) {
  const r = sortedRankings.value[idx]
  if (!r) return
  const newCount = Math.max(0, (r.count ?? 0) + delta)
  try {
    await admin.updateRanking(r.id, {
      count: newCount,
      submitted: Math.max(r.submitted ?? 0, newCount),
    })
    ElMessage.success(`已调整「${r.unit}」用稿数`)
  } catch { ElMessage.error('调整失败') }
}
</script>
