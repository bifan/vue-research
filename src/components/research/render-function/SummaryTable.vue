<script setup lang="ts">
// This component provides a summary comparison between templates and render functions
</script>

<template>
  <div class="summary-container">
    <h2>总结：Template vs Render vs JSX 对比</h2>
    <p>以下表格总结了不同渲染方法的优缺点，帮助您选择最适合您项目需求的方法。</p>

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
</template>

<style scoped>
.summary-container {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
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
  .comparison-table {
    font-size: 0.8rem;
  }

  .comparison-table td,
  .comparison-table th {
    padding: 6px;
  }
}
</style>
