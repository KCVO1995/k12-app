<script setup lang="ts">
import FileTransform from './components/FileTransform/index.vue'
</script>

<template>
  <div class="global">
    <h1>v2</h1>
    <div class="content">
      <FileTransform />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
