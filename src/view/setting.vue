<!-- src/view/setting.vue -->
<template>
    <div class="settings-page">
        <!-- Tabs (顶部) -->
        <div class="settings-tabs-bar">
            <el-tabs v-model="activeTab" stretch>
                <!-- 视频 Tab (仅视频格式时显示) -->
                <el-tab-pane v-if="formatType === 'video'" name="video">
                    <template #label>
                        <span class="tab-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                            视频设置
                        </span>
                    </template>
                </el-tab-pane>
                <!-- 音频 Tab (始终显示) -->
                <el-tab-pane name="audio">
                    <template #label>
                        <span class="tab-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                            音频设置
                        </span>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- Content (中间, 可滚动) -->
        <div class="settings-body">
            <!-- 视频 (仅视频格式时显示) -->
            <el-form v-show="formatType === 'video' && activeTab === 'video'" :model="form" label-width="90px" label-position="left" class="tab-form">
                <el-form-item label="编码器">
                    <el-select v-model="form.videoCodec" placeholder="请选择">
                        <el-option label="不指定" value=""></el-option>
                        <el-option label="libx264" value="libx264"></el-option>
                        <el-option label="libx265" value="libx265"></el-option>
                        <el-option label="h264_nvenc" value="h264_nvenc"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分辨率">
                    <el-input v-model="form.resolution" placeholder="例如：1920x1080"></el-input>
                </el-form-item>
                <el-form-item label="比特率">
                    <el-input v-model="form.bitrate" placeholder="例如：1000k"></el-input>
                </el-form-item>
                <el-form-item label="帧率">
                    <el-input v-model="form.framerate" placeholder="例如：30"></el-input>
                </el-form-item>
            </el-form>

            <!-- 音频 (始终显示) -->
            <el-form v-show="activeTab === 'audio'" :model="form" label-width="90px" label-position="left" class="tab-form">
                <el-form-item label="编码器">
                    <el-select v-model="form.audioCodec" placeholder="请选择">
                        <el-option label="不指定" value=""></el-option>
                        <el-option label="aac" value="aac"></el-option>
                        <el-option label="libmp3lame" value="libmp3lame"></el-option>
                        <el-option label="opus" value="opus"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采样率">
                    <el-input v-model="form.audioSampleRate" placeholder="例如：48000"></el-input>
                </el-form-item>
                <el-form-item label="比特率">
                    <el-input v-model="form.audioBitrate" placeholder="例如：128k"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <!-- 保存按钮 (固定底部) -->
        <div class="settings-footer">
            <el-button type="primary" size="large" @click="onSubmit">
                保存配置
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { getCurrent } from '../utils/WindowsUtils';
import { loadFormData, loadSettingsForm, saveSettingsForm, saveFfmpegArgs } from '../stores/appStore';
import type { SettingForm, FormatType } from '../types';
import { ElMessage } from 'element-plus';

const formatType = ref<FormatType>('audio');
const activeTab = ref('audio');

const form = reactive<SettingForm>({
    inputFile: '',
    outputFile: '',
    videoCodec: '',
    audioCodec: '',
    resolution: '',
    audioSampleRate: '',
    audioBitrate: '',
    bitrate: '',
    framerate: ''
});

const CODEC_PATTERN = /^[a-zA-Z0-9_]*$/;
const RESOLUTION_PATTERN = /^[0-9]+x[0-9]+$/;
const NUMERIC_PATTERN = /^[0-9]+[kKmMgG]?$/;
const FRAMERATE_PATTERN = /^[0-9]+$/;

function validateForm(): string | null {
    if (form.videoCodec && !CODEC_PATTERN.test(form.videoCodec)) {
        return '视频编码器格式无效';
    }
    if (form.audioCodec && !CODEC_PATTERN.test(form.audioCodec)) {
        return '音频编码器格式无效';
    }
    if (form.resolution && !RESOLUTION_PATTERN.test(form.resolution)) {
        return '分辨率格式无效，应为如 1920x1080';
    }
    if (form.audioSampleRate && !FRAMERATE_PATTERN.test(form.audioSampleRate)) {
        return '采样率格式无效，应为数字';
    }
    if (form.audioBitrate && !NUMERIC_PATTERN.test(form.audioBitrate)) {
        return '音频比特率格式无效';
    }
    if (form.bitrate && !NUMERIC_PATTERN.test(form.bitrate)) {
        return '视频比特率格式无效';
    }
    if (form.framerate && !FRAMERATE_PATTERN.test(form.framerate)) {
        return '帧率格式无效，应为数字';
    }
    return null;
}

onMounted(async () => {
    const savedForm = await loadFormData();
    if (savedForm) {
        formatType.value = savedForm.formatType;
        activeTab.value = savedForm.formatType === 'video' ? 'video' : 'audio';
    }
    const savedSettings = await loadSettingsForm();
    if (savedSettings) {
        form.videoCodec = savedSettings.videoCodec ?? '';
        form.audioCodec = savedSettings.audioCodec ?? '';
        form.resolution = savedSettings.resolution ?? '';
        form.audioSampleRate = savedSettings.audioSampleRate ?? '';
        form.audioBitrate = savedSettings.audioBitrate ?? '';
        form.bitrate = savedSettings.bitrate ?? '';
        form.framerate = savedSettings.framerate ?? '';
    }
})

const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
        ElMessage.error(validationError);
        return;
    }
    let ffmpegCommand = ``;

    if (form.videoCodec) {
        ffmpegCommand += ` -c:v ${form.videoCodec}`;
    }

    if (form.audioCodec) {
        ffmpegCommand += ` -c:a ${form.audioCodec}`;
    }

    if (form.resolution) {
        ffmpegCommand += ` -vf "scale=${form.resolution}"`;
    }

    if (form.audioSampleRate) {
        ffmpegCommand += ` -ar ${form.audioSampleRate}`;
    }

    if (form.audioBitrate) {
        ffmpegCommand += ` -b:a ${form.audioBitrate}`;
        if (!form.audioBitrate.endsWith('k') && !form.audioBitrate.endsWith('K')) {
            ffmpegCommand += 'k';
        }
    }

    if (form.bitrate) {
        ffmpegCommand += ` -b:v ${form.bitrate}`;
        if (!form.bitrate.endsWith('k') && !form.bitrate.endsWith('K')) {
            ffmpegCommand += 'k';
        }
    }

    if (form.framerate) {
        ffmpegCommand += ` -r ${form.framerate}`;
    }
    await saveSettingsForm({ ...form });
    await saveFfmpegArgs(ffmpegCommand);
    let win = getCurrent();
    win.close()
};
</script>

<style scoped>
.settings-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--color-white);
}

/* --- Tabs Bar (顶部) --- */
.settings-tabs-bar {
    flex-shrink: 0;
    padding: var(--space-3) var(--space-6) 0;
    border-bottom: 1px solid var(--color-border);
}

.settings-tabs-bar :deep(.el-tabs__header) {
    margin: 0;
}

.settings-tabs-bar :deep(.el-tabs__nav-wrap::after) {
    display: none;
}

.tab-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--text-sm);
}

/* --- Body (中间, 填充剩余空间) --- */
.settings-body {
    flex: 1;
    padding: var(--space-5) var(--space-6);
    overflow-y: auto;
}

.tab-form {
    max-width: 420px;
    margin: 0 auto;
}

/* --- Footer (固定底部) --- */
.settings-footer {
    flex-shrink: 0;
    padding: var(--space-4) var(--space-6) var(--space-6);
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--color-border);
    background: var(--color-white);
}

.settings-footer .el-button {
    min-width: 160px;
}
</style>
