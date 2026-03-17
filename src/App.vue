<template>
  <div class="app-shell">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
// Global selection disabled via CSS class in .app-shell
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-bg-subtle);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
