<!-- src/view/setting.vue -->
<template>
    <div class="settings-page">
        <div class="settings-card">
            <div class="settings-header">
                <h2 class="settings-title">转码配置</h2>
                <p class="settings-subtitle">配置 FFmpeg 转码参数</p>
            </div>

            <!-- ===== 视频设置 ===== -->
            <div class="settings-section">
                <div class="section-header">
                    <span class="section-icon">🎬</span>
                    <span class="section-label">视频设置</span>
                </div>
                <el-form :model="form" label-width="110px" label-position="left">
                    <el-form-item label="视频编码器">
                        <el-select v-model="form.videoCodec" placeholder="请选择视频编码器">
                            <el-option label="" value=""></el-option>
                            <el-option label="libx264" value="libx264"></el-option>
                            <el-option label="libx265" value="libx265"></el-option>
                            <el-option label="h264_nvenc" value="h264_nvenc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分辨率">
                        <el-input v-model="form.resolution" placeholder="例如：1920x1080"></el-input>
                    </el-form-item>
                    <el-form-item label="视频比特率">
                        <el-input v-model="form.bitrate" placeholder="例如：1000k"></el-input>
                    </el-form-item>
                    <el-form-item label="帧率">
                        <el-input v-model="form.framerate" placeholder="例如：30"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <!-- ===== 分隔线 ===== -->
            <el-divider class="section-divider">
                <span class="divider-label">音 频</span>
            </el-divider>

            <!-- ===== 音频设置 ===== -->
            <div class="settings-section">
                <div class="section-header">
                    <span class="section-icon">🎵</span>
                    <span class="section-label">音频设置</span>
                </div>
                <el-form :model="form" label-width="110px" label-position="left">
                    <el-form-item label="音频编码器">
                        <el-select v-model="form.audioCodec" placeholder="请选择音频编码器">
                            <el-option label="" value=""></el-option>
                            <el-option label="aac" value="aac"></el-option>
                            <el-option label="libmp3lame" value="libmp3lame"></el-option>
                            <el-option label="opus" value="opus"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="音频采样率">
                        <el-input v-model="form.audioSampleRate" placeholder="例如：48000"></el-input>
                    </el-form-item>
                    <el-form-item label="音频比特率">
                        <el-input v-model="form.audioBitrate" placeholder="例如：128k"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <!-- ===== 保存按钮 ===== -->
            <div class="settings-actions">
                <el-button type="primary" size="large" @click="onSubmit">
                    保存配置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { getCurrent } from '../utils/WindowsUtils';
import { Store } from '@tauri-apps/plugin-store';
// const store = new Store('store.bin');
let store: any = null;//await Store.load('store.json');


const form = reactive({
    inputFile: '',
    outputFile: '',
    videoCodec: '',
    audioCodec: '',
    resolution: '',
    audioSampleRate: '', // 新增音频采样率字段
    audioBitrate: '',
    bitrate: '',
    framerate: ''
});


(async () => {
    console.log('init store')
    store = await Store.load('store.json');
    let f = await store.get('form')
    // let formJson = localStorage.getItem('form');
    console.log(f)
    if (f) {
        // let json = JSON.parse(formJson);
        Object.assign(form, f);
    }
})()

const onSubmit = async () => {
    console.log('提交的配置:', form);
    // 这里可以添加保存配置的逻辑
    console.log(form)
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
        // 判断是否带‘k’结尾
        if (!form.audioBitrate.endsWith('k') && !form.audioBitrate.endsWith('K')) {
            ffmpegCommand += 'k';
        }
    }

    if (form.bitrate) {
        ffmpegCommand += ` -b:v ${form.bitrate}`;
        // 判断是否带‘k’结尾
        if (!form.bitrate.endsWith('k') && !form.bitrate.endsWith('K')) {
            ffmpegCommand += 'k';
        }
    }

    if (form.framerate) {
        ffmpegCommand += ` -r ${form.framerate}`;
    }
    await store.set('form', form);
    // localStorage.setItem('form', JSON.stringify(form))
    await store.save();
    localStorage.setItem('ffmpegCommandArg', ffmpegCommand)
    console.log('生成的 FFmpeg 命令:', ffmpegCommand);
    let win = getCurrent();
    win.close()
};
</script>

<style scoped>
.settings-page {
    display: flex;
    justify-content: center;
    padding: var(--space-8) var(--space-4);
    min-height: 100vh;
    background-color: var(--color-bg-subtle);
}

.settings-card {
    width: 100%;
    max-width: 560px;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    padding: var(--space-8);
}

/* --- Header --- */
.settings-header {
    margin-bottom: var(--space-6);
    text-align: center;
}

.settings-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
    margin-bottom: var(--space-1);
}

.settings-subtitle {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
}

/* --- Section --- */
.settings-section {
    padding: var(--space-2) 0;
}

.section-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
}

.section-icon {
    font-size: var(--text-lg);
}

.section-label {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    letter-spacing: var(--tracking-wide);
}

/* --- Divider --- */
.section-divider {
    margin: var(--space-6) 0;
}

.divider-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--color-text-muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

/* --- Actions --- */
.settings-actions {
    display: flex;
    justify-content: center;
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
}

.settings-actions .el-button {
    min-width: 160px;
}
</style>
