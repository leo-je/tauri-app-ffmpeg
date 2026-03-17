<template>
  <div class="convert-page">
    <div class="convert-card">
      <div class="card-header">
        <h2 class="card-title">格式转换</h2>
        <p class="card-subtitle">选择源文件和目标格式，一键完成转换</p>
      </div>

      <SourceFileSection :file-path="form.filePath" @select="selectFile" />

      <TargetFormatSection
        :format-type="form.formatType"
        :format="form.format"
        :audio-formats="audioFormats"
        :video-formats="videoFormats"
        @update:format-type="form.formatType = $event"
        @update:format="form.format = $event"
      />

      <ConversionParamsSection
        :is-augment="form.isAugment"
        :augment="form.augment"
        @update:is-augment="form.isAugment = $event"
        @open-setting="openSetting"
      />

      <OutputDirSection
        :out-path="form.outPath"
        @select="selectDirectory"
        @open="openDir"
      />

      <div class="convert-action">
        <el-button
          :disabled="(!form.filePath || !form.outPath || !form.format) || form.isConverting"
          type="success"
          size="large"
          @click="convert"
          class="convert-btn"
        >
          <svg v-if="!form.isConverting" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px" class="spin-icon"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
          {{ form.isConverting ? '转换中...' : '开始转换' }}
        </el-button>
        <el-button
          v-if="form.isConverting"
          type="danger"
          size="large"
          @click="stopConvert"
          class="stop-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          停止
        </el-button>
      </div>
    </div>

    <TerminalLog :loginfo="loginfo" />
  </div>
</template>

<script lang="ts" setup>
import { useConvert } from '../composables/useConvert'
import SourceFileSection from '../components/convert/SourceFileSection.vue'
import TargetFormatSection from '../components/convert/TargetFormatSection.vue'
import ConversionParamsSection from '../components/convert/ConversionParamsSection.vue'
import OutputDirSection from '../components/convert/OutputDirSection.vue'
import TerminalLog from '../components/convert/TerminalLog.vue'

const {
  form,
  loginfo,
  audioFormats,
  videoFormats,
  selectFile,
  selectDirectory,
  openDir,
  convert,
  stopConvert,
  openSetting,
} = useConvert()
</script>

<style scoped>
.convert-page {
  width: 100%;
  max-width: var(--app-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.convert-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.card-header {
  text-align: center;
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-2);
}

.card-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  flex-shrink: 0;
}

.section-title {
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.form-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.form-row-toggle {
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

.toggle-label {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.input-wrapper .el-input,
.input-wrapper .el-select {
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

.convert-action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.convert-btn {
  min-width: 200px;
  height: 48px;
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-success);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.convert-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -3px rgba(34, 197, 94, 0.45);
}

.convert-btn:not(:disabled):active {
  transform: translateY(0);
}

.stop-btn {
  min-width: 100px;
  height: 48px;
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
}

.spin-icon {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
