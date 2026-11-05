<template>
  <div class="space-y-5">
    <!-- 双焦点图 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
      <h3 class="font-serif text-lg font-bold text-[#0a2a55]">
        前端主页双焦点图配置（头条左侧大图 & 机关动态右侧大图）
      </h3>
      <p class="mt-0.5 text-xs text-[#5c6b82]">
        直接配置前端「消防要闻」左侧焦点图及「机关动态」右侧展示图的图片、标题文字和点击跳转稿件
      </p>

      <div class="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div
          v-for="(banner, idx) in localBanners"
          :key="banner.id"
          class="rounded-md border border-[#dbe3ee] bg-[#eaeff5]/20 p-4"
        >
          <div class="mb-2 flex items-center justify-between">
            <span class="font-serif text-sm font-bold text-[#0a2a55]">{{ banner.label }}</span>
            <div class="flex items-center gap-2">
              <label class="cursor-pointer rounded-sm bg-[#e8541e] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#c9430f]">
                上传本地图片
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handleBannerUpload(e, idx)"
                />
              </label>
              <span class="rounded-sm bg-[#0a2a55]/10 px-2 py-0.5 text-[11px] text-[#0a2a55]">
                {{ banner.id === 1 ? '头条左侧大图' : '机关动态右侧图' }}
              </span>
            </div>
          </div>
          <div class="aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#0a2a55]">
            <img v-if="banner.img" :src="banner.img" :alt="banner.caption" class="h-full w-full object-cover" />
            <div v-else class="h-full w-full flex items-center justify-center text-white/40 text-xs">暂无图片</div>
          </div>
          <div class="mt-3 space-y-2.5">
            <div>
              <label class="mb-1 block text-xs font-medium text-[#0a2a55]">图片下方展示标题</label>
              <input
                v-model="banner.caption"
                class="w-full rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#0a2a55]">关联稿件（点击跳转）</label>
              <select
                v-model="banner.articleId"
                class="w-full rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
              >
                <option :value="0">— 不关联稿件 —</option>
                <option
                  v-for="a in admin.publishedArticles.slice(0, 30)"
                  :key="a.id"
                  :value="a.id"
                >[{{ a.module }}] {{ a.title }}</option>
              </select>
            </div>
            <button
              @click="saveBanner(idx)"
              class="rounded-sm bg-[#0a2a55] px-3 py-1 text-xs font-bold text-white hover:bg-[#e8541e]"
            >保存此焦点图</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动公告 -->
    <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
      <h3 class="font-serif text-lg font-bold text-[#0a2a55]">主导航下方「最新公告」跑马灯管理</h3>
      <p class="mt-0.5 text-xs text-[#5c6b82]">由支队办公室维护，启用状态的公告将在网页顶部循环滚动播报</p>

      <div class="mt-3 flex flex-wrap gap-2">
        <input
          v-model="newText"
          placeholder="输入新的滚动公告内容..."
          class="min-w-[260px] flex-1 rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
        />
        <input
          v-model="newIssuer"
          placeholder="签发部门"
          class="w-36 rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
        />
        <button
          @click="createNotice"
          :disabled="!newText.trim()"
          class="rounded-sm bg-[#e8541e] px-4 py-2 text-xs font-bold text-white hover:bg-[#c9430f] disabled:opacity-60"
        >+ 发布滚动公告</button>
      </div>

      <div class="mt-4 divide-y divide-[#dbe3ee]/60">
        <div
          v-for="ann in admin.announcements"
          :key="ann.id"
          class="flex items-center justify-between gap-3 py-2.5 text-sm"
        >
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <input
              type="checkbox"
              :checked="ann.active !== false"
              @change="toggleActive(ann)"
              class="accent-[#e8541e]"
            />
            <span :class="ann.active !== false ? 'text-[#16233a]' : 'line-through text-[#5c6b82]'">
              {{ ann.text }}
            </span>
          </div>
          <div class="flex shrink-0 items-center gap-3 text-xs text-[#5c6b82]">
            <span>{{ ann.issuer }}</span>
            <span class="font-num">{{ ann.date }}</span>
            <button
              @click="deleteNotice(ann.id)"
              class="text-red-600 hover:underline"
            >删除</button>
          </div>
        </div>
        <div v-if="admin.announcements.length === 0" class="py-8 text-center text-xs text-[#5c6b82]">
          暂无公告
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/admin'
import { uploadFile } from '../api/request'


const admin = useAdminStore()

// 初始化 —— 后端可能返回 0 条 banner，需要两个占位
const localBanners = reactive<Array<{
  id: number
  label: string
  img: string
  caption: string
  articleId: number
  order: number
}>>([])

onMounted(() => {
  admin.banners.forEach((b, i) => {
    localBanners.push({
      id: b.id,
      label: i === 0 ? '头条区左侧焦点图' : '机关动态右侧展示图',
      img: b.img ?? '',
      caption: b.caption ?? '',
      articleId: b.articleId ?? 0,
      order: b.order ?? i,
    })
  })
  if (localBanners.length === 0) {
    ;[
      { id: 0, label: '头条区左侧焦点图', img: '', caption: '', articleId: 0, order: 0 },
      { id: 0, label: '机关动态右侧展示图', img: '', caption: '', articleId: 0, order: 1 },
    ].forEach((x) => localBanners.push(x))
  } else if (localBanners.length === 1) {
    localBanners.push({
      id: 0,
      label: '机关动态右侧展示图',
      img: '',
      caption: '',
      articleId: 0,
      order: 1,
    })
  }
})

async function handleBannerUpload(e: Event, idx: number) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0]
  if (!f) return
  try {
    const res = await uploadFile(f)
    localBanners[idx].img = res.url
  } catch {
    const dataUrl = await new Promise<string>((resolve) => {
      const r = new FileReader()
      r.onload = () => resolve(String(r.result))
      r.readAsDataURL(f)
    })
    localBanners[idx].img = dataUrl
  }
  input.value = ''
}

async function saveBanner(idx: number) {
  const b = localBanners[idx]
  try {
    if (b.id && b.id !== 0) {
      await admin.updateBanner(b.id, {
        img: b.img,
        caption: b.caption,
        articleId: b.articleId || undefined,
      })
    }
    ElMessage.success('已保存焦点图配置')
  } catch {
    ElMessage.error('保存失败')
  }
}

const newText = ref('')
const newIssuer = ref('支队办公室')

async function createNotice() {
  if (!newText.value.trim()) return
  try {
    await admin.createAnnouncement({
      text: newText.value.trim(),
      issuer: newIssuer.value.trim() || '支队办公室',
      date: new Date().toISOString().slice(0, 10),
      active: true,
    })
    newText.value = ''
    ElMessage.success('已发布滚动公告')
  } catch {
    ElMessage.error('发布失败')
  }
}

async function toggleActive(ann: { id: number; active?: boolean }) {
  try {
    await admin.updateAnnouncement(ann.id, { active: ann.active === false })
  } catch { ElMessage.error('操作失败') }
}

async function deleteNotice(id: number) {
  try {
    await admin.deleteAnnouncement(id)
    ElMessage.success('已删除公告')
  } catch { ElMessage.error('删除失败') }
}
</script>
