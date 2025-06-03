<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const itemCount = ref(1000)
const items = ref<Item[]>([])
const renderTimesMs = ref({
  template: 0,
  cached: 0,
})
const renderTimesShown = ref(false)

// 测试数据生成
onMounted(() => {
  generateItems()
})

// 用于测量真实渲染时间的函数
const measureTemplateRender = () => {
  const start = performance.now()
  // 在模板渲染中循环所有项，应用样式和条件
  // 我们实际使用这些计算结果，确保不会被优化掉
  const results = []
  for (const item of items.value) {
    const style = getItemStyle(item)
    results.push({
      style,
      hasThree: item.details.divisibleByThree,
      hasFive: item.details.divisibleByFive,
    })
  }
  const end = performance.now()
  renderTimesMs.value.template = Math.round((end - start) * 100) / 100
  // 实际使用计算结果，防止被优化掉
  if (results.length > 0 && results[0].style) {
    // 什么都不做
  }
}

// 用于测量缓存渲染时间的函数
const measureCachedRender = () => {
  const start = performance.now()
  // 调用计算属性，触发缓存计算
  // 同时模拟实际渲染工作 - 遍历并访问所有数据，确保进行公平比较
  const cachedItems = cachedRenderItems.value
  const results = []
  for (const item of cachedItems) {
    // 访问和使用缓存的属性，模拟实际渲染过程
    results.push({
      id: item.id,
      style: { ...item.style },
      hasThree: item.hasThree,
      hasFive: item.hasFive,
    })
  }
  const end = performance.now()
  renderTimesMs.value.cached = Math.round((end - start) * 100) / 100
  // 实际使用计算结果，防止被优化掉
  if (results.length > 0) {
    // 什么都不做
  }
  renderTimesShown.value = true
}

// 生成大量数据
const generateItems = () => {
  console.time('数据生成时间')
  const newItems = []

  // 使用确定性的种子，确保两边渲染的内容相同
  const getRandomScore = (index: number): number => {
    // 使用一个简单的哈希函数，基于索引生成伪随机数
    return (index * 13) % 100 | 0
  }

  const isRandomValueTrue = (index: number): boolean => {
    // 使确定的随机值
    return (index * 7) % 2 === 1
  }

  for (let i = 0; i < itemCount.value; i++) {
    newItems.push({
      id: i,
      value: `Item ${i}`,
      // 添加复杂的数据结构
      details: {
        even: i % 2 === 0,
        divisibleByThree: i % 3 === 0,
        divisibleByFive: i % 5 === 0,
        // 使用确定性随机数据
        score: getRandomScore(i),
        someValue: isRandomValueTrue(i),
      },
    })
  }
  items.value = newItems
  console.timeEnd('数据生成时间')
}

// 定义类型
interface ItemDetails {
  even: boolean
  divisibleByThree: boolean
  divisibleByFive: boolean
  score: number
  someValue: boolean
}

interface Item {
  id: number
  value: string
  details: ItemDetails
}

// 给模板和 render 函数的复杂计算
const getItemStyle = (item: Item) => {
  // 这个函数在渲染每个项目时都会调用，模拟复杂的条件渲染逻辑
  const score = item.details.score
  let color = ''

  if (score > 80) {
    color = 'rgba(0, 128, 0, 0.2)' // 绿色
  } else if (score > 50) {
    color = 'rgba(255, 165, 0, 0.2)' // 橙色
  } else {
    color = 'rgba(255, 0, 0, 0.2)' // 红色
  }

  return {
    backgroundColor: color,
    fontWeight: item.details.even ? 'bold' : 'normal',
    opacity: item.details.someValue ? 1 : 0.8,
  }
}

// 使用 computed 属性进行缓存优化，模拟 render 函数优化原理
// 在实际的 render 函数中，可以利用闭包和缓存进一步优化
const cachedRenderItems = computed(() => {
  // 一次性计算所有项目的样式和条件渲染
  const result = items.value.map((item) => {
    // 提前计算所有样式和条件
    const style = getItemStyle(item)
    const hasThree = item.details.divisibleByThree
    const hasFive = item.details.divisibleByFive

    return {
      id: item.id,
      value: item.value,
      style,
      hasThree,
      hasFive,
    }
  })
  return result
})

const increaseItems = () => {
  // 更大的增长幅度，让性能差异更明显
  itemCount.value += 2000
  generateItems()

  // 执行性能测试
  renderTimesShown.value = false
  setTimeout(() => {
    // 延迟执行测量，确保DOM已更新
    measureTemplateRender()
    measureCachedRender()
    renderTimesShown.value = true
  }, 50)
}

const resetItems = () => {
  itemCount.value = 1000
  generateItems()
  renderTimesShown.value = false
}

defineExpose({
  items,
  itemCount,
  increaseItems,
  resetItems,
  cachedRenderItems,
  measureTemplateRender,
  measureCachedRender,
  renderTimesMs,
})
</script>

<template>
  <div class="performance-demo">
    <h2>渲染性能对比：大量列表项</h2>
    <p>
      这个示例展示了当需要渲染大量元素时，render 函数可能比模板更有效率。 当前渲染条目数量:
      {{ itemCount }}
    </p>

    <div class="controls">
      <button @click="increaseItems">增加 2000 个元素</button>
      <button @click="resetItems">重置</button>
    </div>

    <div class="performance-tip">
      <p>
        点击"增加 2000
        个元素"按钮后，将在下方显示两种渲染方法的性能时间对比。随着数据量增加，性能差异会更加明显。
      </p>
      <p
        v-if="renderTimesShown"
        class="performance-summary"
        :class="{
          'cached-faster': renderTimesMs.cached < renderTimesMs.template,
          'template-faster': renderTimesMs.cached > renderTimesMs.template,
        }"
      >
        <strong>性能结果:</strong>
        {{
          renderTimesMs.cached < renderTimesMs.template
            ? `缓存优化渲染比普通渲染快 ${Math.round((renderTimesMs.template - renderTimesMs.cached) * 100) / 100} ms (${renderTimesMs.cached > 0 ? Math.round((renderTimesMs.template / renderTimesMs.cached) * 10) / 10 : '极大'}倍)`
            : `普通渲染比缓存优化渲染快 ${Math.round((renderTimesMs.cached - renderTimesMs.template) * 100) / 100} ms (${renderTimesMs.template > 0 ? Math.round((renderTimesMs.cached / renderTimesMs.template) * 10) / 10 : '极大'}倍)`
        }}
      </p>
    </div>

    <div class="comparison-container">
      <div class="comparison-box">
        <h3>使用模板渲染</h3>
        <p class="performance-note">每次渲染时，模板需要单独计算每个项目的条件和样式</p>
        <div class="performance-result" v-if="renderTimesShown">
          <p class="time">渲染时间: {{ renderTimesMs.template }} ms</p>
        </div>
        <div class="list-container">
          <!-- 在模板中，每次重新渲染时都会重新计算每个项目的样式 -->
          <div v-for="item in items" :key="item.id" class="list-item" :style="getItemStyle(item)">
            <!-- 复杂的条件渲染 -->
            <span class="item-id">#{{ item.id }}: </span>
            <span class="item-value">{{ item.value }}</span>
            <span v-if="item.details.divisibleByThree" class="item-badge three">3</span>
            <span v-if="item.details.divisibleByFive" class="item-badge five">5</span>
          </div>
        </div>
      </div>

      <div class="comparison-box">
        <h3>使用 Render 函数渲染</h3>
        <p class="performance-note">使用 computed 属性优化，一次性预计算所有节点的属性</p>
        <div class="performance-result" v-if="renderTimesShown">
          <p class="time">渲染时间: {{ renderTimesMs.cached }} ms</p>
        </div>
        <!-- 使用预先计算的缓存数据，而不是在每次渲染时重新计算条件和样式 -->
        <div class="list-container">
          <div
            v-for="item in cachedRenderItems"
            :key="item.id"
            class="list-item"
            :style="item.style"
          >
            <!-- 使用预先计算的值，而不是每次渲染时都重新计算 -->
            <span class="item-id">#{{ item.id }}: </span>
            <span class="item-value">{{ item.value }}</span>
            <!-- 使用预先计算好的条件 -->
            <span v-if="item.hasThree" class="item-badge three">3</span>
            <span v-if="item.hasFive" class="item-badge five">5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.performance-demo {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;
}

.comparison-container {
  display: flex;
  gap: 20px;
}

.comparison-box {
  flex: 1;
  border: 1px solid var(--color-border, #eee);
  border-radius: 4px;
  padding: 10px;
}

.list-container {
  height: 300px;
  overflow-y: auto;
  background-color: var(--color-background-mute, #f9f9f9);
  border: 1px solid var(--color-border, #eee);
  border-radius: 4px;
}

.list-item {
  padding: 4px 8px;
  border-bottom: 1px solid var(--color-border, #eee);
  display: flex;
  align-items: center;
}

.item-id {
  font-weight: 600;
  margin-right: 4px;
}

.item-badge {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-size: 10px;
  color: white;
  margin-left: 4px;
}

.item-badge.three {
  background-color: var(--color-primary, #4caf50);
}

.item-badge.five {
  background-color: var(--color-warning, #ff9800);
}

.performance-note {
  font-size: 0.85rem;
  color: var(--color-text-light, #666);
  font-style: italic;
  margin-bottom: 10px;
}

.performance-tip {
  background-color: var(--color-background-soft, rgba(100, 149, 237, 0.1));
  border-left: 3px solid var(--color-primary, #4caf50);
  padding: 8px 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.performance-tip p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text, #333);
}

.performance-result {
  background-color: var(--color-background-soft, #f0f0f0);
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 10px;
  text-align: center;
}

.performance-result .time {
  margin: 0;
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--color-primary, #4caf50);
}

.performance-summary {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-border, rgba(60, 60, 60, 0.12));
  font-size: 0.9rem;
}

.performance-summary.cached-faster {
  color: var(--color-primary, #4caf50);
}

.performance-summary.template-faster {
  color: var(--color-warning, #ff9800);
}

button {
  background-color: var(--color-primary, #4caf50);
  border: none;
  color: var(--color-text-inverse, white);
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
