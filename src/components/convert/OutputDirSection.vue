<template>
  <div class="form-section">
    <div class="section-header">
      <span class="section-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><polyline points="9 14 12 11 15 14"/></svg>
      </span>
      <span class="section-title">输出目录</span>
    </div>
    <div class="form-row">
      <div class="input-wrapper" :class="{ 'has-value': outPath }">
        <el-input :model-value="outPath || ''" placeholder="未选择输出目录" readonly />
        <span v-if="!outPath" class="empty-hint">请选择转换后文件的保存位置</span>
      </div>
      <el-button type="primary" @click="$emit('select')" class="action-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        选择
      </el-button>
      <el-button type="primary" @click="$emit('open')" class="action-btn action-btn-secondary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        打开
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  outPath: string | null
}>()

defineEmits<{
  select: []
  open: []
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
.action-btn-secondary {
  opacity: 0.85;
}
</style>
