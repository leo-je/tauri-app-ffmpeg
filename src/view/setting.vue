<!-- src/view/setting.vue -->
<template>
    <div>
        <el-form :model="form" label-width="120px">

            <el-form-item label="视频编码器">
                <el-select v-model="form.videoCodec" placeholder="请选择视频编码器">
                    <el-option label="libx264" value="libx264"></el-option>
                    <el-option label="libx265" value="libx265"></el-option>
                    <el-option label="h264_nvenc" value="h264_nvenc"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="音频编码器">
                <el-select v-model="form.audioCodec" placeholder="请选择音频编码器">
                    <el-option label="aac" value="aac"></el-option>
                    <el-option label="libmp3lame" value="libmp3lame"></el-option>
                    <el-option label="opus" value="opus"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分辨率">
                <el-input v-model="form.resolution" placeholder="请输入分辨率（例如：1920x1080）"></el-input>
            </el-form-item>
            <el-form-item label="音频采样率">
                <el-input v-model="form.audioSampleRate" placeholder="请输入音频采样率（例如：48000）"></el-input>
            </el-form-item>
            <el-form-item label="音频比特率">
                <el-input v-model="form.audioBitrate" placeholder="请输入音频比特率（例如：128k）"></el-input>
            </el-form-item>
            <el-form-item label="视频比特率">
                <el-input v-model="form.bitrate" placeholder="请输入比特率（例如：1000k）"></el-input>
            </el-form-item>
            <el-form-item label="帧率">
                <el-input v-model="form.framerate" placeholder="请输入帧率（例如：30）"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px;">
                <el-button style="margin-left: 35%;" type="primary" @click="onSubmit">保存配置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { getCurrent } from '../utils/WindowsUtils';

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

let formJson = localStorage.getItem('form');
if(formJson){
    let json = JSON.parse(formJson);
    Object.assign(form, json);
}

const onSubmit = () => {
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
        if (!form.audioBitrate.endsWith('k') && !form.audioBitrate.endsWith('K')) {
            ffmpegCommand += 'k';
        }
    }

    if (form.framerate) {
        ffmpegCommand += ` -r ${form.framerate}`;
    }
    localStorage.setItem('form', JSON.stringify(form))
    localStorage.setItem('ffmpegCommandArg', ffmpegCommand)
    console.log('生成的 FFmpeg 命令:', ffmpegCommand);
    let win = getCurrent();
    win.close()
};
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    /* width: 480px; */
    /* margin: 20px auto; */
}
</style>