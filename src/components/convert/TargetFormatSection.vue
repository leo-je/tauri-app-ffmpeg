<template>
  <div class="form-section">
    <div class="section-header">
      <span class="section-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      </span>
      <span class="section-title">目标格式</span>
    </div>
    <div class="form-row format-row">
      <div class="format-type-switch">
        <el-radio-group :model-value="formatType" @update:model-value="$emit('update:formatType', $event)" size="small">
          <el-radio-button value="audio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            音频
          </el-radio-button>
          <el-radio-button value="video">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            视频
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="input-wrapper">
        <el-select :model-value="format" placeholder="选择目标格式" @update:model-value="$emit('update:format', $event)">
          <el-option-group v-if="formatType === 'audio'" label="音频格式">
            <el-option v-for="item in audioFormats" :key="item" :label="item.toUpperCase()" :value="item" />
          </el-option-group>
          <el-option-group v-else label="视频格式">
            <el-option v-for="item in videoFormats" :key="item" :label="item.toUpperCase()" :value="item" />
          </el-option-group>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormatType } from '../../types'

defineProps<{
  formatType: FormatType
  format: string | null
  audioFormats: string[]
  videoFormats: string[]
}>()

defineEmits<{
  'update:formatType': [value: FormatType]
  'update:format': [value: string]
}>()
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.format-row {
  flex-wrap: wrap;
  gap: var(--space-3);
}
.format-type-switch {
  flex-shrink: 0;
}
.format-row .input-wrapper {
  flex: 1;
  min-width: 200px;
}
.input-wrapper {
  flex: 1;
  position: relative;
}
.input-wrapper .el-select {
  width: 100%;
}
</style>
