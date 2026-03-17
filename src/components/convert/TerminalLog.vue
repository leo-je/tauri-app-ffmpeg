<template>
  <div class="log-container">
    <div class="log-header">
      <div class="log-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="log-title">转换日志</span>
    </div>
    <pre ref="logRef" class="log-content terminal-scrollbar">{{ loginfo || '等待转换...' }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  loginfo: string
}>()

const logRef = ref<HTMLElement | null>(null)

watch(() => props.loginfo, () => {
  nextTick(() => {
    if (logRef.value) {
      logRef.value.scrollTop = logRef.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.log-container {
  background: var(--terminal-bg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--terminal-surface);
}

.log-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--terminal-bg-alt);
  border-bottom: 1px solid var(--terminal-surface);
}

.log-dots {
  display: flex;
  gap: var(--space-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.dot-red {
  background: var(--terminal-error);
}

.dot-yellow {
  background: var(--terminal-warning);
}

.dot-green {
  background: var(--terminal-success);
}

.log-title {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--terminal-text-subtle);
  font-family: var(--font-mono);
}

.log-content {
  margin: 0;
  padding: var(--space-4);
  min-height: 220px;
  max-height: 300px;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--terminal-text);
  background: var(--terminal-bg);
  white-space: pre-wrap;
  word-break: break-all;
}

.log-content:empty::before,
.log-content {
  color: var(--terminal-text);
}
</style>
