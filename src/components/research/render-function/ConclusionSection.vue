<script setup lang="ts">
// 结论部分
</script>

<template>
  <div class="conclusion section">
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
</template>

<style scoped>
.conclusion {
  margin-bottom: 40px;
}

h2 {
  color: var(--color-primary, #3a8ee6);
  border-bottom: 1px solid var(--color-border, #eee);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

ul {
  line-height: 1.6;
  margin-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>
