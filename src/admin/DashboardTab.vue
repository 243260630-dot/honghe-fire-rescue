<template>
  <div class="space-y-5">
    <!-- 顶部 5 统计卡 -->
    <div class="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
      <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
        <p class="text-xs text-[#5c6b82]">主页已发布稿件</p>
        <p class="font-num mt-1 text-3xl font-bold text-[#0a2a55]">{{ admin.publishedArticles.length }}</p>
        <p class="mt-1 text-[11px] text-[#5c6b82]">覆盖前端 12 大核心模块</p>
      </div>
      <div
        @click="$emit('go-tab', 'audit')"
        class="cursor-pointer rounded-md border border-[#e8541e]/40 bg-[#e8541e]/5 p-4 shadow-xs transition-colors hover:bg-[#e8541e]/10"
      >
        <p class="text-xs font-bold text-[#e8541e]">待大队审核队列</p>
        <p class="font-num mt-1 text-3xl font-bold text-[#e8541e]">{{ admin.pendingArticles.length }}</p>
        <p class="mt-1 text-[11px] text-[#e8541e]/80">点击进入批阅发布 →</p>
      </div>
      <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
        <p class="text-xs text-[#5c6b82]">办公室直报公告</p>
        <p class="font-num mt-1 text-3xl font-bold text-[#0a2a55]">{{ admin.officeDirectArticles.length }}</p>
        <p class="mt-1 text-[11px] text-[#5c6b82]">已上会/审核公文免审直发</p>
      </div>
      <div
        @click="$emit('go-tab', 'diary')"
        class="cursor-pointer rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs hover:border-[#0a2a55]/40"
      >
        <p class="text-xs text-[#5c6b82]">要事日记时间轴</p>
        <p class="font-num mt-1 text-3xl font-bold text-[#0a2a55]">{{ admin.diaryEvents.length }}</p>
        <p class="mt-1 text-[11px] text-[#5c6b82]">重大工作与救援大事记</p>
      </div>
      <div
        @click="$emit('go-tab', 'visuals')"
        class="cursor-pointer rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs hover:border-[#0a2a55]/40"
      >
        <p class="text-xs text-[#5c6b82]">顶栏滚动公告</p>
        <p class="font-num mt-1 text-3xl font-bold text-[#0a2a55]">{{ admin.activeAnnouncements.length }}</p>
        <p class="mt-1 text-[11px] text-[#5c6b82]">双焦点大图 + 跑马灯公告</p>
      </div>
    </div>

    <!-- 12 模块全景网格 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#dbe3ee] pb-3">
        <div>
          <h3 class="font-serif text-base font-bold text-[#0a2a55]">
            前端网页 12 大展示栏目全景管理
          </h3>
          <p class="text-xs text-[#5c6b82]">
            点击卡片进入对应栏目维护
          </p>
        </div>
        <button
          @click="$emit('go-tab', 'submit')"
          class="rounded-sm bg-[#e8541e] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#c9430f]"
        >+ 上报/发布新稿件</button>
      </div>

      <div class="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <button
          v-for="m in moduleNames"
          :key="m"
          @click="($emit('go-tab', 'modules'), $emit('select-module', m))"
          class="group flex flex-col justify-between rounded-md border border-[#dbe3ee] bg-[#eaeff5]/30 p-3 text-left transition-all hover:border-[#e8541e] hover:bg-white hover:shadow-xs"
        >
          <div class="flex items-center justify-between">
            <span class="font-serif text-sm font-bold text-[#0a2a55] group-hover:text-[#e8541e]">{{ m }}</span>
            <span class="text-[11px] text-[#5c6b82] group-hover:text-[#e8541e]">管理 →</span>
          </div>
          <div class="mt-2 flex items-center justify-between text-xs">
            <span class="text-[#5c6b82]">
              已上线：<b class="font-num text-[#0a2a55]">{{ statOf(m).published }}</b> 篇
            </span>
            <span
              v-if="statOf(m).pending > 0"
              class="rounded-sm bg-[#e8541e]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#e8541e]"
            >待审 {{ statOf(m).pending }}</span>
            <span
              v-else-if="m === '通知公告'"
              class="rounded-sm bg-[#0a2a55]/10 px-1.5 py-0.5 text-[10px] text-[#0a2a55]"
            >办公室直报</span>
            <span
              v-else-if="m === '基层动态'"
              class="rounded-sm bg-[#0a2a55]/10 px-1.5 py-0.5 text-[10px] text-[#0a2a55]"
            >含7个子部门</span>
          </div>
        </button>
      </div>
    </div>

    <!-- 四大类进度条 + 待审核快捷列表 -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
      <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
        <h3 class="font-serif text-base font-bold text-[#0a2a55]">顶部导航四大检索分类统计</h3>
        <p class="mt-0.5 text-xs text-[#5c6b82]">点选主页顶部四大模块时自动按此分类检索目录</p>
        <div class="mt-3 space-y-2.5">
          <div v-for="c in categories" :key="c" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-bold text-[#0a2a55]">{{ c }}</span>
              <span class="font-num text-[#5c6b82]">{{ categoryCount(c) }} 篇 ({{ categoryPct(c) }}%)</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-[#eaeff5]">
              <div class="h-full rounded-full bg-[#e8541e] transition-all" :style="{ width: categoryPct(c) + '%' }" />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-md border border-[#dbe3ee] bg-white p-4 shadow-xs">
        <div class="flex items-center justify-between border-b border-[#dbe3ee] pb-2.5">
          <div>
            <h3 class="font-serif text-base font-bold text-[#0a2a55]">最新待大队审核队列</h3>
            <p class="text-xs text-[#5c6b82]">支队各部门或大队上报内容经大队审核后立即发布到前端对应模块</p>
          </div>
          <button @click="$emit('go-tab', 'audit')" class="text-xs font-bold text-[#e8541e] hover:underline">
            全部流转记录 &raquo;
          </button>
        </div>

        <div
          v-if="admin.pendingArticles.length === 0"
          class="py-8 text-center text-xs text-[#5c6b82]"
        >当前暂无待审稿件</div>

        <div v-else class="mt-2 divide-y divide-[#dbe3ee]/60">
          <div
            v-for="a in admin.pendingArticles.slice(0, 4)"
            :key="a.id"
            class="flex items-center justify-between gap-3 py-2.5 text-sm"
          >
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="shrink-0 rounded-sm bg-[#0a2a55]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#0a2a55]">
                  {{ a.module }}{{ a.grassrootsTab ? ` · ${a.grassrootsTab}` : '' }}
                </span>
                <span class="truncate font-medium text-[#16233a]/90">{{ a.title }}</span>
              </div>
              <p class="mt-0.5 text-xs text-[#5c6b82]">
                报送单位：{{ a.unit }} · 检索归类：{{ a.category }} · 日期：{{ a.date }}
              </p>
            </div>
            <template v-if="auth.canAudit">
              <button
                @click="doApprove(a.id)"
                class="shrink-0 rounded-sm bg-[#e8541e] px-2.5 py-1 text-xs font-bold text-white hover:bg-[#c9430f]"
              >通过发布</button>
            </template>
            <template v-else>
              <span class="shrink-0 rounded-sm bg-amber-100 px-2 py-0.5 text-xs text-amber-800">待大队审核</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import { useAuthStore } from '../stores/auth'
import { MODULE_NAMES, CATEGORIES } from '../types'

const emit = defineEmits<{
  (e: 'go-tab', tab: 'audit' | 'diary' | 'visuals' | 'submit' | 'modules'): void
  (e: 'select-module', m: string): void
}>()

const admin = useAdminStore()
const auth = useAuthStore()

const moduleNames = MODULE_NAMES
const categories = CATEGORIES

function statOf(m: string) {
  return admin.moduleCounts[m] ?? { published: 0, pending: 0 }
}

const totalPublished = computed(() => admin.publishedArticles.length)

function categoryCount(c: string) {
  return admin.publishedArticles.filter((a) => a.category === c).length
}
function categoryPct(c: string) {
  if (totalPublished.value === 0) return 0
  return Math.min(100, Math.round((categoryCount(c) / totalPublished.value) * 100))
}

async function doApprove(id: number) {
  try {
    const a = admin.pendingArticles.find((x) => x.id === id)
    await admin.approveArticle(id)
    ElMessage.success(`已审核通过并发布：《${a?.title ?? ''}》`)
  } catch {
    ElMessage.error('审核操作失败')
  }
}
</script>
