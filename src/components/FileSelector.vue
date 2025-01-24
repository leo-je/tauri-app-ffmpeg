<template>
    <div>
      <button @click="selectFile">选择文件</button>
      <p v-if="filePath">已选择: {{ filePath }}</p>
    </div>
  </template>
  
  <script>
import { open } from '@tauri-apps/plugin-dialog';

  export default {
    props: [],
    data() {
      return {
        filePath: null,
      };
    },
    methods: {
      async selectFile() {
        const filePath = await open({
            multiple: false,
            directory: false,
        });
        console.log(filePath);
        this.filePath = filePath;
        this.$emit('file-selected', filePath);
      },
    },
  };
  </script>
  