<script setup lang="ts">
import { h, reactive } from 'vue'

// 定义一个图表数据结构
interface ChartNode {
  id: number
  name: string
  children?: ChartNode[]
  collapsed?: boolean
}

// 动态生成的图表数据
const chartData = reactive<ChartNode>({
  id: 1,
  name: '根节点',
  collapsed: false,
  children: [
    {
      id: 2,
      name: '子节点 1',
      collapsed: false,
      children: [
        { id: 4, name: '子节点 1.1' },
        { id: 5, name: '子节点 1.2' },
      ],
    },
    {
      id: 3,
      name: '子节点 2',
      collapsed: false,
      children: [
        { id: 6, name: '子节点 2.1' },
        {
          id: 7,
          name: '子节点 2.2',
          collapsed: false,
          children: [
            { id: 8, name: '子节点 2.2.1' },
            { id: 9, name: '子节点 2.2.2' },
          ],
        },
      ],
    },
  ],
})

// 用于计算节点样式的 helper
const getNodeStyle = (level: number) => {
  // 获取 CSS 变量，如果不可用则使用后备值
  const bgEven = 'var(--color-background-soft, #f0f8ff)'
  const bgOdd = 'var(--color-background, #f5f5f5)'
  const borderColor = 'var(--color-border, #ddd)'

  return {
    paddingLeft: `${level * 20}px`,
    backgroundColor: level % 2 === 0 ? bgEven : bgOdd,
    borderBottom: `1px solid ${borderColor}`,
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }
}

// 切换节点展开/折叠状态
const toggleCollapse = (node: ChartNode) => {
  if (node.children && node.children.length) {
    node.collapsed = !node.collapsed
  }
}

// 递归渲染树节点 - 这种场景使用 render 函数比模板更清晰
const renderTreeNode = (node: ChartNode, level = 0) => {
  // 节点本身
  const result = [
    h(
      'div',
      {
        key: node.id,
        style: getNodeStyle(level),
        onClick: () => toggleCollapse(node),
      },
      [
        // 折叠图标
        node.children && node.children.length > 0
          ? h('span', { style: { marginRight: '8px' } }, node.collapsed ? '►' : '▼')
          : h('span', { style: { marginRight: '8px', opacity: 0.3 } }, '●'),
        // 节点名称
        node.name,
      ],
    ),
  ]

  // 如果有子节点并且未折叠，则递归渲染子节点
  if (node.children && node.children.length && !node.collapsed) {
    node.children.forEach((child) => {
      result.push(...renderTreeNode(child, level + 1))
    })
  }

  return result
}

// 主要渲染函数
const DynamicTreeRender = () => {
  return h('div', { class: 'tree-container' }, renderTreeNode(chartData))
}

// 在模板中实现这种复杂的递归结构会更加麻烦
defineExpose({
  DynamicTreeRender,
})
</script>

<template>
  <div class="dynamic-render-demo">
    <h2>复杂动态组件渲染</h2>
    <p>
      这个示例展示了使用 render 函数来创建复杂的、动态的、递归的组件，如树形图表。
      在这种场景下，render 函数比模板更加灵活和直接。
    </p>

    <div class="explanation">
      <h3>为什么这里 render 函数更好：</h3>
      <ul>
        <li>递归结构可以直接以函数调用的方式实现，而不需要创建多个组件</li>
        <li>动态样式可以更直接地计算和应用</li>
        <li>事件处理和状态管理更加清晰</li>
        <li>复杂条件逻辑更容易表达</li>
      </ul>
    </div>

    <component :is="DynamicTreeRender" />
  </div>
</template>

<style scoped>
.dynamic-render-demo {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.explanation {
  background-color: var(--color-background-soft, #fffbeb);
  border-left: 4px solid var(--color-warning, #ffc107);
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: var(--color-text, #333);
}

.tree-container {
  border: 1px solid var(--color-border, #eee);
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
