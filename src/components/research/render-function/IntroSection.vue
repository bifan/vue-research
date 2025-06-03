<script setup lang="ts">
// 介绍部分展示何时使用render函数
</script>

<template>
  <div class="intro section">
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
</template>

<style scoped>
.intro {
  margin-bottom: 40px;
}

h2 {
  color: var(--color-primary, #3a8ee6);
  border-bottom: 1px solid var(--color-border, #eee);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

ol {
  line-height: 1.6;
  margin-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>
