<template>
  <div class="form-section">
    <div class="section-header">
      <span class="section-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg>
      </span>
      <span class="section-title">源文件</span>
    </div>
    <div class="form-row">
      <div class="input-wrapper" :class="{ 'has-value': filePath }">
        <el-input :model-value="filePath || ''" placeholder="未选择文件" readonly />
        <span v-if="!filePath" class="empty-hint">请选择要转换的文件</span>
      </div>
      <el-button type="primary" @click="$emit('select')" class="action-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        选择文件
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  filePath: string | null
}>()

defineEmits<{
  select: []
}>()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.input-wrapper {
  flex: 1;
  position: relative;
}
.input-wrapper .el-input {
  width: 100%;
}
.empty-hint {
  position: absolute;
  left: var(--space-3);
  bottom: calc(-1 * var(--space-5));
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  pointer-events: none;
}
.input-wrapper.has-value .empty-hint {
  display: none;
}
.action-btn {
  flex-shrink: 0;
}
</style>
