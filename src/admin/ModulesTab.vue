<template>
  <div class="space-y-4">
    <!-- 12 栏目切换 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2">
        <p class="text-xs font-bold uppercase tracking-wide text-[#5c6b82]">选择前端主页展示模块（共 12 个模块）</p>
        <button
          @click="$emit('go-submit')"
          class="rounded-sm bg-[#e8541e] px-3 py-1 text-xs font-bold text-white hover:bg-[#c9430f]"
        >+ 在「{{ selectedModule }}」新增图文稿件</button>
      </div>

      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="m in MODULE_NAMES"
          :key="m"
          @click="onModuleClick(m)"
          :class="[
            'rounded-sm border px-3 py-1.5 text-xs font-bold transition-colors',
            selectedModule === m
              ? 'border-[#e8541e] bg-[#e8541e] text-white'
              : 'border-[#dbe3ee] bg-[#eaeff5]/40 text-[#0a2a55] hover:border-[#0a2a55]/40',
          ]"
        >{{ m }} ({{ moduleTotal(m) }})</button>
      </div>

      <!-- 基层动态子栏 -->
      <div
        v-if="selectedModule === '基层动态'"
        class="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#dbe3ee] pt-3"
      >
        <span class="text-xs font-bold text-[#0a2a55]">基层动态子部门：</span>
        <button
          v-for="t in allGrassrootsTabs"
          :key="t"
          @click="selectedGrassrootsTab = t"
          :class="[
            'rounded-sm px-2.5 py-1 text-xs font-medium',
            selectedGrassrootsTab === t
              ? 'bg-[#0a2a55] text-white'
              : 'bg-[#eaeff5] text-[#5c6b82] hover:text-[#0a2a55]',
          ]"
        >{{ t }}</button>
      </div>

      <!-- 四大类筛选 + 搜索 -->
      <div class="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#dbe3ee] pt-3">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-xs text-[#5c6b82]">顶部四大检索归类筛选：</span>
          <button
            v-for="c in allCategories"
            :key="c"
            @click="selectedCatFilter = c"
            :class="[
              'rounded-sm px-2 py-0.5 text-xs',
              selectedCatFilter === c
                ? 'bg-[#0a2a55]/15 font-bold text-[#0a2a55]'
                : 'text-[#5c6b82] hover:text-[#0a2a55]',
            ]"
          >{{ c }}</button>
        </div>
        <input
          v-model="moduleSearch"
          placeholder="在当前模块检索标题、单位、作者..."
          class="w-60 rounded-sm border border-[#dbe3ee] px-2.5 py-1 text-xs outline-none focus:border-[#e8541e]"
        />
      </div>
    </div>

    <!-- 稿件表格 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
      <div class="mb-2 flex items-center justify-between">
        <h4 class="font-serif text-base font-bold text-[#0a2a55]">
          「{{ selectedModule }}」稿件列表
          {{ selectedModule === '基层动态' && selectedGrassrootsTab !== '全部' ? ` · ${selectedGrassrootsTab}` : '' }}
        </h4>
        <span class="font-num text-xs text-[#5c6b82]">共 {{ filteredArticles.length }} 篇</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#dbe3ee] bg-[#eaeff5]/40 text-left text-xs text-[#5c6b82]">
              <th class="px-3 py-2 font-medium">标题</th>
              <th v-if="selectedModule === '基层动态'" class="px-3 py-2 font-medium">子部门</th>
              <th class="px-3 py-2 font-medium">检索分类</th>
              <th class="px-3 py-2 font-medium">报送单位</th>
              <th class="px-3 py-2 font-medium">日期</th>
              <th class="px-3 py-2 font-medium">状态</th>
              <th class="px-3 py-2 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#dbe3ee]/60">
            <tr v-for="a in filteredArticles" :key="a.id" class="hover:bg-[#eaeff5]/20">
              <td class="max-w-[300px] px-3 py-2.5">
                <div class="flex items-center gap-2">
                  <img
                    v-if="a.images && a.images.length > 0"
                    :src="a.images[0]"
                    alt=""
                    class="h-7 w-10 shrink-0 rounded border border-[#dbe3ee] object-cover"
                  />
                  <span class="truncate font-medium text-[#16233a]">{{ a.title }}</span>
                  <span
                    v-if="a.images && a.images.length > 0"
                    class="shrink-0 rounded-sm bg-[#0a2a55]/10 px-1 py-0.2 text-[10px] font-medium text-[#0a2a55]"
                  >{{ a.images.length }}图</span>
                  <span
                    v-if="a.isNew"
                    class="shrink-0 rounded-sm bg-[#e8541e] px-1 text-[9px] font-bold uppercase text-white"
                  >NEW</span>
                </div>
              </td>
              <td v-if="selectedModule === '基层动态'" class="px-3 py-2.5 text-xs text-[#0a2a55]">
                {{ a.grassrootsTab ?? '执勤训练' }}
              </td>
              <td class="px-3 py-2.5 text-xs">
                <span class="rounded-sm bg-[#0a2a55]/5 px-1.5 py-0.5 text-[#0a2a55]">{{ a.category }}</span>
              </td>
              <td class="px-3 py-2.5 text-xs text-[#5c6b82]">{{ a.unit ?? '支队机关' }}</td>
              <td class="font-num px-3 py-2.5 text-xs text-[#5c6b82]">{{ a.date }}</td>
              <td class="px-3 py-2.5 text-xs">
                <span :class="statusClass(a.status ?? '已发布')">{{ a.status ?? '已发布' }}</span>
              </td>
              <td class="px-3 py-2.5 text-right">
                <div class="flex justify-end gap-1.5">
                  <button
                    @click="toggleNew(a)"
                    class="rounded-sm border border-[#dbe3ee] px-2 py-0.5 text-xs text-[#5c6b82] hover:border-[#e8541e] hover:text-[#e8541e]"
                  >{{ a.isNew ? '取消NEW' : '标NEW' }}</button>
                  <button
                    @click="$emit('start-edit', a)"
                    class="rounded-sm border border-[#dbe3ee] px-2 py-0.5 text-xs text-[#0a2a55] hover:border-[#e8541e] hover:text-[#e8541e]"
                  >编辑/传图</button>
                  <button
                    @click="doDelete(a)"
                    class="rounded-sm border border-red-200 px-2 py-0.5 text-xs text-red-600 hover:bg-red-50"
                  >删除</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredArticles.length === 0">
              <td :colspan="selectedModule === '基层动态' ? 7 : 6" class="px-3 py-10 text-center text-xs text-[#5c6b82]">
                当前模块下暂无稿件
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import {
  MODULE_NAMES,
  GRASSROOTS_TABS,
  CATEGORIES,
} from '../types'
import type { Article } from '../types'

const props = defineProps<{
  initialModule?: string
}>()
const emit = defineEmits<{
  (e: 'go-submit'): void
  (e: 'start-edit', a: Article): void
  (e: 'module-change', m: string): void
}>()

const admin = useAdminStore()

const initial = (props.initialModule as any) || '消防要闻'
const selectedModule = ref<string>(initial)
const selectedGrassrootsTab = ref<string>('全部')
const selectedCatFilter = ref<string>('全部')
const moduleSearch = ref('')

const allGrassrootsTabs: string[] = ['全部', ...GRASSROOTS_TABS]
const allCategories: string[] = ['全部', ...CATEGORIES]

function onModuleClick(m: string) {
  selectedModule.value = m
  selectedGrassrootsTab.value = '全部'
  emit('module-change', m)
}

function moduleTotal(m: string) {
  const s = admin.moduleCounts[m]
  return (s?.published ?? 0) + (s?.pending ?? 0)
}

const filteredArticles = computed(() => {
  return admin.articles.filter((a) => {
    const mod = a.module ?? '消防要闻'
    if (mod !== selectedModule.value) return false
    if (selectedModule.value === '基层动态' && selectedGrassrootsTab.value !== '全部') {
      if ((a.grassrootsTab ?? '执勤训练') !== selectedGrassrootsTab.value) return false
    }
    if (selectedCatFilter.value !== '全部' && a.category !== selectedCatFilter.value) return false
    if (moduleSearch.value.trim()) {
      const q = moduleSearch.value.trim().toLowerCase()
      const match = (a.title + (a.unit ?? '') + (a.author ?? '')).toLowerCase()
      if (!match.includes(q)) return false
    }
    return true
  })
})

function statusClass(st: NonNullable<Article['status']>) {
  const base = 'rounded-sm px-1.5 py-0.5 text-[11px] font-medium '
  if (st === '待大队审核') return base + 'bg-amber-100 text-amber-800'
  if (st === '办公室直报') return base + 'bg-blue-100 text-blue-800'
  return base + 'bg-emerald-100 text-emerald-800'
}

async function toggleNew(a: Article) {
  try {
    await admin.updateArticle(a.id, { isNew: !a.isNew })
  } catch { ElMessage.error('操作失败') }
}

async function doDelete(a: Article) {
  try {
    await ElMessageBox.confirm(`确定删除《${a.title}》？`, '删除确认', { type: 'warning' })
    await admin.deleteArticle(a.id)
    ElMessage.success('已删除')
  } catch { /* 用户取消 */ }
}
</script>
