<script setup lang="ts">
import {
  BasicRender,
  PerformanceRender,
  ComplexDynamicRender,
  JSXRender,
} from '@/components/research/render'
import { ref, onMounted, onUnmounted } from 'vue'

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
  <div class="research-container">
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

    <div id="intro" class="intro section">
      <h2>什么情况下 Vue 的 template 有瓶颈，需要使用 render 函数？</h2>
      <p>
        Vue 的模板系统非常强大和灵活，适合大多数应用场景。但在以下情况下，使用 render
        函数可能会更有优势：
      </p>

      <ol>
        <li>
          <strong>需要完全的 JavaScript 编程能力</strong> - 当组件逻辑非常复杂，需要充分利用
          JavaScript 的编程能力
        </li>
        <li>
          <strong>高性能渲染场景</strong> - 当需要渲染大量元素或进行频繁更新时，直接操作虚拟 DOM
          可能更高效
        </li>
        <li>
          <strong>复杂的动态组件</strong> - 当组件结构需要高度动态化，基于复杂条件来决定渲染什么
        </li>
        <li><strong>深度递归组件</strong> - 如树形结构，使用函数递归调用比模板递归更直观</li>
        <li><strong>底层组件库开发</strong> - 开发高度复用的底层组件时，更精细地控制渲染过程</li>
        <li>
          <strong>使用 JSX/TSX 语法</strong> - 对于熟悉 React 的开发者，或者偏好使用类 HTML
          语法的开发者，可以结合 JSX/TSX 使用
        </li>
      </ol>
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
    <div id="summary" class="summary-container section">
      <h2>总结：Template vs Render vs JSX 对比</h2>
      <p>以下表格总结了不同渲染方法的优缺点，帮助您选择最适合项目需求的方法。</p>

      <div class="table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>Template 模板</th>
              <th>Render 函数</th>
              <th>JSX/TSX</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>易用性</td>
              <td class="highlight-good">★★★★★<br />声明式语法，最易读写</td>
              <td class="highlight-bad">★★<br />命令式，较为繁琐</td>
              <td class="highlight-medium">★★★<br />类HTML语法，但需要额外配置</td>
            </tr>
            <tr>
              <td>性能（大量数据）</td>
              <td class="highlight-medium">★★★<br />良好，但复杂逻辑下可能有瓶颈</td>
              <td class="highlight-good">★★★★★<br />最佳，可完全控制渲染优化</td>
              <td class="highlight-good">★★★★<br />与render函数相近，可实现高性能</td>
            </tr>
            <tr>
              <td>动态内容</td>
              <td class="highlight-bad">★★<br />有限的v-if/v-for，复杂逻辑难表达</td>
              <td class="highlight-good">★★★★★<br />完全JavaScript能力，最灵活</td>
              <td class="highlight-good">★★★★★<br />完全JavaScript能力，且语法清晰</td>
            </tr>
            <tr>
              <td>递归组件</td>
              <td class="highlight-bad">★★<br />需要命名组件，不够直观</td>
              <td class="highlight-good">★★★★★<br />直接函数递归调用，非常清晰</td>
              <td class="highlight-good">★★★★<br />类似函数递归，较为清晰</td>
            </tr>
            <tr>
              <td>工具支持</td>
              <td class="highlight-good">★★★★★<br />完整IDE支持，语法高亮，自动完成</td>
              <td class="highlight-medium">★★★<br />标准JavaScript支持</td>
              <td class="highlight-medium">★★★<br />需要额外配置才有良好支持</td>
            </tr>
            <tr>
              <td>TypeScript集成</td>
              <td class="highlight-medium">★★★<br />通过SFC支持，但模板本身无类型</td>
              <td class="highlight-good">★★★★<br />完全支持类型检查</td>
              <td class="highlight-good">★★★★★<br />最佳类型支持与提示</td>
            </tr>
            <tr>
              <td>团队协作</td>
              <td class="highlight-good">★★★★<br />易于理解，学习曲线平缓</td>
              <td class="highlight-bad">★★<br />需要对Vue内部有更深理解</td>
              <td class="highlight-medium">★★★<br />对React开发者友好</td>
            </tr>
            <tr>
              <td>最佳使用场景</td>
              <td>
                <ul>
                  <li>大多数Vue组件</li>
                  <li>静态内容为主的UI</li>
                  <li>团队成员Vue经验有限</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>高性能要求场景</li>
                  <li>复杂动态逻辑</li>
                  <li>递归组件</li>
                  <li>组件库开发</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>React开发者过渡</li>
                  <li>需要完整JS能力但想保持HTML风格</li>
                  <li>需要强类型支持</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="conclusion-box">
        <h3>最终建议</h3>
        <ul>
          <li>对于大多数情况，优先选择 <strong>模板</strong> 语法</li>
          <li>
            当遇到以下情况时，考虑使用 <strong>render 函数</strong>：
            <ul>
              <li>需要渲染大量数据且性能出现瓶颈</li>
              <li>需要实现复杂的递归组件</li>
              <li>需要极高的动态渲染灵活性</li>
            </ul>
          </li>
          <li>
            如果您的团队熟悉 React 并喜欢 JSX 语法，同时项目已配置支持 JSX，则可以考虑使用
            <strong>JSX</strong> 语法
          </li>
        </ul>
      </div>
    </div>

    <div id="conclusion" class="conclusion section">
      <h2>结论</h2>
      <p>
        虽然在某些场景下 render 函数确实能提供更大的灵活性和潜在的性能优势， 但模板仍然是 Vue
        应用程序构建的首选方式，因为：
      </p>
      <ul>
        <li>模板更具声明性，更易于理解和维护</li>
        <li>模板有更好的编译时优化</li>
        <li>模板有更好的 IDE 和工具支持</li>
        <li>对于大多数应用场景来说，模板性能已经足够好</li>
      </ul>

      <p>
        <strong>最佳实践：</strong> 优先使用模板，仅在确实需要 render 函数提供的特性时才使用它。
      </p>
    </div>

    <!-- 回到顶部按钮 -->
    <div class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop">
      <span>↑</span>
    </div>
  </div>
</template>

<style scoped>
.research-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
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

.section {
  margin-bottom: 40px;
  background-color: var(--color-background-soft, #fff);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 70px; /* For smooth scrolling with sticky header */
}

h1 {
  color: var(--color-heading, #2c3e50);
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  color: var(--color-primary, #3a8ee6);
  border-bottom: 1px solid var(--color-border, #eee);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

ol,
ul {
  line-height: 1.6;
  margin-left: 20px;
}

li {
  margin-bottom: 8px;
}

.demos {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.demos > div {
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

/* Summary table styles */
.summary-container {
  margin-bottom: 40px;
}

.table-wrapper {
  overflow-x: auto;
  margin: 20px 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid var(--color-border, #ddd);
  padding: 10px;
}

.comparison-table th {
  background-color: var(--color-background-mute, #f5f5f5);
  text-align: left;
  font-weight: bold;
}

.comparison-table tr:nth-child(even) {
  background-color: var(--color-background-soft, #fafafa);
}

.highlight-good {
  color: var(--color-primary, #4caf50);
  font-weight: bold;
}

.highlight-medium {
  color: var(--color-warning, #ff9800);
  font-weight: bold;
}

.highlight-bad {
  color: var(--color-danger, #f44336);
  font-weight: bold;
}

.conclusion-box {
  background-color: var(--color-background-soft, #f5f5f5);
  border: 1px solid var(--color-border, #ddd);
  border-left: 4px solid var(--color-primary, #4caf50);
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.conclusion-box h3 {
  margin-top: 0;
  color: var(--color-heading, #2c3e50);
}

.conclusion-box ul {
  margin-bottom: 0;
}

.comparison-table ul {
  margin: 0;
  padding-left: 16px;
}

.comparison-table li {
  margin-bottom: 4px;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .research-container {
    padding: 10px;
  }

  .section {
    padding: 15px;
  }

  .comparison-table {
    font-size: 0.8rem;
  }

  .comparison-table td,
  .comparison-table th {
    padding: 6px;
  }

  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }
}
</style>
