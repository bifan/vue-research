<script setup lang="ts">
import { ref, h } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}

const decrement = () => {
  if (count.value > 0) {
    count.value--
  }
}

// 模拟 JSX 语法的渲染组件
// 注意：要使用真正的 JSX 需要在 tsconfig.json 中配置 "jsx": "preserve" 并添加相应的 Babel 插件
const JSXRenderer = () => {
  // 在 h 函数中使用三元表达式模拟 JSX 条件渲染
  const countDisplay =
    count.value < 5
      ? h('span', { style: { color: 'green' } }, count.value)
      : h('span', { style: { color: 'red' } }, count.value)

  // 使用模板字符串构建类名
  const buttonClass = (type: string) => `jsx-button jsx-button-${type}`

  // 条件渲染示例
  const conditionalElement =
    count.value % 2 === 0
      ? h('p', null, `当前是偶数: ${count.value}`)
      : h('p', null, `当前是奇数: ${count.value}`)

  // 列表渲染示例
  const items = Array.from({ length: count.value }, (_, i) => i + 1)
  const listItems = items.map((item) => h('li', { key: item }, `项目 ${item}`))

  return h('div', { class: 'jsx-container' }, [
    h('h3', null, 'JSX 语法示例'),
    h('p', null, ['当前计数: ', countDisplay]),
    conditionalElement,

    h('div', { class: 'button-group' }, [
      h(
        'button',
        {
          class: buttonClass('decrease'),
          onClick: decrement,
          disabled: count.value <= 0,
        },
        '减少',
      ),
      h(
        'button',
        {
          class: buttonClass('increase'),
          onClick: increment,
        },
        '增加',
      ),
    ]),

    count.value > 0 &&
      h('div', { class: 'list-container' }, [
        h('p', null, '基于计数生成的列表:'),
        h('ul', null, listItems),
      ]),
  ])
}

defineExpose({
  JSXRenderer,
})
</script>

<template>
  <div class="jsx-demo">
    <h2>使用 JSX 语法的 Render 函数</h2>
    <p>这个示例展示了如何使用 JSX 语法来编写 render 函数，这对熟悉 React 的开发者特别友好。</p>

    <div class="explanation">
      <h3>JSX 优势：</h3>
      <ul>
        <li>更接近 HTML 的语法，比 <code>h</code> 函数更易读</li>
        <li>可以使用花括号 <code>{}</code> 内嵌 JavaScript 表达式</li>
        <li>条件渲染和列表渲染更加直观</li>
        <li>可以将 JSX 元素保存在变量中重用</li>
        <li>与 TypeScript 结合使用可以获得良好的类型提示</li>
      </ul>
    </div>

    <component :is="JSXRenderer" />

    <div class="code-example">
      <h3>JSX 与 h 函数对比:</h3>
      <div class="code-comparison">
        <div class="code-section">
          <h4>JSX 语法</h4>
          <pre>
const JSX = () => (
  &lt;div class="container"&gt;
    &lt;h1&gt;标题&lt;/h1&gt;
    &lt;p&gt;计数: {count.value}&lt;/p&gt;
    &lt;button onClick={increment}&gt;
      增加
    &lt;/button&gt;
  &lt;/div&gt;
);
          </pre>
        </div>
        <div class="code-section">
          <h4>h 函数语法</h4>
          <pre>
const h = () => 
  h('div', { class: 'container' }, [
    h('h1', null, '标题'),
    h('p', null, `计数: ${count.value}`),
    h('button', { onClick: increment }, 
      '增加'
    )
  ]);
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jsx-demo {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.jsx-container {
  background-color: var(--color-background-soft, #f5f5f5);
  padding: 12px;
  border-radius: 4px;
}

.explanation {
  background-color: var(--color-background-soft, #eef9fd);
  border-left: 4px solid var(--color-info, #2196f3);
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: var(--color-text, #333);
}

.button-group {
  margin: 10px 0;
  display: flex;
  gap: 8px;
}

.jsx-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.jsx-button-increase {
  background-color: var(--color-primary, #4caf50);
}

.jsx-button-decrease {
  background-color: var(--color-danger, #f44336);
}

.jsx-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.list-container {
  margin-top: 16px;
  padding: 8px;
  background-color: var(--color-background, white);
  border-radius: 4px;
  border: 1px solid var(--color-border, #eee);
}

ul {
  margin: 0;
  padding: 0 0 0 20px;
}

li {
  margin-bottom: 4px;
}

.code-example {
  margin-top: 24px;
  background-color: var(--color-background-mute, #f8f8f8);
  padding: 12px;
  border-radius: 4px;
}

.code-comparison {
  display: flex;
  gap: 20px;
}

.code-section {
  flex: 1;
  border: 1px solid var(--color-border, #eee);
  border-radius: 4px;
  padding: 8px;
  background-color: var(--color-background, white);
}

pre {
  margin: 0;
  padding: 8px;
  background-color: var(--color-background-soft, #f5f5f5);
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
}

h4 {
  margin-top: 0;
  color: var(--color-primary, #3a8ee6);
}
</style>
