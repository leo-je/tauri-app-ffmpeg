<template>
    <div>
        <label>转换类型:</label>
        <select v-model="format">
            <option value="avi">AVI</option>
            <option value="mp3">MP3</option>
            <option value="mp4">MP4</option>
        </select>
        <div>
            <button @click="selectDirectory">选择目标目录</button>
            <p v-if="directory">目标目录: {{ directory }}</p>
        </div>
        <button @click="convert" :disabled="!file || !directory">转换</button>
    </div>
</template>

<script>
import { open } from '@tauri-apps/plugin-dialog';
import { Command, executeBashScript, makeAppleScript, makeBashScript } from 'tauri-plugin-shellx-api';
import { app } from '@tauri-apps/api';
import { platform } from '@tauri-apps/plugin-os';





export default {
    props: ['file'],
    data() {
        return {
            format: 'avi',
            directory: null,
        };
    },
    methods: {
        checkPlatform() {
            let currentPlatform = platform();
            if (currentPlatform === 'windows') {
                console.log('当前操作系统是 Windows');
            } else if (currentPlatform === 'macos') {
                console.log('当前操作系统是 macOS');
            } else if (currentPlatform === 'linux') {
                console.log('当前操作系统是 Linux');
            } else {
                console.log('未知操作系统：'+currentPlatform);
            }
            return currentPlatform;
        },
        async selectDirectory() {
            const dirPath = await open({
                multiple: false,
                directory: true,
            })
            console.log(dirPath);
            this.directory = dirPath
        },
        async convert() {
            this.checkPlatform();
            // this.$emit('convert', { format: this.format });
            // ffmpeg -i 绣球圆缘音乐.wav -b:a 320k -ar 48000 绣球圆缘音乐.mp3
            let outFileName = this.file.split('/').pop() + '.' + this.format;
            console.log(outFileName);
            let outPath = this.directory + '/' + outFileName;
            // let sh = `ffmpeg -i ${this.file} -b:a 320k -ar 48000 ${outPath}`;
            // console.log();
            // const cmd = Command.create('ffmpeg', ['-i', this.file,'-b:a 320k','-ar','48000' ,outPath])
            let script = `ffmpeg -i ${this.file} -b:a 320k -ar 48000 ${outPath}`
            console.log(script);
            const command = Command.create('sh', ['-c', script]);
            command.on('close', data => {
                console.log(`command finished with code ${data.code} and signal ${data.signal}`)
            });
            command.on('error', error => console.error(`command error: "${error}"`));
            command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
            command.stderr.on('data', line => console.log(`command stderr: "${line}"`));

            const child = await command.spawn();
            console.log('pid:', child.pid);

        },
    }
}
</script>