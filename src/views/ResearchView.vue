<script setup lang="ts">
import { RenderResearch } from '@/components/research/render-function'
import { RenderFunctionCodeResearch } from '@/components/research/render-function-code'
import { ref, computed, markRaw, onMounted, onUnmounted } from 'vue'

// 当前选择的研究项目
const selectedResearch = ref('render')

// 研究项目列表，未来可以添加更多研究项目
const researchProjects = [
  {
    id: 'render',
    name: 'Template vs Render 函数',
    description: 'Vue模板系统与Render函数的对比分析',
    icon: '🔍',
    component: markRaw(RenderResearch),
  },
  {
    id: 'render-code',
    name: 'Render 函数代码实例',
    description: '展示Template瓶颈与Render函数优势的代码示例',
    icon: '💻',
    component: markRaw(RenderFunctionCodeResearch),
  },
  // 在这里可以添加更多的研究项目
  // 示例：
  // {
  //   id: 'composition',
  //   name: 'Composition API 研究',
  //   description: '对比Options API与Composition API的优劣势',
  //   icon: '🧩',
  //   component: CompositionResearch
  // },
  // {
  //   id: 'performance',
  //   name: 'Vue性能优化研究',
  //   description: 'Vue应用性能优化的各种策略研究',
  //   icon: '⚡',
  //   component: PerformanceResearch
  // }
]

// 当前显示的研究组件
const currentResearch = computed(() => {
  return (
    researchProjects.find((project) => project.id === selectedResearch.value) || researchProjects[0]
  )
})

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
    <h1>Vue.js 研究实验室</h1>

    <div class="directory-header">
      <p>这里包含了各种Vue.js相关的研究示例和概念验证，探索Vue.js的各种高级特性和最佳实践。</p>
    </div>

    <!-- 研究项目列表 -->
    <div class="research-grid">
      <div
        v-for="project in researchProjects"
        :key="project.id"
        class="research-card"
        :class="{ active: selectedResearch === project.id }"
        @click="selectedResearch = project.id"
      >
        <div class="card-icon">{{ project.icon }}</div>
        <div class="card-content">
          <h2>{{ project.name }}</h2>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>

    <!-- 显示当前选中的研究内容 -->
    <div class="selected-research">
      <component :is="currentResearch.component" />
    </div>

    <!-- 回到顶部按钮 -->
    <div class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop">
      <span>↑</span>
    </div>
  </div>
</template>

<style scoped>
.research-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

.directory-header {
  margin-bottom: 30px;
  text-align: center;
}

h1 {
  color: var(--color-heading, #2c3e50);
  text-align: center;
  margin-bottom: 15px;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  max-width: 100%;
}

.research-card {
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.research-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.research-card.active {
  border-color: var(--color-primary, #3a8ee6);
  background-color: rgba(58, 142, 230, 0.05);
}

.card-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.card-content {
  flex: 1;
}

.card-content h2 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: var(--color-heading, #2c3e50);
}

.card-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text, #666);
}

.selected-research {
  margin-top: 20px;
  border-top: 1px solid var(--color-border, #eee);
  padding-top: 20px;
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
  .research-grid {
    grid-template-columns: 1fr;
  }

  .research-card {
    padding: 15px;
  }

  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }
}
</style>
