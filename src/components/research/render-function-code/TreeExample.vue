<script setup lang="ts">
import { ref, h } from 'vue'

// 定义树节点类型
interface TreeNode {
  id: number
  label: string
  children?: TreeNode[]
  expanded?: boolean
}

// 示例数据
const treeData = ref<TreeNode[]>([
  {
    id: 1,
    label: '根节点 1',
    expanded: true,
    children: [
      {
        id: 11,
        label: '子节点 1-1',
        expanded: true,
        children: [
          { id: 111, label: '子节点 1-1-1' },
          { id: 112, label: '子节点 1-1-2' },
        ],
      },
      { id: 12, label: '子节点 1-2' },
    ],
  },
  {
    id: 2,
    label: '根节点 2',
    children: [
      { id: 21, label: '子节点 2-1' },
      {
        id: 22,
        label: '子节点 2-2',
        children: [{ id: 221, label: '子节点 2-2-1' }],
      },
    ],
  },
])

// 节点切换展开/折叠状态
const toggleNode = (node: TreeNode) => {
  node.expanded = !node.expanded
}

// 模板版本：需要命名组件才能递归
// 仅演示，实际代码需要在 .vue 文件中
const TemplateTreeNodeCode = `
<!-- 递归模板组件 -->
<template>
  <div class="tree-node">
    <div 
      class="node-content"
      @click="toggleNode(node)"
    >
      <span v-if="node.children && node.children.length" class="node-toggle">
        {{ node.expanded ? '▼' : '►' }}
      </span>
      {{ node.label }}
    </div>
    <div v-if="node.expanded && node.children" class="node-children">
      <template-tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>
`

// Render函数实现的树形组件
const RenderTreeNode = (props: { node: TreeNode }) => {
  const { node } = props

  // 递归渲染子节点
  const renderChildren = () => {
    if (node.expanded && node.children && node.children.length > 0) {
      return h(
        'div',
        { class: 'node-children' },
        node.children.map((child) =>
          h(RenderTreeNode, {
            node: child,
            key: child.id,
          }),
        ),
      )
    }
    return null
  }

  return h('div', { class: 'tree-node' }, [
    h(
      'div',
      {
        class: 'node-content',
        onClick: () => toggleNode(node),
      },
      [
        // 展开/折叠图标
        node.children && node.children.length > 0
          ? h('span', { class: 'node-toggle' }, node.expanded ? '▼' : '►')
          : null,
        // 节点标签
        ' ' + node.label,
      ],
    ),
    // 递归渲染子节点
    renderChildren(),
  ])
}

const RenderTreeNodeCode = `
// Render函数实现的树形组件
const RenderTreeNode = (props: { node: TreeNode }) => {
  const { node } = props
  
  // 递归渲染子节点
  const renderChildren = () => {
    if (node.expanded && node.children && node.children.length > 0) {
      return h('div', { class: 'node-children' }, 
        node.children.map(child => h(RenderTreeNode, { 
          node: child,
          key: child.id
        }))
      )
    }
    return null
  }
  
  return h('div', { class: 'tree-node' }, [
    h('div', { 
      class: 'node-content',
      onClick: () => toggleNode(node)
    }, [
      // 展开/折叠图标
      node.children && node.children.length > 0 
        ? h('span', { class: 'node-toggle' }, node.expanded ? '▼' : '►')
        : null,
      // 节点标签
      ' ' + node.label
    ]),
    // 递归渲染子节点
    renderChildren()
  ])
}
`

// 复制代码功能
const copyCode = async () => {
  const codeContent = `// Template版本的递归树组件
<template>
  <div class="tree-container">
    <div v-for="node in treeData" :key="node.id">
      <TreeNode :node="node" />
    </div>
  </div>
</template>

// Render函数实现的树形组件
const RenderTreeNode = (props: { node: TreeNode }) => {
  const { node } = props
  
  // 递归渲染子节点
  const renderChildren = () => {
    if (node.expanded && node.children && node.children.length > 0) {
      return h('div', { class: 'node-children' }, 
        node.children.map(child => h(RenderTreeNode, { 
          node: child,
          key: child.id
        }))
      )
    }
    return null
  }
  
  return h('div', { class: 'tree-node' }, [
    h('div', { 
      class: 'node-content',
      onClick: () => toggleNode(node)
    }, [
      // 展开/折叠图标
      node.children && node.children.length > 0 
        ? h('span', { class: 'node-toggle' }, node.expanded ? '▼' : '►')
        : null,
      // 节点标签
      ' ' + node.label
    ]),
    // 递归渲染子节点
    renderChildren()
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
</script>

<template>
  <div class="tree-example">
    <div class="tree-comparison">
      <div class="code-section">
        <h3>模板递归组件（受限）</h3>
        <p>
          使用模板的递归需要命名组件，且实现复杂的条件逻辑和嵌套层次较为繁琐。
          由于组件必须先声明再使用，递归模板需要特殊处理。
        </p>
        <div class="code-display" :class="{ fullscreen: isFullscreen }">
          <div class="code-header">
            <span class="code-language">Vue Template</span>
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
          <pre v-pre><code>{{ TemplateTreeNodeCode }}</code></pre>
        </div>
      </div>

      <div class="code-section">
        <h3>Render函数递归（灵活）</h3>
        <p>
          Render函数可以直接递归调用自身，代码更直观清晰，灵活性更高，
          尤其在处理深层嵌套结构时，控制力和性能都有优势。
        </p>
        <div class="code-display" :class="{ fullscreen: isFullscreen }">
          <div class="code-header">
            <span class="code-language">Vue Render Function</span>
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
          <pre v-pre><code>{{ RenderTreeNodeCode }}</code></pre>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>运行效果（使用Render函数实现）:</h3>
      <div class="tree-container">
        <div v-for="node in treeData" :key="node.id">
          <component :is="RenderTreeNode" :node="node" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-example {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1700px; /* Increase width for better code display */
  margin: 0 auto;
  overflow: hidden; /* Prevents content overflow */
}

.tree-comparison {
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
}

.code-section {
  flex: 1;
  min-width: 450px; /* Increase minimum width for better code display */
  max-width: calc(50% - 10px);
  background-color: var(--color-background-mute, #f7f7f7);
  padding: 15px;
  border-radius: 8px;
}

.code-display {
  background-color: #2d3748;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #4a5568;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

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

/* Remove line numbers for wider code display */
.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-left: 0; /* Remove left padding for more code space */
}

.code-display code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
}

.demo-section {
  background-color: var(--color-background-soft, #f5f5f5);
  border-radius: 8px;
  padding: 15px;
}

.tree-container {
  margin-top: 10px;
}

.tree-node {
  margin-left: 10px;
}

.node-content {
  cursor: pointer;
  padding: 5px 3px;
  border-radius: 3px;
  display: flex;
  align-items: center;
}

.node-content:hover {
  background-color: var(--color-background-mute, #e8e8e8);
}

.node-toggle {
  font-size: 10px;
  display: inline-block;
  width: 14px;
  color: var(--color-primary, #3a8ee6);
}

.node-children {
  margin-left: 20px;
  border-left: 1px dashed var(--color-border, #ccc);
  padding-left: 5px;
}

/* Large screens */
@media (min-width: 1700px) {
  .code-section {
    max-width: calc(50% - 10px);
  }

  .code-display {
    max-height: 600px; /* More space for code on large screens */
  }
}

/* Medium screens */
@media (max-width: 1200px) {
  .code-section {
    max-width: calc(50% - 10px);
  }
}

/* Tablets and small screens */
@media (max-width: 900px) {
  .tree-comparison {
    flex-direction: column;
  }

  .code-section {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
