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
</script>

<template>
  <div class="template-demo">
    <div class="code-display">
      <pre v-pre><code>
&lt;template&gt;
  &lt;div&gt;
    &lt;h3&gt;{{ message }}&lt;/h3&gt;
    
    &lt;div v-if="showMessage"&gt;
      &lt;p&gt;Count: {{ count }}&lt;/p&gt;
      &lt;p&gt;Double: {{ doubleCount }}&lt;/p&gt;
    &lt;/div&gt;
    
    &lt;button @click="increment"&gt;Increment&lt;/button&gt;
    &lt;button @click="toggleMessage"&gt;
      {{ showMessage ? 'Hide' : 'Show' }} Message
    &lt;/button&gt;
    
    &lt;div class="list-section"&gt;
      &lt;h4&gt;Items:&lt;/h4&gt;
      &lt;ul&gt;
        &lt;li 
          v-for="item in items" 
          :key="item"
          @click="selectItem(item)"
          :class="{ selected: selected === item }"
        &gt;
          {{ item }}
        &lt;/li&gt;
      &lt;/ul&gt;
      &lt;button @click="addItem"&gt;Add Item&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
      </code></pre>
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
