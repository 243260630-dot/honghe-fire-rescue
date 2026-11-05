<template>
  <div class="rounded-md border border-[#dbe3ee] bg-white p-5 shadow-xs">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#dbe3ee] pb-3">
      <div>
        <h3 class="font-serif text-lg font-bold text-[#0a2a55]">
          稿件上报与办公室直报发布
        </h3>
        <p class="text-xs text-[#5c6b82]">
          常规稿件由支队各部门或基层大队上报，经大队级审核后发布；「通知公告」已上会/审核文件由支队办公室直接上报发布
        </p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          @click="fillDemo"
          class="rounded-sm border border-[#0a2a55]/30 bg-[#0a2a55]/5 px-3 py-1.5 text-xs font-medium text-[#0a2a55] hover:bg-[#0a2a55] hover:text-white"
        >一键填充示例稿件</button>
        <button
          v-if="editingId"
          type="button"
          @click="cancelEdit"
          class="rounded-sm border border-[#dbe3ee] px-3 py-1.5 text-xs text-[#5c6b82] hover:text-[#e8541e]"
        >取消编辑</button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
      <!-- 模块 / 子栏 / 分类 / 单位 -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">目标主页模块</label>
          <select
            v-model="form.module"
            class="w-full rounded-sm border border-[#dbe3ee] bg-white px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          >
            <option v-for="m in allowedModuleOptions" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
        <div v-if="form.module === '基层动态'">
          <label class="mb-1 block text-xs font-bold text-[#e8541e]">基层动态子栏目</label>
          <select
            v-model="form.grassrootsTab"
            class="w-full rounded-sm border border-[#e8541e]/50 bg-[#e8541e]/5 px-3 py-2 text-sm font-medium text-[#0a2a55] outline-none focus:border-[#e8541e]"
          >
            <option v-for="t in GRASSROOTS_TABS" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div v-else>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">顶部四大检索归类</label>
          <select
            v-model="form.category"
            class="w-full rounded-sm border border-[#dbe3ee] bg-white px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          >
            <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">报送单位</label>
          <input
            :value="auth.unit"
            disabled
            class="w-full rounded-sm border border-[#dbe3ee] bg-[#eaeff5]/60 px-3 py-2 text-sm text-[#5c6b82]"
          />
          <p class="mt-1 text-[10px] text-[#5c6b82]">报送单位与登录账号绑定，不可更改</p>
        </div>
      </div>

      <!-- 基层动态时的分类 -->
      <div v-if="form.module === '基层动态'" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">顶部四大检索归类</label>
          <select
            v-model="form.category"
            class="w-full rounded-sm border border-[#dbe3ee] bg-white px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          >
            <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
      </div>

      <!-- 标题 / 作者 / 日期 -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_160px_160px]">
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">稿件标题</label>
          <input
            v-model="form.title"
            placeholder="请输入规范稿件标题..."
            class="w-full rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">撰稿人 / 作者</label>
          <input
            v-model="form.author"
            placeholder="作者姓名"
            class="w-full rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-bold text-[#0a2a55]">发布日期</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full rounded-sm border border-[#dbe3ee] px-3 py-2 text-sm outline-none focus:border-[#e8541e]"
          />
        </div>
      </div>

      <!-- 办公室直报 -->
      <div
        v-if="auth.canOfficeDirect && (form.module === '通知公告' || form.unit.includes('办公室') || form.officeDirect)"
        class="rounded-md border border-[#0a2a55]/20 bg-[#0a2a55]/5 p-3.5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <label class="flex items-center gap-2 text-sm font-bold text-[#0a2a55]">
            <input
              type="checkbox"
              v-model="form.officeDirect"
              class="accent-[#e8541e]"
            />
            办公室直报通道（已上会 / 已签发公文免除大队审核，直接发布上线）
          </label>
          <div class="flex items-center gap-2">
            <span class="text-xs text-[#5c6b82]">上会/发文字号：</span>
            <input
              v-model="form.docNo"
              placeholder="如：红消办发〔2026〕45号"
              class="w-48 rounded-sm border border-[#dbe3ee] bg-white px-2.5 py-1 text-xs outline-none focus:border-[#e8541e]"
            />
          </div>
        </div>
      </div>

      <!-- 正文编辑器 -->
      <div>
        <label class="mb-1 block text-xs font-bold text-[#0a2a55]">稿件正文内容</label>
        <div class="border border-[#dbe3ee] rounded-sm overflow-hidden">
          <Toolbar
            style="border-bottom: 1px solid #dbe3ee"
            :editor="editorRef"
            :default-config="toolbarConfig"
            mode="default"
          />
          <Editor
            v-model="form.content"
            style="height: 260px; overflow-y: auto"
            :default-config="editorConfig"
            mode="default"
            @onCreated="handleEditorCreated"
          />
        </div>
      </div>

      <!-- 图片上传 -->
      <div class="rounded-md border border-[#dbe3ee] bg-[#eaeff5]/20 p-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <label class="block text-xs font-bold text-[#0a2a55]">稿件配图上传</label>
            <p class="mt-0.5 text-[11px] text-[#5c6b82]">上传的图片将在稿件详情页展示；第 1 张为封面首图</p>
          </div>
          <label class="cursor-pointer rounded-sm bg-[#0a2a55] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e8541e]">
            + 上传本地图片
            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleLocalUpload"
            />
          </label>
        </div>

        <div
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="handleDrop"
          :class="[
            'mt-3 rounded-sm border-2 border-dashed p-3 transition-colors',
            dragOver ? 'border-[#e8541e] bg-[#e8541e]/5' : 'border-[#dbe3ee] bg-white',
          ]"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="text-[#5c6b82]">拖拽上传或输入网络图片地址：</span>
          </div>
          <div class="mt-2.5 flex gap-2">
            <input
              v-model="imageUrlInput"
              placeholder="粘贴图片网络地址 (https://...)"
              class="flex-1 rounded-sm border border-[#dbe3ee] px-2.5 py-1.5 text-xs outline-none focus:border-[#e8541e]"
              @keyup.enter="addImageUrl"
            />
            <button
              type="button"
              @click="addImageUrl"
              class="rounded-sm border border-[#0a2a55]/30 bg-[#0a2a55]/5 px-3 py-1.5 text-xs font-medium text-[#0a2a55] hover:bg-[#0a2a55] hover:text-white"
            >添加图片地址</button>
          </div>
        </div>

        <div v-if="form.images.length > 0" class="mt-3 space-y-2.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-bold text-[#0a2a55]">已添加配图（共 {{ form.images.length }} 张）</span>
            <button type="button" @click="form.images = []" class="text-red-600 hover:underline text-xs">清空配图</button>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              v-for="(imgUrl, idx) in form.images"
              :key="idx + imgUrl.slice(0, 20)"
              class="relative overflow-hidden rounded-sm border border-[#dbe3ee] bg-white shadow-xs"
            >
              <div class="aspect-[16/10] w-full bg-[#0a2a55]/10">
                <img :src="imgUrl" :alt="'配图' + (idx + 1)" class="h-full w-full object-cover" />
              </div>
              <div class="flex items-center justify-between bg-white px-2 py-1 text-[11px]">
                <span class="font-bold text-[#0a2a55]">{{ idx === 0 ? '封面首图' : `配图 ${idx + 1}` }}</span>
                <div class="flex items-center gap-1.5">
                  <button
                    v-if="idx > 0"
                    type="button"
                    @click="moveToFirst(idx)"
                    class="text-[#0a2a55] hover:text-[#e8541e]"
                  >设为首图</button>
                  <button
                    type="button"
                    @click="form.images.splice(idx, 1)"
                    class="text-red-600 hover:underline"
                  >删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-t border-[#dbe3ee] pt-3">
        <div class="flex flex-wrap items-center gap-4 text-xs text-[#16233a]/85">
          <label class="flex items-center gap-1.5">
            <input type="checkbox" v-model="form.isNew" class="accent-[#e8541e]" />
            标记红色 NEW 角标
          </label>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="rounded-sm bg-[#e8541e] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9430f] disabled:opacity-60"
        >{{ submitBtnLabel }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, shallowRef, onBeforeUnmount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import { useAdminStore } from '../stores/admin'
import { useAuthStore } from '../stores/auth'
import {
  MODULE_NAMES,
  GRASSROOTS_TABS,
  CATEGORIES,
} from '../types'
import { uploadFile } from '../api/request'
import type { Article } from '../types'

const admin = useAdminStore()
const auth = useAuthStore()

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1576707995936-a6cffe26ef7b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
  'https://images.unsplash.com/photo-1633092228879-d6a88c22e7bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
  'https://images.unsplash.com/photo-1582139329536-e7284fece509?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
  'https://images.unsplash.com/photo-1599708153386-62bf3f035c78?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=560&q=80',
]

const editingId = ref<number | null>(null)
const submitting = ref(false)
const dragOver = ref(false)
const imageUrlInput = ref('')

const today = () => new Date().toISOString().slice(0, 10)

const form = reactive<{
  title: string
  module: Article['module']
  grassrootsTab: Article['grassrootsTab']
  category: Article['category']
  unit: string
  author: string
  date: string
  isNew: boolean
  docNo: string
  officeDirect: boolean
  content: string
  images: string[]
}>({
  title: '',
  module: '消防要闻',
  grassrootsTab: '执勤训练',
  category: '作战训练',
  unit: auth.unit || '支队办公室',
  author: auth.displayName || '管理员',
  date: today(),
  isNew: false,
  docNo: '',
  officeDirect: false,
  content: '',
  images: [],
})

watch(
  () => form.module,
  (m) => {
    if (m === '通知公告' && auth.canOfficeDirect) {
      form.officeDirect = true
    }
  },
)

/** 当前账号可操作栏目 */
const allowedModuleOptions = computed(() =>
  auth.allowedModules === 'ALL'
    ? MODULE_NAMES
    : MODULE_NAMES.filter((m) => (auth.allowedModules as string[]).includes(m)),
)

const submitBtnLabel = computed(() => {
  if (editingId.value) return '保存修改并同步至前台'
  if ((form.module === '通知公告' && form.unit.includes('办公室')) || form.officeDirect) {
    return '办公室直报 · 立即发布上线'
  }
  return auth.canAudit ? '审核账号 · 直接发布上线' : '提交大队审核'
})

// wangEditor
const editorRef = shallowRef<IDomEditor | null>(null)
const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入稿件正文内容...',
  MENU_CONF: {
    uploadImage: {
      customUpload: async (file: File, insertFn: (url: string, alt: string, href: string) => void) => {
        try {
          const res = await uploadFile(file)
          insertFn(res.url, file.name, res.url)
        } catch {
          // 后端不可用时回退 FileReader
          const reader = new FileReader()
          reader.onload = () => insertFn(String(reader.result), file.name, String(reader.result))
          reader.readAsDataURL(file)
        }
      },
    },
  },
}

function handleEditorCreated(editor: IDomEditor) {
  editorRef.value = editor
}
onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }
})

async function handleLocalUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || !input.files.length) return
  for (const f of Array.from(input.files)) {
    if (!f.type.startsWith('image/')) continue
    try {
      const res = await uploadFile(f)
      form.images.push(res.url)
    } catch {
      const dataUrl = await new Promise<string>((resolve) => {
        const r = new FileReader()
        r.onload = () => resolve(String(r.result))
        r.readAsDataURL(f)
      })
      form.images.push(dataUrl)
    }
  }
  input.value = ''
  ElMessage.success(`已上传 ${form.images.length} 张图片`)
}

function handleDrop(e: DragEvent) {
  dragOver.value = false
  const files = e.dataTransfer?.files
  if (!files) return
  // 复用同一逻辑 —— 用临时 input 的方式
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.files = files
  handleLocalUpload({ target: input } as unknown as Event)
}

function addImageUrl() {
  const v = imageUrlInput.value.trim()
  if (!v) return
  form.images.push(v)
  imageUrlInput.value = ''
}

function moveToFirst(idx: number) {
  const arr = form.images
  const [it] = arr.splice(idx, 1)
  arr.unshift(it)
}

function fillDemo() {
  if (form.module === '通知公告') {
    form.unit = '支队办公室'
    form.officeDirect = true
    form.category = '战勤保障'
    form.title = '关于做好2026年国庆中秋双节期间执勤战备与安全督导工作的通知'
    form.docNo = '红消办发〔2026〕46号'
  } else if (form.module === '基层动态') {
    form.unit = '蒙自市消防大队'
    form.grassrootsTab = '执勤训练'
    form.category = '作战训练'
    form.title = '【蒙自】开展商业综合体夜间无预案灭火救援实战演练'
    form.images = [PRESET_IMAGES[2]]
  } else {
    form.title = `支队扎实推进"${form.category}"专项攻坚行动取得阶段性成效`
    form.images = [PRESET_IMAGES[0]]
  }
}

function cancelEdit() {
  editingId.value = null
  form.title = ''
  form.content = ''
  form.images = []
  form.docNo = ''
  form.officeDirect = false
}

// 供 modules/audit tab 调用：编辑某篇稿件
function startEdit(a: Article) {
  editingId.value = a.id
  form.title = a.title
  form.module = a.module ?? '消防要闻'
  form.grassrootsTab = (a.grassrootsTab as any) ?? '执勤训练'
  form.category = a.category ?? '作战训练'
  form.unit = a.unit ?? '支队办公室'
  form.author = a.author ?? auth.username ?? ''
  form.date = a.date || today()
  form.isNew = !!a.isNew
  form.docNo = a.docNo ?? ''
  form.officeDirect = a.status === '办公室直报'
  form.content = a.content ?? ''
  form.images = a.images ? [...a.images] : []
}

defineExpose({ startEdit })

async function handleSubmit() {
  if (!form.title.trim()) {
    ElMessage.warning('请输入稿件标题')
    return
  }
  submitting.value = true
  try {
    const isOfficeDirect =
      (form.module === '通知公告' && form.unit.includes('办公室')) || form.officeDirect

    let finalTitle = form.title.trim()
    if (form.module === '基层动态' && !finalTitle.startsWith('【')) {
      const shortUnit = form.unit
        .replace(/市消防大队|县消防大队|消防大队|支队|大队/g, '')
        .slice(0, 2)
      if (shortUnit) finalTitle = `【${shortUnit}】${finalTitle}`
    }

    const shortDateModules = ['基层动态', '救援速递', '调研专栏', '推荐阅读', '媒体聚焦', '精品文摘', '资料库']
    const dateFinal =
      shortDateModules.includes(form.module as string) && form.date.length === 10
        ? form.date.slice(5)
        : form.date

    const finalStatus: Article['status'] = isOfficeDirect
      ? '办公室直报'
      : auth.canAudit
        ? '已发布'
        : '待大队审核'

    const payload: Partial<Article> = {
      title: finalTitle,
      date: dateFinal,
      module: form.module,
      grassrootsTab: form.module === '基层动态' ? form.grassrootsTab : undefined,
      category: form.category,
      unit: form.unit,
      author: form.author,
      isNew: form.isNew,
      docNo: isOfficeDirect ? form.docNo : undefined,
      content: form.content,
      images: form.images.length ? form.images : undefined,
      status: finalStatus,
    }

    if (editingId.value !== null) {
      await admin.updateArticle(editingId.value, payload)
      ElMessage.success(`已保存：《${finalTitle}》`)
      editingId.value = null
    } else {
      await admin.createArticle(payload)
      ElMessage.success(
        finalStatus === '办公室直报'
          ? `办公室直报成功：《${finalTitle}》已直接发布`
          : finalStatus === '已发布'
            ? `发布成功：《${finalTitle}》`
            : `上报成功：《${finalTitle}》已进入待审核队列`,
      )
    }

    form.title = ''
    form.content = ''
    form.images = []
    form.docNo = ''
    form.officeDirect = false
    form.isNew = false
  } catch (e) {
    console.error(e)
    ElMessage.error('提交失败')
  } finally {
    submitting.value = false
  }
}
</script>
