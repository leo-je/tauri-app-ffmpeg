<template>
  <div class="convert-page">
    <div class="convert-card">
      <!-- Card Header -->
      <div class="card-header">
        <h2 class="card-title">音频格式转换</h2>
        <p class="card-subtitle">选择源文件和目标格式，一键完成转换</p>
      </div>

      <!-- Source File Section -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg>
          </span>
          <span class="section-title">源文件</span>
        </div>
        <div class="form-row">
          <div class="input-wrapper" :class="{ 'has-value': form.filePath }">
            <el-input v-model="form.filePath" placeholder="未选择文件" readonly />
            <span v-if="!form.filePath" class="empty-hint">请选择要转换的音频文件</span>
          </div>
          <el-button type="primary" @click="selectFile" class="action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            选择文件
          </el-button>
        </div>
      </div>

      <!-- Target Format Section -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </span>
          <span class="section-title">目标格式</span>
        </div>
        <div class="form-row">
          <div class="input-wrapper">
            <el-select v-model="form.format" placeholder="选择需要转换的格式">
              <el-option v-for="item in audioFormats" :key="item" :label="item.toUpperCase()" :value="item" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- Conversion Parameters Section -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </span>
          <span class="section-title">转换参数</span>
        </div>
        <div class="form-row form-row-toggle">
          <el-switch v-model="form.isAugment" />
          <span class="toggle-label">启用自定义参数</span>
        </div>
        <div class="form-row" v-if="form.isAugment || form.augment">
          <div class="input-wrapper">
            <el-input :disabled="!form.isAugment" v-model="form.augment" readonly />
          </div>
          <el-button :disabled="!form.isAugment" type="primary" @click="openSetting" class="action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
            参数配置
          </el-button>
        </div>
      </div>

      <!-- Output Directory Section -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><polyline points="9 14 12 11 15 14"/></svg>
          </span>
          <span class="section-title">输出目录</span>
        </div>
        <div class="form-row">
          <div class="input-wrapper" :class="{ 'has-value': form.outPath }">
            <el-input v-model="form.outPath" placeholder="未选择输出目录" readonly />
            <span v-if="!form.outPath" class="empty-hint">请选择转换后文件的保存位置</span>
          </div>
          <el-button type="primary" @click="selectDirectory" class="action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            选择
          </el-button>
          <el-button type="primary" @click="openDir" class="action-btn action-btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            打开
          </el-button>
        </div>
      </div>

      <!-- Convert Button -->
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
      </div>
    </div>

    <!-- Terminal Log Panel -->
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { open } from '@tauri-apps/plugin-dialog';
import { Command } from 'tauri-plugin-shellx-api';
import { platform } from '@tauri-apps/plugin-os';
import { path } from '@tauri-apps/api';
import { createWin, getCurrent } from '../utils/WindowsUtils';
import { Store } from '@tauri-apps/plugin-store';
// const store = new Store('store.bin');
let store: any = null;//await Store.load('store.json');
// do not use same name with ref



// 定义所有的音频格式
const audioFormats = [
  'mp3',
  'wav',
  'ogg',
  'flac',
  'aac',
  'wma',
  'm4a',
  'ape',
  'aiff',
  'au',
  'mid',
  'midi',
  'mp2',
  'mpa',
  'mp4',
  'mpa',
  'mpga',
]

let loginfo = ref('')
const logRef = ref<HTMLElement | null>(null)

let filePath: any = null
let format: any = null
let outPath: any = null
const form = reactive({
  filePath,
  format,
  outPath,
  isAugment: false,
  augment: '-b:a 320k -ar 48000',
  logs: '',
  isConverting: false
})

const setting = () => {
  store.set('form', form);
  // localStorage.setItem('form', JSON.stringify(form))
}
const getting = async () => {
  let json: any = await store.get('form');
  // let formStr = localStorage.getItem('form')
  if (json) {
    // let json = JSON.parse(formStr)
    json.logs = ''
    json.isConverting = false
    Object.assign(form, json)
  }
}

const loadArg = async () => {
  let arg = localStorage.getItem('ffmpegCommandArg')
  console.log(arg)
  if (!arg) {
    arg = '-b:a 320k -ar 48000'
  }
  form.augment = arg + '';
}

(async () => {
  console.log('init store')
  store = await Store.load('store.json');
  loadArg()
  getting();
})()


const selectFile = async () => {
  const filePath = await open({
    multiple: false,
    directory: false,
  });
  console.log(filePath);
  form.filePath = filePath
}

const selectDirectory = async () => {
  const dirPath = await open({
    multiple: false,
    directory: true,
  })
  if (dirPath && dirPath.length !== 0) {
    form.outPath = dirPath
    logl('选择输出路径:' + dirPath);
  }
}

const openDir = () => {
  let osType = checkPlatform()
  new Command(osType === 'windows' ? 'explorer' : 'open', [form.outPath]).execute()
}


const logChange = () => {
  if (logRef.value) {
    logRef.value.scrollTop = logRef.value.scrollHeight;
  }
}

watch(loginfo, (_newValue, _oldValue) => {
  logChange()
})


const log = (logInfo: string) => {
  loginfo.value += logInfo
  //logChange()
}

const logl = (logInfo: string) => {
  log(logInfo + '\n')
}
const checkPlatform = () => {
  let currentPlatform = platform();
  // if (currentPlatform === 'windows') {
  //   logl('当前操作系统是 Windows');
  // } else if (currentPlatform === 'macos') {
  //   logl('当前操作系统是 macOS');
  // } else if (currentPlatform === 'linux') {
  //   logl('当前操作系统是 Linux');
  // } else {
  //   logl('未知操作系统：' + currentPlatform);
  // }
  return currentPlatform;
}
const getSplit = () => {
  if (checkPlatform() === 'windows') {
    return '\\';
  } else {
    return '/';
  }
}
const convert = async () => {
  form.logs = ''
  setting();
  let p = await path.appLocalDataDir()
  let p2 = await path.appDataDir()
  let p3 = await path.appConfigDir()
  let p4 = await path.appLogDir()
  let p5 = await path.resourceDir()
  form.isConverting = true;
  let platformName = checkPlatform();
  logl('当前操作系统类型:' + platformName);
  console.log(form)
  let outFileName = form.filePath.split(getSplit()).pop() + '.' + form.format;
  logl('输出文件名：' + outFileName);
  let outPath = form.outPath + getSplit() + outFileName;
  let macScript =
    `#! /bin/bash
echo '开始转换...'
# echo 'appLocalDataDir:${p}'
# echo 'appDataDir:${p2}'
# echo 'appConfigDir:${p3}'
# echo 'appLogDir:${p4}'
# echo 'resourceDir:${p5}'
${p5}/assets/mac/ffmpeg -hide_banner -y -i ${form.filePath} ${form.isAugment ? form.augment : ''} ${outPath}
echo '结束转换...'
return $?
`
  let winScript =
    `# 设置输出编码为 UTF-8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
echo "开始转换..."
echo 'appLocalDataDir:${p}'
echo 'appDataDir:${p2}'
echo 'appConfigDir:${p3}'
echo 'appLogDir:${p4}'
echo 'resourceDir:${p5}'
& '${p5}/assets/win/ffmpeg/bin/ffmpeg.exe' -hide_banner -y -i ${form.filePath} ${form.isAugment ? form.augment : ''} ${outPath}
echo "结束转换..."
`


  // logl(platformName == 'macos' ? macScript : winScript);
  let command = null;
  if (platformName == 'macos' || platformName == 'linux') {
    command = Command.create('zsh', ['-c', macScript]);
  } else {
    command = Command.create('powershell', ['-Command', winScript])
  }
  command.on('close', data => {
    logl(`command finished with code ${data.code} and signal ${data.signal}`)
    form.isConverting = false;
    logl('end command!');
  });
  command.on('error', error => {
    console.error(`command on error: "${error}"`)
    form.isConverting = false;
    logl(error)
  });
  command.stdout.on('data', line => {
    console.log(`command stdout: "${line}"`)
    log(line)
  });
  command.stderr.on('data', line => {
    console.log(`command stderr: "${line}"`)
    //form.logs += line;
    log(line)
  });

  const child = await command.spawn();
  console.log('pid:', child.pid);
}

const openSetting = () => {
  let main = getCurrent()
  main.setEnabled(false)
  createWin({
    label: "setting",
    title: "参数设置",
    url: "/setting",
    width: 640,
    height: 620,
    resizable: false,
    minimizable: true,
    maximizable: true,
    closable: true,
    decorations: true,
    alwaysOnTop: false,
    center: true,
    focus: true,
    transparent: false,
    onDestroyed: async (_e: any) => {
      await main.setEnabled(true)
      await main.setFocus()
      loadArg()
    },
    onError: async (_e: any) => {
      await main.setEnabled(true)
      await main.setFocus()
    },

  })
};

</script>


<style scoped>
/* ============================================
   PAGE LAYOUT
   ============================================ */

.convert-page {
  width: 100%;
  max-width: var(--app-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* ============================================
   MAIN CARD
   ============================================ */

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

/* Card Header */
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

/* ============================================
   FORM SECTIONS
   ============================================ */

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

/* ============================================
   FORM ROWS (Flexbox)
   ============================================ */

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

.input-wrapper .el-input,
.input-wrapper .el-select {
  width: 100%;
}

/* Empty state hint */
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

/* Action buttons */
.action-btn {
  flex-shrink: 0;
}

.action-btn-secondary {
  opacity: 0.85;
}

/* ============================================
   CONVERT BUTTON
   ============================================ */

.convert-action {
  display: flex;
  justify-content: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.convert-btn {
  min-width: 200px;
  height: 48px;
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg) !important;
  box-shadow: var(--shadow-success) !important;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast) !important;
}

.convert-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px -3px rgba(34, 197, 94, 0.45) !important;
}

.convert-btn:not(:disabled):active {
  transform: translateY(0);
}

/* Spinning icon for converting state */
.spin-icon {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ============================================
   TERMINAL LOG PANEL
   ============================================ */

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

/* Waiting state text */
.log-content:empty::before,
.log-content {
  color: var(--terminal-text);
}
</style>
