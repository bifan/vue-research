<script setup lang="ts">
import { h, ref } from 'vue'

// 简单使用 render 函数的示例
const count = ref(0)
const increment = () => {
  count.value++
}

// 定义一个使用 render 函数的组件
const RenderComponent = () => {
  return h('div', { class: 'render-basic' }, [
    h('h3', null, '基础 Render 函数示例'),
    h('p', null, `当前计数: ${count.value}`),
    h('button', { onClick: increment }, '增加计数'),
  ])
}

defineExpose({
  RenderComponent,
})
</script>

<template>
  <div class="render-demo">
    <h2>基本 Render 函数</h2>
    <p>这个示例展示了最基本的 render 函数用法，用于创建简单的 DOM 结构。</p>
    <component :is="RenderComponent" />
  </div>
</template>

<style scoped>
.render-demo {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.render-basic {
  background-color: var(--color-background-soft, #f5f5f5);
  padding: 12px;
  border-radius: 4px;
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
