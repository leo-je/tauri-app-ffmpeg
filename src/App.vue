<template>
  <div class="app">
    <el-form :model="form" label-width="140px">
      <el-row>
        <el-col :span="18">
          <div class="grid-content ep-bg-purple" />
          <el-form-item label="1.源文件">
            <el-input disabled v-model="form.filePath" />
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3"><el-button type="primary" @click="selectFile">选择</el-button></el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-form-item label="2.目标格式">
        <el-select v-model="form.format" placeholder="请选择需要转换的格式" >
          <el-option v-for="item in audioFormats" :key="item" :label="item" :value="item" />
        </el-select>

      </el-form-item>
      <el-form-item label="3.转换参数">
        <el-switch v-model="form.isAugment" />
      </el-form-item>
      <el-form-item label="">
        <el-input :disabled="!form.isAugment" v-model="form.augment" />
      </el-form-item>

      <el-row>
        <el-col :span="18">
          <div class="grid-content ep-bg-purple" />
          <el-form-item label="4.输出目录">
            <el-input disabled v-model="form.outPath" />
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3"><el-button type="primary" @click="selectDirectory">选择</el-button></el-col>
        <el-col :span="2"></el-col>
      </el-row>

      <el-form-item>
        <el-button :disabled="(!form.filePath || !form.outPath || !form.format) || form.isConverting" type="primary"
          @click="convert">转换</el-button>
      </el-form-item>
      <div>
        <span>日志</span>
        <el-input v-model="form.logs" type="textarea" :rows="8" />
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { open } from '@tauri-apps/plugin-dialog';
import { Command } from 'tauri-plugin-shellx-api';
import { platform } from '@tauri-apps/plugin-os';
import { path } from '@tauri-apps/api';
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
  localStorage.setItem('form', JSON.stringify(form))
}
const getting = () => {
  let formStr = localStorage.getItem('form')
  if (formStr) {
    let json = JSON.parse(formStr)
    json.logs = ''
    json.isConverting = false
    Object.assign(form, json)
  }
}

getting();

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
  console.log(dirPath);
  form.outPath = dirPath
}
const checkPlatform = () => {
  let currentPlatform = platform();
  if (currentPlatform === 'windows') {
    console.log('当前操作系统是 Windows');
  } else if (currentPlatform === 'macos') {
    console.log('当前操作系统是 macOS');
  } else if (currentPlatform === 'linux') {
    console.log('当前操作系统是 Linux');
  } else {
    console.log('未知操作系统：' + currentPlatform);
  }
  return currentPlatform;
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
  console.log(form)
  // this.$emit('convert', { format: this.format });
  // ffmpeg -i 绣球圆缘音乐.wav -b:a 320k -ar 48000 绣球圆缘音乐.mp3
  let outFileName = form.filePath.split('/').pop() + '.' + form.format;
  console.log(outFileName);
  let outPath = form.outPath + '/' + outFileName;
  // let sh = `ffmpeg -i ${this.file} -b:a 320k -ar 48000 ${outPath}`;
  // console.log();
  // const cmd = Command.create('ffmpeg', ['-i', this.file,'-b:a 320k','-ar','48000' ,outPath])
  let macScript =
`#! /bin/bash
echo '开始转换...'
# echo 'appLocalDataDir:${p}'
# echo 'appDataDir:${p2}'
# echo 'appConfigDir:${p3}'
# echo 'appLogDir:${p4}'
# echo 'resourceDir:${p5}'
${p5}/assets/mac/ffmpeg -y -i ${form.filePath} ${form.isAugment ? form.augment : ''} ${outPath}
echo '结束转换...'
return $?
`
  let winScript = 
`
@echo off
echo 开始转换...
echo 'resourceDir:${p5}'
${p5}/assets/win/ffmpeg/bin/ffmpeg.exe -y -i ${form.filePath} ${form.isAugment ? form.augment : ''} ${outPath}
echo 结束转换...
`
  console.log(platformName == 'macos'?macScript:winScript);
  const command = Command.create('zsh', ['-c', macScript]);
  command.on('close', data => {
    console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    form.isConverting = false;
    form.logs += 'end command!\n';
  });
  command.on('error', error => {
    console.error(`command on error: "${error}"`)
    form.isConverting = false;
    form.logs += error + '\n';
  });
  command.stdout.on('data', line => {
    console.log(`command stdout: "${line}"`)
    form.logs += line;
  });
  command.stderr.on('data', line => {
    console.log(`command stderr: "${line}"`)
    form.logs += line;
  });

  const child = await command.spawn();
  console.log('pid:', child.pid);
}
</script>


<style>
.app {
  width: 95%;
}
</style>
