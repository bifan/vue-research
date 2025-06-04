<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TemplateExample from './TemplateExample.vue'
import RenderExample from './RenderExample.vue'
import TreeExample from './TreeExample.vue'
import DynamicTableTemplate from './DynamicTableTemplate.vue'
import DynamicTableRender from './DynamicTableRender.vue'

// 控制"回到顶部"按钮的显示
const showBackToTop = ref(false)

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 添加/移除滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="render-code-research-container">
    <div class="content-wrapper">
      <h1>Template 与 Render 函数代码对比</h1>

      <!-- 导航栏 -->
      <div class="nav-container">
        <ul class="section-nav">
          <li><a href="#intro">介绍</a></li>
          <li><a href="#basic-example">基本对比</a></li>
          <li><a href="#tree-example">递归树形结构</a></li>
          <li><a href="#table-example">动态表格生成</a></li>
        </ul>
      </div>

      <!-- 介绍部分 -->
      <div id="intro" class="section">
        <h2>为什么需要对比 Template 和 Render 函数？</h2>
        <p>
          Vue的模板系统非常强大，可以满足大多数开发场景的需求。但在某些特定场景下，模板系统会遇到瓶颈，
          而Render函数则能够提供更大的灵活性和性能优势。本研究通过具体代码对比，展示两种方法的差异和适用场景。
        </p>

        <div class="key-points">
          <h3>模板系统的瓶颈:</h3>
          <ul>
            <li>复杂的条件渲染逻辑</li>
            <li>高度动态的组件结构</li>
            <li>深层嵌套的递归结构</li>
            <li>需要JavaScript完整能力的场景</li>
            <li>大量数据渲染时的性能瓶颈</li>
          </ul>
        </div>
      </div>

      <!-- 基本对比示例 -->
      <div id="basic-example" class="section">
        <h2>基本功能对比</h2>
        <p>下面是一个基本例子，展示了同样功能在模板和render函数中的实现差异</p>

        <div class="comparison-container">
          <div class="comparison-box">
            <h3>模板实现</h3>
            <TemplateExample />
          </div>
          <div class="comparison-box">
            <h3>Render函数实现</h3>
            <RenderExample />
          </div>
        </div>
      </div>

      <!-- 树形结构示例 -->
      <div id="tree-example" class="section">
        <h2>递归树形结构对比</h2>
        <p>
          树形结构是展示render函数优势的典型场景。通过递归，render函数能够更清晰、高效地处理深层嵌套的数据。
        </p>

        <TreeExample />
      </div>

      <!-- 表格动态生成示例 -->
      <div id="table-example" class="section">
        <h2>动态表格生成对比</h2>
        <p>
          当表格结构需要根据数据动态生成时，使用render函数可以获得更好的控制力和性能。
          以下示例展示了处理复杂表格结构时的两种实现方式。
        </p>

        <div class="comparison-container">
          <div class="comparison-box">
            <h3>模板实现</h3>
            <DynamicTableTemplate />
          </div>
          <div class="comparison-box">
            <h3>Render函数实现</h3>
            <DynamicTableRender />
          </div>
        </div>
      </div>

      <!-- 回到顶部按钮 -->
      <div class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop">
        <span>↑</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.render-code-research-container {
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: 1400px; /* Limit width on very large screens */
  padding: 0 20px;
}

.nav-container {
  margin: 20px 0 30px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-background, #fff);
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border, #eee);
}

.section-nav {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  gap: 5px;
}

.section-nav li {
  margin: 0;
}

.section-nav a {
  display: inline-block;
  padding: 8px 12px;
  color: var(--color-text, #333);
  text-decoration: none;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.section-nav a:hover {
  background-color: var(--color-background-mute, #f5f5f5);
  color: var(--color-primary, #3a8ee6);
}

h1 {
  color: var(--color-heading, #2c3e50);
  text-align: center;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 40px;
  background-color: var(--color-background-soft, #fff);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 70px; /* For smooth scrolling with sticky header */
}

h2 {
  color: var(--color-primary, #3a8ee6);
  border-bottom: 1px solid var(--color-border, #eee);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.comparison-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.comparison-box {
  flex: 1;
  min-width: 300px; /* Ensures boxes don't become too narrow */
  max-width: calc(50% - 10px); /* Ensures boxes don't get too wide on large screens */
  border: 1px solid var(--color-border, #eee);
  border-radius: 4px;
  padding: 15px;
  overflow: hidden; /* Prevents content overflow */
}

.key-points {
  background-color: var(--color-background-mute, #f5f5f5);
  border-left: 4px solid var(--color-primary, #3a8ee6);
  padding: 15px;
  border-radius: 0 4px 4px 0;
  margin: 20px 0;
}

.key-points h3 {
  margin-top: 0;
  color: var(--color-heading, #2c3e50);
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-primary, #3a8ee6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 0.8;
  visibility: visible;
}

.back-to-top:hover {
  opacity: 1;
}

/* Large screens */
@media (min-width: 1400px) {
  .comparison-box {
    max-width: calc(50% - 10px);
  }

  .code-display {
    max-height: 600px; /* More space for code on large screens */
  }
}

/* Medium screens */
@media (max-width: 1200px) {
  .comparison-box {
    max-width: calc(50% - 10px);
  }
}

/* Tablets and small screens */
@media (max-width: 900px) {
  .comparison-container {
    flex-direction: column;
  }

  .comparison-box {
    min-width: 100%;
    max-width: 100%;
  }
}

/* Mobile screens */
@media (max-width: 768px) {
  .section-nav {
    gap: 2px;
  }

  .section-nav a {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
</style>
