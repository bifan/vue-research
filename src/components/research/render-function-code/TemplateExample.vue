<script setup lang="ts">
import { ref, computed } from 'vue'

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

// 模板代码内容
const templateCode = [
  '<template>',
  '  <div>',
  '    <h3>{{ message }}</h3>',
  '    ',
  '    <div v-if="showMessage">',
  '      <p>Count: {{ count }}</p>',
  '      <p>Double: {{ doubleCount }}</p>',
  '    </div>',
  '    ',
  '    <button @click="increment">Increment</button>',
  '    <button @click="toggleMessage">',
  "      {{ showMessage ? 'Hide' : 'Show' }} Message",
  '    </button>',
  '    ',
  '    <div class="list-section">',
  '      <h4>Items:</h4>',
  '      <ul>',
  '        <li ',
  '          v-for="item in items" ',
  '          :key="item"',
  '          @click="selectItem(item)"',
  '          :class="{ selected: selected === item }"',
  '        >',
  '          {{ item }}',
  '        </li>',
  '      </ul>',
  '      <button @click="addItem">Add Item</button>',
  '    </div>',
  '  </div>',
  '</template>',
  '',
  '<script setup>',
  "import { ref, computed } from 'vue'",
  '',
  "const message = ref('Hello Template!')",
  'const count = ref(0)',
  'const showMessage = ref(true)',
  "const items = ref(['Item 1', 'Item 2'])",
  'const selected = ref(null)',
  '',
  'const doubleCount = computed(() => count.value * 2)',
  '',
  'const increment = () => {',
  '  count.value++',
  '}',
  '',
  'const toggleMessage = () => {',
  '  showMessage.value = !showMessage.value',
  '}',
  '',
  'const selectItem = (item) => {',
  '  selected.value = item',
  '}',
  '',
  'const addItem = () => {',
  "  const newItem = 'Item ' + (items.value.length + 1)",
  '  items.value.push(newItem)',
  '}',
  '</' + 'script>',
].join('\n')
</script>

<template>
  <div class="template-demo">
    <div class="code-display">
      <div class="code-header">
        <span class="code-language">Vue Template</span>
      </div>
      <pre><code>{{ templateCode }}</code></pre>
    </div>

    <div class="demo-result">
      <h4>运行效果:</h4>
      <div>
        <h3>{{ message }}</h3>

        <div v-if="showMessage">
          <p>Count: {{ count }}</p>
          <p>Double: {{ doubleCount }}</p>
        </div>

        <button @click="increment">Increment</button>
        <button @click="toggleMessage">{{ showMessage ? 'Hide' : 'Show' }} Message</button>

        <div class="list-section">
          <h4>Items:</h4>
          <ul>
            <li
              v-for="item in items"
              :key="item"
              @click="selectItem(item)"
              :class="{ selected: selected === item }"
            >
              {{ item }}
            </li>
          </ul>
          <button @click="addItem">Add Item</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow: hidden;
  max-width: 1700px;
  margin: 0 auto;
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

.code-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-left: 0;
}

.code-display code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  display: block;
}

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

button {
  margin-right: 10px;
  margin-bottom: 10px;
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

.list-section {
  margin-top: 15px;
}

ul {
  padding-left: 20px;
}

li {
  cursor: pointer;
  padding: 3px 0;
}

li.selected {
  color: var(--color-primary, #3a8ee6);
  font-weight: bold;
}
</style>
