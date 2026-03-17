<template>
  <div class="form-section">
    <div class="section-header">
      <span class="section-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </span>
      <span class="section-title">转换参数</span>
    </div>
    <div class="form-row form-row-toggle">
      <el-switch :model-value="isAugment" @update:model-value="$emit('update:isAugment', $event)" />
      <span class="toggle-label">启用自定义参数</span>
    </div>
    <div class="form-row" v-if="isAugment || augment">
      <div class="input-wrapper">
        <el-input :disabled="!isAugment" :model-value="augment" readonly />
      </div>
      <el-button :disabled="!isAugment" type="primary" @click="$emit('open-setting')" class="action-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
        参数配置
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isAugment: boolean
  augment: string
}>()

defineEmits<{
  'update:isAugment': [value: boolean]
  'open-setting': []
}>()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.form-row-toggle {
  gap: var(--space-3);
}
.toggle-label {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}
.input-wrapper {
  flex: 1;
  position: relative;
}
.input-wrapper .el-input {
  width: 100%;
}
.action-btn {
  flex-shrink: 0;
}
</style>
