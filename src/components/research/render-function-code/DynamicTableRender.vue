<script setup lang="ts">
import { ref, reactive, computed, h } from 'vue'

// 动态表格数据
interface TableColumn {
  key: string
  title: string
  width?: number
  sortable?: boolean
  filters?: { text: string; value: any }[]
  customRender?: (value: any, record: DataItem) => any
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

// 列定义 - 使用函数式的自定义渲染
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
    customRender: (tags, _) => {
      // 标签渲染函数
      if (!Array.isArray(tags)) return '-'

      return tags.map((tag) =>
        h(
          'span',
          {
            class: 'tag',
            key: tag,
          },
          tag,
        ),
      )
    },
  },
  {
    key: 'status',
    title: '状态',
    filters: [
      { text: '活跃', value: 'active' },
      { text: '非活跃', value: 'inactive' },
    ],
    customRender: (status, _) => {
      // 状态渲染函数
      return h(
        'span',
        {
          class: ['status-badge', status],
        },
        status === 'active' ? '活跃' : '非活跃',
      )
    },
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
  const col = columns.value.find((c) => c.key === column)
  if (!col || !col.sortable) return

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
  const codeContent = `import { h } from 'vue'

// 使用render函数渲染动态表格
const renderTable = () => {
  const renderHeader = () => {
    return h('thead', [
      h('tr', columns.value.map(column => 
        h('th', {
          key: column.key,
          style: column.width ? { width: column.width + 'px' } : {}
        }, [
          h('div', { class: 'th-content' }, [
            h('span', column.title),
            
            // 排序图标
            column.sortable ? h('span', {
              class: 'sort-icon',
              onClick: () => handleSort(column.key)
            }, tableState.sortColumn === column.key 
                ? (tableState.sortDirection === 'asc' ? '↑' : '↓') 
                : '↕'
            ) : null,
            
            // 筛选图标和下拉
            column.filters ? [
              h('span', {
                class: 'filter-icon',
                onClick: () => toggleFilter(column.key)
              }, '🔽'),
              
              activeFilter.value === column.key ? h('div', {
                class: 'filter-dropdown'
              }, [
                ...column.filters.map(filter => 
                  h('div', {
                    class: 'filter-option',
                    onClick: () => handleFilter(column.key, filter.value)
                  }, filter.text)
                ),
                h('div', {
                  class: 'filter-option',
                  onClick: () => handleFilter(column.key, null)
                }, '全部')
              ]) : null
            ] : null
          ])
        ])
      ))
    ])
  }

  const renderBody = () => {
    return h('tbody', 
      processedData.value.map(item => 
        h('tr', { key: item.id },
          columns.value.map(column => 
            h('td', { key: column.key },
              column.customRender 
                ? column.customRender(item[column.key], item)
                : item[column.key]
            )
          )
        )
      )
    )
  }

  return h('div', { class: 'table-container' }, [
    h('table', [renderHeader(), renderBody()])
  ])
}`

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

// 使用render函数渲染表格
const renderTable = () => {
  // 渲染表头
  const renderHeader = () => {
    return h('thead', [
      h(
        'tr',
        columns.value.map((col) => {
          return h('th', [
            h('div', { class: 'th-content' }, [
              // 标题
              h('span', col.title),

              // 排序图标
              col.sortable
                ? h(
                    'span',
                    {
                      class: 'sort-icon',
                      onClick: () => handleSort(col.key),
                    },
                    tableState.sortColumn === col.key
                      ? tableState.sortDirection === 'asc'
                        ? '↑'
                        : '↓'
                      : '↕',
                  )
                : null,

              // 筛选下拉菜单
              col.filters
                ? h('div', { class: 'filter-dropdown' }, [
                    h('span', { class: 'filter-icon' }, '☰'),
                    h('div', { class: 'dropdown-content' }, [
                      // 筛选选项
                      ...col.filters.map((filter) =>
                        h(
                          'div',
                          {
                            onClick: () => handleFilter(col.key, filter.value),
                          },
                          filter.text,
                        ),
                      ),
                      // 清除筛选选项
                      h(
                        'div',
                        {
                          onClick: () => handleFilter(col.key, null),
                        },
                        '清除筛选',
                      ),
                    ]),
                  ])
                : null,
            ]),
          ])
        }),
      ),
    ])
  }

  // 渲染表格体
  const renderBody = () => {
    return h(
      'tbody',
      processedData.value.map((row) => {
        return h(
          'tr',
          { key: row.id },
          columns.value.map((col) => {
            let cellContent

            // 使用自定义渲染函数或默认渲染
            if (col.customRender) {
              cellContent = col.customRender(row[col.key], row)
            } else {
              cellContent = row[col.key]
            }

            return h('td', { key: col.key }, cellContent)
          }),
        )
      }),
    )
  }

  // 组合表格
  return h('div', { class: 'table-container' }, [h('table', [renderHeader(), renderBody()])])
}

const renderFunctionCode = `
// 使用render函数渲染表格
const renderTable = () => {
  // 渲染表头
  const renderHeader = () => {
    return h('thead', [
      h('tr', columns.value.map(col => {
        return h('th', [
          h('div', { class: 'th-content' }, [
            // 标题
            h('span', col.title),
            
            // 排序图标
            col.sortable 
              ? h('span', {
                  class: 'sort-icon',
                  onClick: () => handleSort(col.key)
                }, tableState.sortColumn === col.key
                   ? (tableState.sortDirection === 'asc' ? '↑' : '↓')
                   : '↕')
              : null,
            
            // 筛选下拉菜单
            col.filters
              ? h('div', { class: 'filter-dropdown' }, [
                  h('span', { class: 'filter-icon' }, '☰'),
                  h('div', { class: 'dropdown-content' }, [
                    // 筛选选项
                    ...col.filters.map(filter => 
                      h('div', {
                        onClick: () => handleFilter(col.key, filter.value)
                      }, filter.text)
                    ),
                    // 清除筛选选项
                    h('div', {
                      onClick: () => handleFilter(col.key, null)
                    }, '清除筛选')
                  ])
                ])
              : null
          ])
        ])
      }))
    ])
  }
  
  // 渲染表格体
  const renderBody = () => {
    return h('tbody', processedData.value.map(row => {
      return h('tr', { key: row.id }, columns.value.map(col => {
        let cellContent
        
        // 使用自定义渲染函数或默认渲染
        if (col.customRender) {
          cellContent = col.customRender(row[col.key], row)
        } else {
          cellContent = row[col.key]
        }
        
        return h('td', { key: col.key }, cellContent)
      }))
    }))
  }
  
  // 组合表格
  return h('div', { class: 'table-container' }, [
    h('table', [
      renderHeader(),
      renderBody()
    ])
  ])
}

// 列定义中使用函数式的自定义渲染
{
  key: 'tags', 
  title: '标签',
  customRender: (tags, _) => {
    if (!Array.isArray(tags)) return '-'
    
    return tags.map(tag => 
      h('span', {
        class: 'tag',
        key: tag
      }, tag)
    )
  }
},
{
  key: 'status',
  title: '状态',
  filters: [...],
  customRender: (status, _) => {
    return h('span', {
      class: ['status-badge', status]
    }, status === 'active' ? '活跃' : '非活跃')
  }
}
`
</script>

<template>
  <div class="dynamic-table-render">
    <div class="code-display" :class="{ fullscreen: isFullscreen }">
      <div class="code-header">
        <span class="code-language">Vue Dynamic Table Render Function</span>
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
      <pre v-pre><code>{{ renderFunctionCode }}</code></pre>
    </div>

    <div class="demo-result">
      <h4>运行效果:</h4>
      <div class="actions">
        <button @click="resetTable">重置表格</button>
        <p>提示: 点击列标题排序，点击筛选图标筛选</p>
      </div>

      <component :is="renderTable" />

      <div class="render-advantages">
        <h4>Render函数的优势:</h4>
        <ul>
          <li>更灵活的动态表格结构控制，无需嵌套多层template</li>
          <li>直接使用函数式的自定义渲染，逻辑更清晰</li>
          <li>可以轻松实现复杂的表格布局，如合并单元格、嵌套表格等</li>
          <li>大数据量下性能更好，不需要执行复杂的模板编译和解析</li>
          <li>更好的代码组织，可以将表格渲染拆分为多个子函数</li>
          <li>更容易实现组件库的表格封装，提供高度可配置的API</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dynamic-table-render {
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
  max-height: none;
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

.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
}

.code-display code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
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

:deep(.table-container) {
  margin-top: 15px;
  overflow-x: auto;
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}

:deep(th),
:deep(td) {
  border: 1px solid var(--color-border, #ddd);
  padding: 8px 12px;
  text-align: left;
  background-color: var(--color-background, #fff);
  color: var(--color-text, #333);
}

:deep(th) {
  background-color: var(--color-background-soft, #f0f0f0);
  position: sticky;
  top: 0;
  z-index: 10;
}

@media (prefers-color-scheme: dark) {
  :deep(th),
  :deep(td) {
    border-color: var(--color-border, #4a5568);
    background-color: var(--color-background, #1a202c);
    color: var(--color-text, #e2e8f0);
  }

  :deep(th) {
    background-color: var(--color-background-soft, #2d3748);
  }
}

:deep(.th-content) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.sort-icon) {
  cursor: pointer;
  margin-left: 5px;
  font-size: 0.9em;
}

:deep(.sort-icon:hover) {
  color: var(--color-primary, #3a8ee6);
}

:deep(.filter-dropdown) {
  position: relative;
  display: inline-block;
  margin-left: 5px;
}

:deep(.filter-icon) {
  cursor: pointer;
  font-size: 0.8em;
}

:deep(.filter-dropdown:hover .dropdown-content) {
  display: block;
}

:deep(.dropdown-content) {
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

:deep(.dropdown-content div) {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
  color: var(--color-text, #333);
}

:deep(.dropdown-content div:hover) {
  background-color: var(--color-background-mute, #f5f5f5);
}

@media (prefers-color-scheme: dark) {
  :deep(.dropdown-content) {
    background-color: var(--color-background, #2d3748);
    border-color: var(--color-border, #4a5568);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  :deep(.dropdown-content div) {
    color: var(--color-text, #e2e8f0);
  }

  :deep(.dropdown-content div:hover) {
    background-color: var(--color-background-mute, #4a5568);
  }
}

:deep(.tag) {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  background-color: var(--color-primary-light, #e8f0fe);
  border-radius: 12px;
  font-size: 0.85em;
  color: var(--color-primary, #3a8ee6);
}

@media (prefers-color-scheme: dark) {
  :deep(.tag) {
    background-color: rgba(58, 142, 230, 0.2);
    color: #90cdf4;
  }
}

:deep(.status-badge) {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

:deep(.status-badge.active) {
  background-color: var(--success-light, #e3f7e8);
  color: var(--success, #52c41a);
}

:deep(.status-badge.inactive) {
  background-color: var(--error-light, #fff1f0);
  color: var(--error, #ff4d4f);
}

@media (prefers-color-scheme: dark) {
  :deep(.status-badge.active) {
    background-color: rgba(82, 196, 26, 0.2);
    color: #95de64;
  }

  :deep(.status-badge.inactive) {
    background-color: rgba(255, 77, 79, 0.2);
    color: #ff7875;
  }
}

.render-advantages {
  margin-top: 20px;
  background-color: var(--info-light, #e6f7ff);
  border-left: 4px solid var(--info, #1890ff);
  padding: 12px 15px;
  border-radius: 0 4px 4px 0;
}

.render-advantages h4 {
  margin: 0 0 10px 0;
  color: var(--info-dark, #0050b3);
}

@media (prefers-color-scheme: dark) {
  .render-advantages {
    background-color: rgba(24, 144, 255, 0.1);
    border-left-color: #40a9ff;
  }

  .render-advantages h4 {
    color: #40a9ff;
  }
}

.render-advantages ul {
  margin: 0;
  padding-left: 18px;
}

.render-advantages li {
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

  .render-advantage {
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
