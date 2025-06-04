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
</script>

<template>
  <div class="dynamic-table-template">
    <div class="code-display">
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
  max-width: 1200px; /* Limit width on large screens */
  margin: 0 auto;
}

.code-display {
  background-color: #1e1e1e;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  color: #d4d4d4;
  font-family: monospace;
  line-height: 1.5;
  font-size: 0.85em;
}

.demo-result {
  background-color: var(--color-background-mute, #f5f5f5);
  padding: 15px;
  border-radius: 5px;
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
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
  word-wrap: break-word; /* Allow long text to wrap */
  overflow-wrap: break-word;
}

th {
  background-color: #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
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
  background-color: white;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 20;
  border-radius: 4px;
  right: 0;
}

.dropdown-content div {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
}

.dropdown-content div:hover {
  background-color: #f5f5f5;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  background-color: #e8f0fe;
  border-radius: 12px;
  font-size: 0.85em;
  color: #3a8ee6;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

.status-badge.active {
  background-color: #e3f7e8;
  color: #52c41a;
}

.status-badge.inactive {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.template-bottleneck {
  margin-top: 20px;
  background-color: #fff1f0;
  border-left: 4px solid #ff4d4f;
  padding: 12px 15px;
  border-radius: 0 4px 4px 0;
}

.template-bottleneck h4 {
  margin: 0 0 10px 0;
  color: #cf1322;
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
@media (min-width: 1400px) {
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
