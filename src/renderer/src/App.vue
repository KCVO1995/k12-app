<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="global">
    <div class="sku-settings"></div>
    <div class="control"></div>
    <el-button @click="ipcHandle">账号密码登录</el-button>
  </div>
</template>

<style lang="scss" scoped>
.global {
  .control {
    border: 1px solid red;
    height: 500px;
  }
}
</style>
