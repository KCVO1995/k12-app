<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="action">
    <el-button @click="ipcHandle">账号密码登录</el-button>
  </div>
</template>
