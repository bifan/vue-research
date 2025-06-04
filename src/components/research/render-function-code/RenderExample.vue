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
    h('button', { onClick: toggleMessage }, showMessage.value ? 'Hide Message' : 'Show Message'),

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

// Render函数代码内容
const renderCode = `import { h } from 'vue'

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
      showMessage.value ? 'Hide Message' : 'Show Message'),
    
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
}`

// Copy code functionality
const copyCode = async () => {
  const codeContent = `import { h } from 'vue'

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
      showMessage.value ? 'Hide Message' : 'Show Message'),
    
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
}`

  try {
    await navigator.clipboard.writeText(codeContent)
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

// Fullscreen functionality
const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  const appElement = document.documentElement

  if (isFullscreen.value) {
    if (appElement.requestFullscreen) {
      appElement.requestFullscreen()
    } else if (appElement.mozRequestFullScreen) {
      // Firefox
      appElement.mozRequestFullScreen()
    } else if (appElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      appElement.webkitRequestFullscreen()
    } else if (appElement.msRequestFullscreen) {
      // IE/Edge
      appElement.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen()
    }
  }
}
</script>

<template>
  <div class="render-demo">
    <div class="code-display" :class="{ fullscreen: isFullscreen }">
      <div class="code-header">
        <span class="code-language">Render Function</span>
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
      <pre><code>{{ renderCode }}</code></pre>
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
  overflow: hidden;
  max-width: 1700px; /* Increase max width for better code display */
  margin: 0 auto;
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

.code-display {
  background-color: #2d3748;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #4a5568;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-left: 0; /* Remove left padding to give code more space */
}

.code-display code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  display: block;
}

/* Remove line numbers for wider code display */

/* Syntax highlighting for JavaScript/TypeScript */
:deep(.code-display) .js-keyword {
  color: #c792ea;
  font-weight: 600;
}

:deep(.code-display) .js-function {
  color: #82aaff;
}

:deep(.code-display) .js-string {
  color: #c3e88d;
}

:deep(.code-display) .js-comment {
  color: #a0aec0;
  font-style: italic;
}

:deep(.code-display) .js-variable {
  color: #f78c6c;
}

/* Better scrollbar for code areas */
.code-display::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-display::-webkit-scrollbar-track {
  background: #1a202c;
  border-radius: 4px;
}

.code-display::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

.code-display::-webkit-scrollbar-thumb:hover {
  background: #718096;
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
