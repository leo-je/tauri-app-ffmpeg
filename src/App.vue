<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
// 禁止鼠标左键选中和复制网页内容
function disableSelection(event: any) {
  if (typeof event.preventDefault !== "undefined") {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

// 在加载页面时绑定事件
window.onload = function () {
  document.addEventListener("mousedown", disableSelection);
  document.addEventListener("contextmenu", disableSelection);
};
</script>


<style scoped>
/* 禁止选择文本 */
* {
  -webkit-user-select: none;
  /* 针对 WebKit 内核的浏览器 */
  -moz-user-select: none;
  /* 针对 Firefox 浏览器 */
  -ms-user-select: none;
  /* 针对 IE 浏览器 */
  user-select: none;
  /* 标准属性 */
}
</style>
