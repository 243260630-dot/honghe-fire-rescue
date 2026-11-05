<template>
  <div class="space-y-4">
    <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe3ee] pb-3">
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            v-for="st in filters"
            :key="st"
            @click="auditFilter = st"
            :class="[
              'rounded-sm px-3 py-1.5 text-xs font-bold transition-colors',
              auditFilter === st
                ? 'bg-[#0a2a55] text-white'
                : 'bg-[#eaeff5] text-[#5c6b82] hover:text-[#0a2a55]',
            ]"
          >{{ st }} ({{ countOf(st) }})</button>
        </div>

        <button
          v-if="auth.canAudit && scopedPending.length > 0"
          @click="handleBatchApprove"
          class="rounded-sm bg-[#e8541e] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#c9430f]"
        >一键全部审核通过 ({{ scopedPending.length }}篇)</button>
      </div>

      <div
        v-if="!auth.canAudit"
        class="mt-3 rounded-sm border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900"
      >
        当前账号未授予审核权限，仅可查看本账号数据范围内的报送进度或修改被退回稿件。如需审核发布，请使用大队级账号登录。
      </div>

      <div class="mt-3 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#dbe3ee] bg-[#eaeff5]/50 text-left text-xs text-[#5c6b82]">
              <th class="px-3 py-2.5 font-medium">稿件标题</th>
              <th class="px-3 py-2.5 font-medium">报送单位/作者</th>
              <th class="px-3 py-2.5 font-medium">目标主页模块</th>
              <th class="px-3 py-2.5 font-medium">四大检索分类</th>
              <th class="px-3 py-2.5 font-medium">流转状态</th>
              <th class="px-3 py-2.5 text-right font-medium">管理操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#dbe3ee]/60">
            <tr v-for="a in filteredArticles" :key="a.id" class="hover:bg-[#eaeff5]/30">
              <td class="max-w-[280px] px-3 py-3">
                <div class="flex items-center gap-2">
                  <img
                    v-if="a.images && a.images.length > 0"
                    :src="a.images[0]"
                    alt=""
                    class="h-8 w-12 shrink-0 rounded border border-[#dbe3ee] object-cover"
                  />
                  <span class="truncate font-medium text-[#16233a]">{{ a.title }}</span>
                </div>
                <span v-if="a.docNo" class="mt-0.5 block text-[11px] text-[#5c6b82]">文号：{{ a.docNo }}</span>
                <span
                  v-if="a.rejectReason"
                  class="mt-1 block rounded-sm bg-red-50 px-2 py-0.5 text-[11px] text-red-700"
                >退回意见：{{ a.rejectReason }}</span>
              </td>
              <td class="px-3 py-3 text-xs text-[#5c6b82]">
                <span class="font-medium text-[#0a2a55]">{{ a.unit ?? '支队机关' }}</span>
                <span v-if="a.author" class="block">撰稿：{{ a.author }}</span>
                <span class="font-num block">{{ a.date }}</span>
              </td>
              <td class="px-3 py-3 text-xs">
                <span class="rounded-sm border border-[#0a2a55]/20 bg-[#0a2a55]/5 px-2 py-0.5 font-medium text-[#0a2a55]">
                  {{ a.module ?? '消防要闻' }}
                </span>
                <span v-if="a.grassrootsTab" class="mt-1 block text-[11px] text-[#5c6b82]">
                  子栏：{{ a.grassrootsTab }}
                </span>
              </td>
              <td class="px-3 py-3 text-xs">
                <span class="rounded-sm bg-[#e8541e]/10 px-2 py-0.5 text-[#e8541e]">{{ a.category }}</span>
              </td>
              <td class="px-3 py-3 text-xs">
                <span :class="statusClass(a.status ?? '已发布')">{{ a.status ?? '已发布' }}</span>
              </td>
              <td class="px-3 py-3 text-right">
                <div class="flex flex-wrap justify-end gap-1.5">
                  <button
                    v-if="(a.status ?? '已发布') === '待大队审核' && auth.canAudit"
                    @click="handleApprove(a.id)"
                    class="rounded-sm bg-[#e8541e] px-2.5 py-1 text-xs font-bold text-white hover:bg-[#c9430f]"
                  >通过发布</button>
                  <button
                    v-if="(a.status ?? '已发布') === '待大队审核' && auth.canAudit"
                    @click="openReject(a.id)"
                    class="rounded-sm border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >退回</button>
                </div>

                <div v-if="rejectingId === a.id" class="mt-2 flex items-center gap-1.5 text-left">
                  <input
                    v-model="rejectReasonInput"
                    placeholder="输入退回修改原因..."
                    class="flex-1 rounded-sm border border-red-300 px-2 py-1 text-xs outline-none"
                    @keyup.enter="handleRejectConfirm"
                  />
                  <button
                    @click="handleRejectConfirm"
                    class="rounded-sm bg-red-600 px-2 py-1 text-xs text-white"
                  >确认退回</button>
                  <button @click="rejectingId = null" class="text-xs text-[#5c6b82]">取消</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredArticles.length === 0">
              <td colspan="6" class="px-3 py-10 text-center text-xs text-[#5c6b82]">当前筛选条件下暂无稿件</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import { useAuthStore } from '../stores/auth'
import type { Article } from '../types'

const admin = useAdminStore()
const auth = useAuthStore()

type FilterState = '全部' | '待大队审核' | '办公室直报' | '已发布' | '已退回'
const filters: FilterState[] = ['全部', '待大队审核', '办公室直报', '已发布', '已退回']
const auditFilter = ref<FilterState>('待大队审核')

const rejectingId = ref<number | null>(null)
const rejectReasonInput = ref('')

/** 按账号审核范围过滤：UNIT_ONLY 仅本单，ALL 全站 */
const scopedArticles = computed(() =>
  auth.auditScope === 'ALL'
    ? admin.articles
    : admin.articles.filter((a) => a.unit === auth.unit),
)

const scopedPending = computed(() =>
  scopedArticles.value.filter((a) => a.status === '待大队审核'),
)

function countOf(st: FilterState) {
  if (st === '全部') return scopedArticles.value.length
  if (st === '已发布') return scopedArticles.value.filter((a) => !a.status || a.status === '已发布').length
  return scopedArticles.value.filter((a) => a.status === st).length
}

const filteredArticles = computed(() => {
  if (auditFilter.value === '全部') return scopedArticles.value
  if (auditFilter.value === '已发布') return scopedArticles.value.filter((a) => !a.status || a.status === '已发布')
  return scopedArticles.value.filter((a) => a.status === auditFilter.value)
})

function statusClass(st: NonNullable<Article['status']>) {
  const base = 'inline-block rounded-sm px-2 py-0.5 font-bold '
  if (st === '已发布') return base + 'bg-emerald-100 text-emerald-800'
  if (st === '办公室直报') return base + 'bg-blue-100 text-blue-800'
  if (st === '待大队审核') return base + 'bg-amber-100 text-amber-800'
  return base + 'bg-red-100 text-red-700'
}

async function handleApprove(id: number) {
  try {
    const target = admin.articles.find((a) => a.id === id)
    await admin.approveArticle(id)
    ElMessage.success(`已审核通过：《${target?.title ?? ''}》`)
  } catch {
    ElMessage.error('审核失败')
  }
}

function openReject(id: number) {
  rejectingId.value = id
  rejectReasonInput.value = ''
}

async function handleRejectConfirm() {
  if (!rejectingId.value) return
  if (!rejectReasonInput.value.trim()) {
    ElMessage.warning('请填写退回修改意见')
    return
  }
  try {
    await admin.rejectArticle(rejectingId.value, rejectReasonInput.value.trim())
    ElMessage.success('稿件已退回原报送部门修改')
    rejectingId.value = null
    rejectReasonInput.value = ''
  } catch {
    ElMessage.error('退回失败')
  }
}

async function handleBatchApprove() {
  try {
    const n = await admin.batchApprove(scopedPending.value.map((a) => a.id))
    ElMessage.success(`已批量审核通过 ${n} 篇待审稿件`)
  } catch {
    ElMessage.error('批量审核失败')
  }
}
</script>
