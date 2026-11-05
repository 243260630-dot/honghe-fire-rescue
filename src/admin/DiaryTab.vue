<template>
  <div class="space-y-4">
    <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
      <h3 class="font-serif text-lg font-bold text-[#0a2a55]">「要事日记」时间轴大事记管理</h3>
      <p class="mt-0.5 text-xs text-[#5c6b82]">管理前端主导航「要事日记」栏目展示的支队重要工作、重大活动及重大抢险救援节点</p>

      <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[150px_140px_160px_1fr_auto]">
        <input
          v-model="diary.date"
          type="date"
          class="rounded-sm border border-[#dbe3ee] px-2.5 py-2 text-xs outline-none focus:border-[#e8541e]"
        />
        <select
          v-model="diary.tag"
          class="rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-2 text-xs outline-none focus:border-[#e8541e]"
        >
          <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
        </select>
        <select
          v-model="diary.unit"
          class="rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-2 text-xs outline-none focus:border-[#e8541e]"
        >
          <option v-for="u in allUnits" :key="u" :value="u">{{ u }}</option>
        </select>
        <input
          v-model="diary.text"
          placeholder="输入要事日记具体事项描述..."
          class="rounded-sm border border-[#dbe3ee] px-3 py-2 text-xs outline-none focus:border-[#e8541e]"
          @keyup.enter="submit"
        />
        <button
          @click="submit"
          :disabled="!diary.text.trim()"
          class="rounded-sm bg-[#e8541e] px-4 py-2 text-xs font-bold text-white hover:bg-[#c9430f] disabled:opacity-60 whitespace-nowrap"
        >{{ editingId !== null ? '保存修改' : '+ 新增大事记' }}</button>
      </div>

      <div class="mt-5 divide-y divide-[#dbe3ee]/60">
        <div
          v-for="e in sortedDiary"
          :key="e.id"
          class="flex items-center justify-between gap-4 py-3 text-sm flex-wrap"
        >
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="font-num font-bold text-[#0a2a55]">{{ e.date }}</span>
            <span class="rounded-sm border border-[#0a2a55]/20 bg-[#0a2a55]/5 px-1.5 py-0.5 text-[10px] text-[#0a2a55]">
              {{ e.tag }}
            </span>
            <span v-if="e.unit" class="rounded-sm bg-[#eaeff5] px-1.5 py-0.5 text-[10px] text-[#5c6b82]">
              {{ e.unit }}
            </span>
            <span class="text-[#16233a]/90">{{ e.text }}</span>
          </div>
          <div class="flex shrink-0 gap-2 text-xs">
            <button @click="edit(e)" class="text-[#0a2a55] hover:text-[#e8541e]">编辑</button>
            <button @click="del(e.id)" class="text-red-600 hover:underline">删除</button>
          </div>
        </div>
        <div v-if="admin.diaryEvents.length === 0" class="py-8 text-center text-xs text-[#5c6b82]">
          暂无大事记
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import { CATEGORIES, DETACHMENT_DEPTS, BRIGADE_UNITS } from '../types'
import type { DiaryEvent } from '../types'

const admin = useAdminStore()

const allUnits = [...DETACHMENT_DEPTS, ...BRIGADE_UNITS]

const today = () => new Date().toISOString().slice(0, 10)

const diary = reactive({
  date: today(),
  tag: '作战训练' as string,
  unit: '支队办公室',
  text: '',
})

const editingId = computed<number | null>(() => (diary as any)._editingId ?? null)

const sortedDiary = computed(() =>
  [...admin.diaryEvents].sort((a, b) => b.date.localeCompare(a.date)),
)

function edit(e: DiaryEvent) {
  ;(diary as any)._editingId = e.id
  diary.date = e.date
  diary.tag = e.tag
  diary.unit = e.unit ?? '支队办公室'
  diary.text = e.text
}

async function del(id: number) {
  try {
    await admin.deleteDiary(id)
    ElMessage.success('已删除')
  } catch { ElMessage.error('删除失败') }
}

async function submit() {
  if (!diary.text.trim()) return
  try {
    if (editingId.value !== null) {
      await admin.updateDiary(editingId.value, {
        date: diary.date,
        tag: diary.tag,
        unit: diary.unit,
        text: diary.text.trim(),
      })
      ElMessage.success('已更新要事日记条目')
      ;(diary as any)._editingId = null
    } else {
      await admin.createDiary({
        date: diary.date,
        tag: diary.tag,
        unit: diary.unit,
        text: diary.text.trim(),
      })
      ElMessage.success('已添加要事日记节点')
    }
    diary.text = ''
  } catch {
    ElMessage.error('保存失败')
  }
}
</script>
