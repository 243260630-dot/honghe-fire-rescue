<template>
  <div class="simple-manage">
    <!-- 标题栏 -->
    <div class="page-header">
      <h2 class="page-title">{{ title }}</h2>
      <el-button type="primary" :icon="Plus" @click="openDialog()">新增</el-button>
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
      <el-table-column
        v-for="col in columns"
        :key="col.key"
        :prop="col.key"
        :label="col.label"
        :min-width="col.type === 'textarea' ? 220 : 140"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <!-- color 类型：渲染颜色预览 -->
          <template v-if="col.type === 'color'">
            <div class="color-preview" :style="{ background: row[col.key] }"></div>
            <span>{{ row[col.key] }}</span>
          </template>
          <!-- select 类型：渲染选项标签 -->
          <template v-else-if="col.type === 'select' && col.options">
            {{ getOptionLabel(col.options, row[col.key]) }}
          </template>
          <!-- date 类型 -->
          <template v-else-if="col.type === 'date'">
            {{ row[col.key] }}
          </template>
          <!-- 纯文本 -->
          <template v-else>
            {{ row[col.key] }}
          </template>
        </template>
      </el-table-column>
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
      :title="editingId ? '编辑' : '新增'"
      width="560px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="90px"
        @submit.prevent
      >
        <el-form-item
          v-for="field in formFields"
          :key="field.key"
          :label="field.label"
          :prop="field.key"
        >
          <!-- select -->
          <el-select
            v-if="field.type === 'select'"
            v-model="form[field.key]"
            :placeholder="`请选择${field.label}`"
            style="width: 100%"
          >
            <el-option
              v-for="opt in field.options || []"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>

          <!-- number -->
          <el-input-number
            v-else-if="field.type === 'number'"
            v-model="form[field.key]"
            :min="0"
            style="width: 100%"
          />

          <!-- date -->
          <el-date-picker
            v-else-if="field.type === 'date'"
            v-model="form[field.key]"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="`请选择${field.label}`"
            style="width: 100%"
          />

          <!-- color -->
          <el-input
            v-else-if="field.type === 'color'"
            v-model="form[field.key]"
            :placeholder="`例如 linear-gradient(135deg, #e8541e, #c44412)`"
          >
            <template #prepend>
              <div
                class="color-mini"
                :style="{ background: form[field.key] || '#ccc' }"
              ></div>
            </template>
          </el-input>

          <!-- textarea -->
          <el-input
            v-else-if="field.type === 'textarea'"
            v-model="form[field.key]"
            type="textarea"
            :rows="3"
            :placeholder="`请输入${field.label}`"
          />

          <!-- default: text -->
          <el-input
            v-else
            v-model="form[field.key]"
            :placeholder="`请输入${field.label}`"
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
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

export interface FieldOption {
  value: string | number
  label: string
}

export interface ColumnDef {
  key: string
  label: string
  type?: 'text' | 'select' | 'number' | 'date' | 'color' | 'textarea'
  options?: FieldOption[]
}

export interface FormFieldDef {
  key: string
  label: string
  type: 'text' | 'select' | 'number' | 'date' | 'color' | 'textarea'
  required?: boolean
  options?: FieldOption[]
  default?: any
}

const props = defineProps<{
  title: string
  apiPath: string
  columns: ColumnDef[]
  formFields: FormFieldDef[]
}>()

// ===== 工具 =====
function getOptionLabel(options: FieldOption[], value: any): string {
  const found = options.find((o) => o.value === value)
  return found ? found.label : String(value ?? '')
}

// ===== 列表 =====
const list = ref<any[]>([])
const loading = ref(false)

async function loadList() {
  loading.value = true
  try {
    const res = await axios.get(`/api/${props.apiPath}`)
    list.value = Array.isArray(res) ? res : res.data || []
  } catch (e) {
    console.error(e)
    ElMessage.error(`加载${props.title}失败`)
  } finally {
    loading.value = false
  }
}

// ===== 对话框 =====
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const submitting = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<Record<string, any>>({})

const formRules = computed<FormRules>(() => {
  const rules: FormRules = {}
  props.formFields.forEach((f) => {
    if (f.required) {
      rules[f.key] = [
        {
          required: true,
          message: f.type === 'select' ? `请选择${f.label}` : `请输入${f.label}`,
          trigger: f.type === 'select' || f.type === 'date' ? 'change' : 'blur',
        },
      ]
    }
  })
  return rules
})

function resetForm() {
  // 清空
  Object.keys(form).forEach((k) => delete form[k])
  // 用默认值填充
  props.formFields.forEach((f) => {
    if (f.default !== undefined) {
      form[f.key] = f.default
    } else if (f.type === 'number') {
      form[f.key] = 0
    } else if (f.type === 'date') {
      form[f.key] = new Date().toISOString().slice(0, 10)
    } else {
      form[f.key] = ''
    }
  })
}

function openDialog(row?: any) {
  if (row) {
    editingId.value = row.id
    resetForm()
    props.formFields.forEach((f) => {
      if (row[f.key] !== undefined) {
        form[f.key] = row[f.key]
      }
    })
  } else {
    editingId.value = null
    resetForm()
  }
  dialogVisible.value = true
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      // 清理空值
      const payload: any = {}
      props.formFields.forEach((f) => {
        const v = form[f.key]
        if (v !== '' && v !== undefined && v !== null) {
          payload[f.key] = v
        }
      })

      if (editingId.value) {
        await axios.put(`/api/${props.apiPath}/${editingId.value}`, payload)
        ElMessage.success('保存成功')
      } else {
        await axios.post(`/api/${props.apiPath}`, payload)
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
    const label =
      row.title || row.name || row.unit || `#${row.id}`
    await ElMessageBox.confirm(
      `确定要删除 "${label}" 吗？此操作不可恢复。`,
      '删除确认',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    await axios.delete(`/api/${props.apiPath}/${row.id}`)
    ElMessage.success('删除成功')
    loadList()
  } catch {
    // 用户取消
  }
}

onMounted(loadList)
</script>

<style scoped>
.simple-manage {
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

/* 颜色预览 */
.color-preview {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 8px;
  border: 1px solid #dbe3ee;
}

.color-mini {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid #dbe3ee;
}
</style>
