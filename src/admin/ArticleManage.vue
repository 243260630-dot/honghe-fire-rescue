<template>
  <div class="article-manage">
    <!-- 标题栏 -->
    <div class="page-header">
      <h2 class="page-title">文章管理</h2>
      <el-button type="primary" :icon="Plus" @click="openDialog()">新增文章</el-button>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-select v-model="filter.category" placeholder="全部分类" clearable style="width: 160px">
        <el-option
          v-for="opt in categoryOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>

      <el-select
        v-model="filter.subCategory"
        placeholder="全部子分类"
        clearable
        :disabled="filter.category !== 'grassroots'"
        style="width: 160px"
      >
        <el-option
          v-for="opt in subCategoryOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>

      <el-input
        v-model="filter.keyword"
        placeholder="搜索标题关键词"
        clearable
        style="width: 220px"
        :prefix-icon="Search"
        @clear="loadList"
        @keyup.enter="loadList"
      />

      <el-button type="primary" plain :icon="Search" @click="loadList">查询</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="list"
      v-loading="loading"
      stripe
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="title" label="标题" min-width="240" show-overflow-tooltip />
      <el-table-column label="分类" width="120">
        <template #default="{ row }">
          <el-tag :type="getCategoryTagType(row.category)" size="small">
            {{ getCategoryLabel(row.category) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="子分类" width="120">
        <template #default="{ row }">
          {{ row.subCategory ? getSubCategoryLabel(row.subCategory) : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" :icon="Edit" @click="openDialog(row)">
            编辑
          </el-button>
          <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 创建/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑文章' : '新增文章'"
      width="640px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="80px"
        @submit.prevent
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类" style="width: 100%" @change="onCategoryChange">
            <el-option
              v-for="opt in categoryOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="form.category === 'grassroots'"
          label="子分类"
          prop="subCategory"
        >
          <el-select v-model="form.subCategory" placeholder="请选择子分类" style="width: 100%">
            <el-option
              v-for="opt in subCategoryOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="来源">
          <el-input v-model="form.source" placeholder="例如：央视、云南日报" />
        </el-form-item>

        <el-form-item label="地点">
          <el-input v-model="form.location" placeholder="例如：建水县坡头乡" />
        </el-form-item>

        <el-form-item label="摘要">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ editingId ? '保存' : '创建' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'

// ===== 分类配置 =====
const categoryMap: Record<string, string> = {
  news: '消防要闻',
  org: '队伍建设',
  supervision: '监督执法',
  recommend: '推荐文章',
  rescue: '救援动态',
  research: '调研思考',
  library: '资料库',
  media: '媒体聚焦',
  excerpt: '文艺副刊',
  grassroots: '基层动态',
}

const categoryTagColors: Record<string, string> = {
  news: '',
  org: 'success',
  supervision: 'warning',
  recommend: 'danger',
  rescue: 'danger',
  research: 'info',
  library: 'info',
  media: 'warning',
  excerpt: 'success',
  grassroots: '',
}

const subCategoryMap: Record<string, string> = {
  training: '训练演练',
  management: '队伍管理',
  politics: '政治工作',
  logistics: '后勤保障',
  law: '执法办案',
  education: '宣传教育',
  info: '信息化建设',
}

const categoryOptions = Object.entries(categoryMap).map(([value, label]) => ({ value, label }))
const subCategoryOptions = Object.entries(subCategoryMap).map(([value, label]) => ({ value, label }))

function getCategoryLabel(v: string) {
  return categoryMap[v] || v
}
function getCategoryTagType(v: string) {
  return categoryTagColors[v] as any || 'info'
}
function getSubCategoryLabel(v: string) {
  return subCategoryMap[v] || v
}

// ===== 列表 & 筛选 =====
const list = ref<any[]>([])
const loading = ref(false)

const filter = reactive({
  category: '',
  subCategory: '',
  keyword: '',
})

async function loadList() {
  loading.value = true
  try {
    const params: any = { limit: 50 }
    if (filter.category) params.category = filter.category
    if (filter.subCategory) params.subCategory = filter.subCategory
    if (filter.keyword) params.keyword = filter.keyword

    const res = await axios.get('/api/articles', { params })
    list.value = Array.isArray(res) ? res : res.data || []
  } catch (e) {
    console.error(e)
    ElMessage.error('加载文章列表失败')
  } finally {
    loading.value = false
  }
}

// ===== 对话框 =====
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const submitting = ref(false)
const formRef = ref<FormInstance>()

const defaultForm = () => ({
  title: '',
  category: 'news',
  subCategory: '',
  date: new Date().toISOString().slice(0, 10),
  source: '',
  location: '',
  summary: '',
})

const form = reactive(defaultForm())

const formRules: FormRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  subCategory: [
    {
      validator: (_rule, value, callback) => {
        if (form.category === 'grassroots' && !value) {
          callback(new Error('请选择子分类'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
}

function onCategoryChange() {
  if (form.category !== 'grassroots') {
    form.subCategory = ''
  }
}

function openDialog(row?: any) {
  if (row) {
    editingId.value = row.id
    Object.assign(form, {
      title: row.title || '',
      category: row.category || 'news',
      subCategory: row.subCategory || '',
      date: row.date || new Date().toISOString().slice(0, 10),
      source: row.source || '',
      location: row.location || '',
      summary: row.summary || '',
    })
  } else {
    editingId.value = null
    Object.assign(form, defaultForm())
  }
  dialogVisible.value = true
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      const payload: any = { ...form }
      if (!payload.subCategory) delete payload.subCategory
      if (!payload.source) delete payload.source
      if (!payload.location) delete payload.location
      if (!payload.summary) delete payload.summary

      if (editingId.value) {
        await axios.put(`/api/articles/${editingId.value}`, payload)
        ElMessage.success('保存成功')
      } else {
        await axios.post('/api/articles', payload)
        ElMessage.success('创建成功')
      }
      dialogVisible.value = false
      loadList()
    } catch (e) {
      console.error(e)
      ElMessage.error('操作失败')
    } finally {
      submitting.value = false
    }
  })
}

async function handleDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除文章 "${row.title}" 吗？此操作不可恢复。`,
      '删除确认',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    await axios.delete(`/api/articles/${row.id}`)
    ElMessage.success('删除成功')
    loadList()
  } catch {
    // 用户取消
  }
}

onMounted(loadList)
</script>

<style scoped>
.article-manage {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #16233a;
}

/* ===== 筛选栏 ===== */
.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
</style>
