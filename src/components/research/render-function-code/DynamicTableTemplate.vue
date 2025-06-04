<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 动态表格数据
interface TableColumn {
  key: string
  title: string
  width?: number
  sortable?: boolean
  filters?: { text: string; value: any }[]
  customRender?: boolean
}

interface DataItem {
  id: number
  name: string
  age: number
  address: string
  tags: string[]
  status: 'active' | 'inactive'
  [key: string]: any
}

// 列定义
const columns = ref<TableColumn[]>([
  {
    key: 'name',
    title: '姓名',
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    sortable: true,
    filters: [
      { text: '大于30', value: 30 },
      { text: '小于30', value: -30 },
    ],
  },
  {
    key: 'address',
    title: '地址',
  },
  {
    key: 'tags',
    title: '标签',
    customRender: true,
  },
  {
    key: 'status',
    title: '状态',
    customRender: true,
    filters: [
      { text: '活跃', value: 'active' },
      { text: '非活跃', value: 'inactive' },
    ],
  },
])

// 生成测试数据
const generateData = (count = 20): DataItem[] => {
  const data: DataItem[] = []
  const addresses = ['北京市', '上海市', '广州市', '深圳市', '杭州市']
  const tags = ['开发', '设计', '测试', '产品', '运营']
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive']

  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      age: 20 + Math.floor(Math.random() * 30),
      address: addresses[Math.floor(Math.random() * addresses.length)],
      tags: Array(1 + Math.floor(Math.random() * 3))
        .fill(0)
        .map(() => tags[Math.floor(Math.random() * tags.length)]),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    })
  }
  return data
}

// 表格状态
const tableState = reactive({
  data: generateData(),
  sortColumn: '',
  sortDirection: 'asc',
  filters: {} as Record<string, any>,
})

// 筛选和排序后的数据
const processedData = computed(() => {
  let result = [...tableState.data]

  // 应用筛选
  Object.entries(tableState.filters).forEach(([column, value]) => {
    if (value !== undefined && value !== null) {
      if (column === 'age' && typeof value === 'number') {
        // 年龄筛选特殊处理
        if (value > 0) {
          result = result.filter((item) => item.age > value)
        } else if (value < 0) {
          result = result.filter((item) => item.age < Math.abs(value))
        }
      } else if (column === 'status') {
        result = result.filter((item) => item.status === value)
      }
    }
  })

  // 应用排序
  if (tableState.sortColumn) {
    result.sort((a, b) => {
      let valueA = a[tableState.sortColumn]
      let valueB = b[tableState.sortColumn]

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (valueA < valueB) return tableState.sortDirection === 'asc' ? -1 : 1
      if (valueA > valueB) return tableState.sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

// 处理排序
const handleSort = (column: string) => {
  // 检查列是否可排序
  const columnObj = columns.value.find((c) => c.key === column)
  if (!columnObj || !columnObj.sortable) return

  if (tableState.sortColumn === column) {
    // 切换排序方向
    tableState.sortDirection = tableState.sortDirection === 'asc' ? 'desc' : 'asc'
  } else {
    tableState.sortColumn = column
    tableState.sortDirection = 'asc'
  }
}

// 处理筛选
const handleFilter = (column: string, value: any) => {
  tableState.filters[column] = value
}

// 重置表格
const resetTable = () => {
  tableState.sortColumn = ''
  tableState.sortDirection = 'asc'
  tableState.filters = {}
}

// 复制代码功能
const copyCode = async () => {
  const codeContent = `<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <!-- 动态生成表头 -->
          <th v-for="column in columns" :key="column.key">
            <div class="th-content">
              <span>{{ column.title }}</span>
              
              <!-- 排序图标 -->
              <span 
                v-if="column.sortable" 
                @click="handleSort(column.key)"
                class="sort-icon"
              >
                {{ tableState.sortColumn === column.key 
                    ? (tableState.sortDirection === 'asc' ? '↑' : '↓') 
                    : '↕' }}
              </span>
              
              <!-- 筛选图标 -->
              <span 
                v-if="column.filters" 
                class="filter-icon"
                @click="toggleFilter(column.key)"
              >
                🔽
              </span>
              
              <!-- 筛选下拉 -->
              <div 
                v-if="column.filters && activeFilter === column.key"
                class="filter-dropdown"
              >
                <div 
                  v-for="filter in column.filters"
                  :key="filter.value"
                  @click="handleFilter(column.key, filter.value)"
                  class="filter-option"
                >
                  {{ filter.text }}
                </div>
                <div @click="handleFilter(column.key, null)" class="filter-option">
                  全部
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 根据处理后的数据动态生成行 -->
        <tr v-for="item in processedData" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            <!-- 普通单元格 -->
            <template v-if="!column.customRender">
              {{ item[column.key] }}
            </template>
            
            <!-- 自定义渲染单元格 -->
            <template v-else>
              <!-- 标签渲染 -->
              <template v-if="column.key === 'tags'">
                <span 
                  v-for="tag in item.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </template>
              
              <!-- 状态渲染 -->
              <template v-else-if="column.key === 'status'">
                <span 
                  class="status-badge"
                  :class="item.status"
                >
                  {{ item.status === 'active' ? '活跃' : '非活跃' }}
                </span>
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>`

  try {
    await navigator.clipboard.writeText(codeContent)
    console.log('代码已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 全屏功能
const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}
</script>

<template>
  <div class="dynamic-table-template">
    <div class="code-display" :class="{ fullscreen: isFullscreen }">
      <div class="code-header">
        <span class="code-language">Vue Dynamic Table Template</span>
        <div class="code-actions">
          <button
            class="action-button"
            @click="toggleFullscreen"
            :title="isFullscreen ? '退出全屏' : '全屏显示'"
          >
            {{ isFullscreen ? '⤴' : '⤢' }}
          </button>
          <button class="action-button" @click="copyCode" title="复制代码">📋</button>
        </div>
      </div>
      <pre v-pre><code>
&lt;template&gt;
  &lt;div class="table-container"&gt;
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;!-- 动态生成表头 --&gt;
          &lt;th v-for="column in columns" :key="column.key"&gt;
            &lt;div class="th-content"&gt;
              &lt;span&gt;{{ column.title }}&lt;/span&gt;
              
              &lt;!-- 排序图标 --&gt;
              &lt;span 
                v-if="column.sortable" 
                @click="handleSort(column.key)"
                class="sort-icon"
              &gt;
                {{ tableState.sortColumn === column.key 
                    ? (tableState.sortDirection === 'asc' ? '↑' : '↓') 
                    : '↕' }}
              &lt;/span&gt;
              
              &lt;!-- 筛选菜单 --&gt;
              &lt;div v-if="column.filters" class="filter-dropdown"&gt;
                &lt;span class="filter-icon"&gt;☰&lt;/span&gt;
                &lt;div class="dropdown-content"&gt;
                  &lt;div 
                    v-for="filter in column.filters" 
                    :key="filter.value"
                    @click="handleFilter(column.key, filter.value)"
                  &gt;
                    {{ filter.text }}
                  &lt;/div&gt;
                  &lt;div @click="handleFilter(column.key, null)"&gt;清除筛选&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      
      &lt;tbody&gt;
        &lt;!-- 根据处理后的数据动态生成行 --&gt;
        &lt;tr v-for="item in processedData" :key="item.id"&gt;
          &lt;td v-for="column in columns" :key="column.key"&gt;
            &lt;!-- 普通单元格 --&gt;
            &lt;template v-if="!column.customRender"&gt;
              {{ item[column.key] }}
            &lt;/template&gt;
            
            &lt;!-- 自定义渲染单元格 --&gt;
            &lt;template v-else&gt;
              &lt;!-- 标签渲染 --&gt;
              &lt;template v-if="column.key === 'tags'"&gt;
                &lt;span 
                  v-for="tag in item.tags" 
                  :key="tag"
                  class="tag"
                &gt;
                  {{ tag }}
                &lt;/span&gt;
              &lt;/template&gt;
              
              &lt;!-- 状态渲染 --&gt;
              &lt;template v-else-if="column.key === 'status'"&gt;
                &lt;span 
                  class="status-badge"
                  :class="item.status"
                &gt;
                  {{ item.status === 'active' ? '活跃' : '非活跃' }}
                &lt;/span&gt;
              &lt;/template&gt;
            &lt;/template&gt;
          &lt;/td&gt;
        &lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
&lt;/template&gt;
      </code></pre>
    </div>

    <div class="demo-result">
      <h4>运行效果:</h4>
      <div class="actions">
        <button @click="resetTable">重置表格</button>
        <p>提示: 点击列标题排序，点击筛选图标筛选</p>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <!-- 动态生成表头 -->
              <th v-for="column in columns" :key="column.key">
                <div class="th-content">
                  <span>{{ column.title }}</span>

                  <!-- 排序图标 -->
                  <span v-if="column.sortable" @click="handleSort(column.key)" class="sort-icon">
                    {{
                      tableState.sortColumn === column.key
                        ? tableState.sortDirection === 'asc'
                          ? '↑'
                          : '↓'
                        : '↕'
                    }}
                  </span>

                  <!-- 筛选菜单 -->
                  <div v-if="column.filters" class="filter-dropdown">
                    <span class="filter-icon">☰</span>
                    <div class="dropdown-content">
                      <div
                        v-for="filter in column.filters"
                        :key="filter.value"
                        @click="handleFilter(column.key, filter.value)"
                      >
                        {{ filter.text }}
                      </div>
                      <div @click="handleFilter(column.key, null)">清除筛选</div>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- 根据处理后的数据动态生成行 -->
            <tr v-for="item in processedData" :key="item.id">
              <td v-for="column in columns" :key="column.key">
                <!-- 普通单元格 -->
                <template v-if="!column.customRender">
                  {{ item[column.key] }}
                </template>

                <!-- 自定义渲染单元格 -->
                <template v-else>
                  <!-- 标签渲染 -->
                  <template v-if="column.key === 'tags'">
                    <span v-for="tag in item.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </template>

                  <!-- 状态渲染 -->
                  <template v-else-if="column.key === 'status'">
                    <span class="status-badge" :class="item.status">
                      {{ item.status === 'active' ? '活跃' : '非活跃' }}
                    </span>
                  </template>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="template-bottleneck">
        <h4>模板系统的瓶颈:</h4>
        <ul>
          <li>多层条件嵌套导致模板复杂难以维护</li>
          <li>自定义渲染需要多层template嵌套</li>
          <li>动态列与高度定制化的表格结构，模板表达能力有限</li>
          <li>复杂表格业务逻辑混杂在模板中，可读性差</li>
          <li>大量数据下，频繁的条件检查可能导致性能问题</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dynamic-table-template {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow: hidden; /* Prevents content overflow */
  max-width: 1700px; /* Increase width for better code display */
  margin: 0 auto;
}

.code-display {
  background-color: #2d3748;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #4a5568;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Code header styling */
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #1a202c;
  border-bottom: 1px solid #4a5568;
  border-radius: 8px 8px 0 0;
  margin: -20px -20px 0 -20px;
}

.code-language {
  color: #90cdf4;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  background-color: #2d3748;
  color: #e2e8f0;
}

/* Fullscreen styles */
.code-display.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  max-width: none;
  margin: 0;
  border-radius: 0;
  height: 100vh;
  width: 100vw;
}

.code-display.fullscreen .code-header {
  border-radius: 0;
}

.code-display.fullscreen pre {
  height: calc(100vh - 60px);
  overflow-y: auto;
}

/* Line numbers for code display */
.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  counter-reset: line;
  padding-left: 40px;
  position: relative;
}

.code-display pre::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 35px;
  background-color: #1a202c;
  border-right: 1px solid #4a5568;
}

.code-display code::before {
  counter-increment: line;
  content: counter(line);
  position: absolute;
  left: -35px;
  width: 30px;
  text-align: right;
  color: #718096;
  font-size: 12px;
  line-height: 1.6;
  padding-right: 8px;
}

.demo-result {
  background-color: var(--color-background-mute, #f5f5f5);
  padding: 15px;
  border-radius: 5px;
}

@media (prefers-color-scheme: dark) {
  .demo-result {
    background-color: var(--color-background-mute, #2d3748);
    border: 1px solid #4a5568;
  }
}

.demo-result h4 {
  margin-top: 0;
  color: var(--color-heading, #2c3e50);
  margin-bottom: 10px;
}

.actions {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.actions p {
  margin: 0;
  font-size: 0.9em;
  font-style: italic;
}

button {
  padding: 6px 12px;
  background-color: var(--color-primary, #3a8ee6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.table-container {
  margin-top: 15px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
  max-width: 100%;
  table-layout: fixed; /* Prevents column width from changing based on content */
}

th,
td {
  border: 1px solid var(--color-border, #ddd);
  padding: 8px 12px;
  text-align: left;
  word-wrap: break-word; /* Allow long text to wrap */
  overflow-wrap: break-word;
  background-color: var(--color-background, #fff);
  color: var(--color-text, #333);
}

th {
  background-color: var(--color-background-soft, #f0f0f0);
  position: sticky;
  top: 0;
  z-index: 10;
}

@media (prefers-color-scheme: dark) {
  th,
  td {
    border-color: var(--color-border, #4a5568);
    background-color: var(--color-background, #1a202c);
    color: var(--color-text, #e2e8f0);
  }

  th {
    background-color: var(--color-background-soft, #2d3748);
  }
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-icon {
  cursor: pointer;
  margin-left: 5px;
  font-size: 0.9em;
}

.sort-icon:hover {
  color: var(--color-primary, #3a8ee6);
}

.filter-dropdown {
  position: relative;
  display: inline-block;
  margin-left: 5px;
}

.filter-icon {
  cursor: pointer;
  font-size: 0.8em;
}

.filter-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-background, white);
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 20;
  border-radius: 4px;
  right: 0;
  border: 1px solid var(--color-border, #ddd);
}

.dropdown-content div {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
  color: var(--color-text, #333);
}

.dropdown-content div:hover {
  background-color: var(--color-background-mute, #f5f5f5);
}

@media (prefers-color-scheme: dark) {
  .dropdown-content {
    background-color: var(--color-background, #2d3748);
    border-color: var(--color-border, #4a5568);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .dropdown-content div {
    color: var(--color-text, #e2e8f0);
  }

  .dropdown-content div:hover {
    background-color: var(--color-background-mute, #4a5568);
  }
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  background-color: var(--color-primary-light, #e8f0fe);
  border-radius: 12px;
  font-size: 0.85em;
  color: var(--color-primary, #3a8ee6);
}

@media (prefers-color-scheme: dark) {
  .tag {
    background-color: rgba(58, 142, 230, 0.2);
    color: #90cdf4;
  }
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

.status-badge.active {
  background-color: var(--success-light, #e3f7e8);
  color: var(--success, #52c41a);
}

.status-badge.inactive {
  background-color: var(--error-light, #fff1f0);
  color: var(--error, #ff4d4f);
}

@media (prefers-color-scheme: dark) {
  .status-badge.active {
    background-color: rgba(82, 196, 26, 0.2);
    color: #95de64;
  }

  .status-badge.inactive {
    background-color: rgba(255, 77, 79, 0.2);
    color: #ff7875;
  }
}

.template-bottleneck {
  margin-top: 20px;
  background-color: var(--error-light, #fff1f0);
  border-left: 4px solid var(--error, #ff4d4f);
  padding: 12px 15px;
  border-radius: 0 4px 4px 0;
}

.template-bottleneck h4 {
  margin: 0 0 10px 0;
  color: var(--error-dark, #cf1322);
}

@media (prefers-color-scheme: dark) {
  .template-bottleneck {
    background-color: rgba(255, 77, 79, 0.1);
    border-left-color: #ff7875;
  }

  .template-bottleneck h4 {
    color: #ff7875;
  }
}

.template-bottleneck ul {
  margin: 0;
  padding-left: 18px;
}

.template-bottleneck li {
  margin-bottom: 6px;
  font-size: 0.9em;
}

/* Custom media queries for wide screens */
@media (min-width: 1700px) {
  .code-display {
    max-height: 600px; /* More space for code on large screens */
  }

  .table-container {
    max-width: 90%; /* Prevent tables from stretching too wide */
    margin: 15px auto;
  }

  .template-bottleneck {
    max-width: 90%;
    margin: 20px auto;
  }
}

/* Medium-wide screens */
@media (min-width: 1200px) and (max-width: 1399px) {
  .code-display {
    max-height: 500px;
  }

  .table-container {
    max-width: 95%;
    margin: 15px auto;
  }
}
</style>
