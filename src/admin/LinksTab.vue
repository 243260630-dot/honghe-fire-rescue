<template>
  <div class="space-y-5">
    <!-- 跨网配置 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe3ee] pb-3">
        <div>
          <h3 class="font-serif text-lg font-bold text-[#0a2a55]">跨网安全访问网关（预留功能配置）</h3>
          <p class="text-xs text-[#5c6b82]">管理后台默认仅限办公室内网访问；开启跨网访问后支持经安全边界网关跳转</p>
        </div>
        <label class="flex cursor-pointer items-center gap-2 rounded-sm border border-[#e8541e]/40 bg-[#e8541e]/5 px-3 py-1.5 text-xs font-bold text-[#e8541e]">
          <input
            type="checkbox"
            v-model="crossEnabled"
            class="accent-[#e8541e]"
            @change="onToggleCross"
          />
          {{ crossEnabled ? '跨网访问通道：已启用' : '跨网访问通道：已关闭' }}
        </label>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1 block text-xs font-medium text-[#0a2a55]">跨网安全审批授权码</label>
          <input
            v-model="approvalCode"
            class="w-full rounded-sm border border-[#dbe3ee] px-3 py-1.5 text-xs outline-none focus:border-[#e8541e]"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-[#0a2a55]">办公室内网允许白名单网段</label>
          <input
            v-model="allowedSubnet"
            class="w-full rounded-sm border border-[#dbe3ee] px-3 py-1.5 text-xs outline-none focus:border-[#e8541e]"
          />
        </div>
      </div>

      <div class="mt-4">
        <p class="mb-1.5 text-xs font-bold text-[#0a2a55]">跨网访问与外链跳转审计日志</p>
        <div class="rounded-sm border border-[#dbe3ee] bg-[#eaeff5]/30 p-2.5 text-xs">
          <div
            v-for="log in crossLogs.slice(0, 6)"
            :key="log.id"
            class="flex flex-wrap items-center justify-between border-b border-[#dbe3ee]/50 py-1.5 last:border-none gap-2"
          >
            <span class="font-num text-[#5c6b82]">{{ log.time }}</span>
            <span class="font-medium text-[#0a2a55]">{{ log.user }}</span>
            <span>{{ log.action }}</span>
            <span class="font-num text-[#5c6b82]">内网IP: {{ log.ip }}</span>
            <span class="rounded-sm bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-800">{{ log.status }}</span>
          </div>
          <div v-if="crossLogs.length === 0" class="text-center text-[#5c6b82] py-2">暂无日志</div>
        </div>
      </div>
    </div>

    <!-- 外链管理 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
      <h3 class="font-serif text-lg font-bold text-[#0a2a55]">顶部导航外链与底部外链条配置</h3>
      <p class="mt-0.5 text-xs text-[#5c6b82]">「火灾统计」同时保留在顶部导航与底部外链条</p>

      <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[140px_180px_1fr_140px_auto]">
        <input
          v-model="form.name"
          placeholder="外链名称"
          class="rounded-sm border border-[#dbe3ee] px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
        />
        <input
          v-model="form.href"
          placeholder="系统地址 URL"
          class="rounded-sm border border-[#dbe3ee] px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
        />
        <input
          v-model="form.desc"
          placeholder="外链描述说明"
          class="rounded-sm border border-[#dbe3ee] px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
        />
        <select
          v-model="form.position"
          class="rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
        >
          <option value="footer">仅底部外链条</option>
          <option value="top">仅顶部导航</option>
          <option value="both">顶部 + 底部均显示</option>
        </select>
        <div class="flex items-center gap-1.5">
          <label class="flex items-center gap-1 text-xs text-[#5c6b82] whitespace-nowrap">
            <input type="checkbox" v-model="form.crossNet" class="accent-[#e8541e]" />跨网
          </label>
          <button
            @click="createLink"
            :disabled="!form.name.trim()"
            class="rounded-sm bg-[#e8541e] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#c9430f] disabled:opacity-60"
          >+ 新增外链</button>
        </div>
      </div>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#dbe3ee] bg-[#eaeff5]/40 text-left text-xs text-[#5c6b82]">
              <th class="px-3 py-2 font-medium">入口名称</th>
              <th class="px-3 py-2 font-medium">展示位置</th>
              <th class="px-3 py-2 font-medium">目标地址</th>
              <th class="px-3 py-2 font-medium">系统说明</th>
              <th class="px-3 py-2 font-medium">跨网要求</th>
              <th class="px-3 py-2 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#dbe3ee]/60">
            <tr v-for="ext in admin.externalLinks" :key="ext.id">
              <td class="px-3 py-2.5 font-bold text-[#0a2a55]">{{ ext.name }}</td>
              <td class="px-3 py-2.5 text-xs">
                <span class="rounded-sm bg-[#0a2a55]/10 px-2 py-0.5 text-[#0a2a55]">
                  {{ posLabel(ext.position) }}
                </span>
              </td>
              <td class="font-num px-3 py-2.5 text-xs text-[#5c6b82] truncate max-w-[240px]">{{ ext.href }}</td>
              <td class="px-3 py-2.5 text-xs text-[#5c6b82]">{{ ext.desc }}</td>
              <td class="px-3 py-2.5 text-xs">
                <span
                  :class="[
                    'rounded-sm px-1.5 py-0.5 text-[11px]',
                    ext.crossNet
                      ? 'bg-[#e8541e]/15 font-bold text-[#e8541e]'
                      : 'bg-[#eaeff5] text-[#5c6b82]',
                  ]"
                >{{ ext.crossNet ? '需跨网访问网关' : '内网直连' }}</span>
              </td>
              <td class="px-3 py-2.5 text-right">
                <button
                  @click="deleteLink(ext.id)"
                  class="text-xs text-red-600 hover:underline"
                >删除</button>
              </td>
            </tr>
            <tr v-if="admin.externalLinks.length === 0">
              <td colspan="6" class="px-3 py-10 text-center text-xs text-[#5c6b82]">暂无外链</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import { useAuthStore } from '../stores/auth'
import type { ExternalLinkItem } from '../types'

const admin = useAdminStore()
const auth = useAuthStore()

const crossEnabled = ref(auth.crossNetEnabled)
const approvalCode = ref('YN-HHXF-CROSS-202609')
const allowedSubnet = ref('10.119.0.0/16, 172.18.40.0/24')

const crossLogs = reactive<Array<{
  id: number
  time: string
  user: string
  action: string
  ip: string
  status: '已放行' | '待审批'
}>>([
  { id: 1, time: '2026-09-15 09:42:18', user: '大队级管理员 (admin_hhxf)', action: '启用跨网安全访问预留通道', ip: '10.119.8.12', status: '已放行' },
  { id: 2, time: '2026-09-15 09:15:04', user: '支队办公室 (office_01)', action: '跨网访问「火灾统计」部局系统', ip: '10.119.8.25', status: '已放行' },
])

function onToggleCross() {
  auth.setCrossNet(crossEnabled.value)
  crossLogs.unshift({
    id: Date.now(),
    time: new Date().toISOString().replace('T', ' ').slice(0, 16),
    user: `${auth.role}级管理员 (${auth.username || 'admin'})`,
    action: crossEnabled.value ? '开启跨网安全访问网关' : '关闭跨网安全访问网关',
    ip: '10.119.8.12',
    status: '已放行',
  })
  ElMessage.success(crossEnabled.value ? '已开启跨网访问预留功能' : '已切换回仅限办公室内网访问模式')
}

const form = reactive<{
  name: string
  href: string
  desc: string
  position: ExternalLinkItem['position']
  crossNet: boolean
}>({
  name: '',
  href: 'https://',
  desc: '',
  position: 'footer',
  crossNet: false,
})

function posLabel(p?: ExternalLinkItem['position']) {
  if (p === 'top') return '仅顶部导航'
  if (p === 'both') return '顶部导航 + 底部外链条'
  return '仅底部外链条'
}

async function createLink() {
  if (!form.name.trim()) return
  try {
    await admin.createExternalLink({
      name: form.name.trim(),
      href: form.href.trim() || '#',
      desc: form.desc.trim() || '外部业务系统入口',
      position: form.position,
      crossNet: form.crossNet,
    })
    form.name = ''
    form.desc = ''
    form.crossNet = false
    ElMessage.success('已新增外链入口')
  } catch { ElMessage.error('新增失败') }
}

async function deleteLink(id: number) {
  try {
    await admin.deleteExternalLink(id)
    ElMessage.success('已删除')
  } catch { ElMessage.error('删除失败') }
}
</script>
