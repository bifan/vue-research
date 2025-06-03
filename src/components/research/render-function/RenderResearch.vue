<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  IntroSection,
  BasicRender,
  ComplexDynamicRender,
  JSXRender,
  PerformanceRender,
  SummaryTable,
  ConclusionSection
} from './index'

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
    behavior: 'smooth'
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
  <div class="render-research-container">
    <h1>Vue Template vs Render 函数对比</h1>

    <!-- 导航栏 -->
    <div class="nav-container">
      <ul class="section-nav">
        <li><a href="#intro">介绍</a></li>
        <li><a href="#basic">基本用法</a></li>
        <li><a href="#complex">递归组件</a></li>
        <li><a href="#jsx">JSX语法</a></li>
        <li><a href="#performance">性能对比</a></li>
        <li><a href="#summary">总结表格</a></li>
        <li><a href="#conclusion">结论</a></li>
      </ul>
    </div>

    <!-- 各个章节 -->
    <div id="intro">
      <IntroSection />
    </div>

    <div class="demos">
      <!-- 基本 Render 函数示例 -->
      <div id="basic">
        <BasicRender />
      </div>

      <!-- 复杂动态组件示例 -->
      <div id="complex">
        <ComplexDynamicRender />
      </div>

      <!-- JSX 语法示例 -->
      <div id="jsx">
        <JSXRender />
      </div>

      <!-- 性能对比示例 -->
      <div id="performance">
        <PerformanceRender />
      </div>
    </div>

    <!-- 比较表格摘要 -->
    <div id="summary">
      <SummaryTable />
    </div>

    <!-- 结论 -->
    <div id="conclusion">
      <ConclusionSection />
    </div>

    <!-- 回到顶部按钮 -->
    <div class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop">
      <span>↑</span>
    </div>
  </div>
</template>

<style scoped>
.render-research-container {
  scroll-behavior: smooth;
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

.demos {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.demos > div, #intro, #summary, #conclusion {
  scroll-margin-top: 70px; /* For smooth scrolling with sticky header */
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
