<script setup lang="ts">
import FileTransform from './components/FileTransform/index.vue'
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="global">
    <div class="sku-settings"></div>
    <FileTransform />
  </div>
</template>

<style lang="scss" scoped>
.global {
  padding: 60px;

  .sku-settings {
    border: 1px solid green;
    height: 250px;
  }
}
</style>
