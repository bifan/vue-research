<script setup lang="ts">
import { ref, computed, h } from 'vue'

// 状态
const count = ref(0)
const message = ref('Hello Vue!')
const showMessage = ref(true)
const items = ref(['Item 1', 'Item 2', 'Item 3'])
const selected = ref('')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

const toggleMessage = () => {
  showMessage.value = !showMessage.value
}

const addItem = () => {
  items.value.push(`Item ${items.value.length + 1}`)
}

const selectItem = (item: string) => {
  selected.value = item
}

// render 函数
const renderDemo = () => {
  return h('div', [
    h('h3', message.value),

    // 条件渲染
    showMessage.value
      ? h('div', [h('p', 'Count: ' + count.value), h('p', 'Double: ' + doubleCount.value)])
      : null,

    // 按钮
    h('button', { onClick: increment }, 'Increment'),
    h('button', { onClick: toggleMessage }, showMessage.value ? 'Hide' : 'Show' + ' Message'),

    // 列表部分
    h('div', { class: 'list-section' }, [
      h('h4', 'Items:'),
      h(
        'ul',
        items.value.map((item) =>
          h(
            'li',
            {
              key: item,
              onClick: () => selectItem(item),
              class: { selected: selected.value === item },
            },
            item,
          ),
        ),
      ),
      h('button', { onClick: addItem }, 'Add Item'),
    ]),
  ])
}
</script>

<template>
  <div class="render-demo">
    <div class="code-display">
      <pre v-pre><code>
import { h } from 'vue'

// render 函数
const render = () => {
  return h('div', [
    h('h3', message.value),
    
    // 条件渲染
    showMessage.value 
      ? h('div', [
          h('p', 'Count: ' + count.value),
          h('p', 'Double: ' + doubleCount.value)
        ])
      : null,
    
    // 按钮
    h('button', { onClick: increment }, 'Increment'),
    h('button', { onClick: toggleMessage }, 
      showMessage.value ? 'Hide' : 'Show' + ' Message'),
    
    // 列表部分
    h('div', { class: 'list-section' }, [
      h('h4', 'Items:'),
      h('ul', items.value.map(item => 
        h('li', {
          key: item,
          onClick: () => selectItem(item),
          class: { selected: selected.value === item }
        }, item)
      )),
      h('button', { onClick: addItem }, 'Add Item')
    ])
  ])
}
      </code></pre>
    </div>

    <div class="demo-result">
      <h4>运行效果:</h4>
      <component :is="renderDemo" />
    </div>
  </div>
</template>

<style scoped>
.render-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow: hidden; /* Prevents content overflow */
  max-width: 800px; /* Reasonable width limit */
  margin: 0 auto;
}

.code-display {
  background-color: #1e1e1e;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
}

.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-display code {
  color: #d4d4d4;
  font-family: monospace;
  line-height: 1.5;
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

:deep(button) {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 6px 12px;
  background-color: var(--color-primary, #3a8ee6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

:deep(button:hover) {
  opacity: 0.9;
}

:deep(.list-section) {
  margin-top: 15px;
}

:deep(ul) {
  padding-left: 20px;
}

:deep(li) {
  cursor: pointer;
  padding: 3px 0;
}

:deep(li.selected) {
  color: var(--color-primary, #3a8ee6);
  font-weight: bold;
}
</style>
