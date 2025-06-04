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
        <div class="code-display">
          <pre v-pre><code>{{ TemplateTreeNodeCode }}</code></pre>
        </div>
      </div>

      <div class="code-section">
        <h3>Render函数递归（灵活）</h3>
        <p>
          Render函数可以直接递归调用自身，代码更直观清晰，灵活性更高，
          尤其在处理深层嵌套结构时，控制力和性能都有优势。
        </p>
        <div class="code-display">
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
  min-width: 300px;
  max-width: calc(50% - 10px); /* Prevents excessive width on large screens */
  background-color: var(--color-background-mute, #f7f7f7);
  padding: 15px;
  border-radius: 8px;
}

.code-display {
  background-color: #1e1e1e;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
  margin-top: 10px;
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
  font-size: 0.9em;
  white-space: pre-wrap;
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
@media (min-width: 1400px) {
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
