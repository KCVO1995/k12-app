<script setup>
import { ref } from 'vue'
import iconCSV from '@renderer/assets/imgs/icon-csv.png'
import iconTransform from '@renderer/assets/imgs/icon-transform.png'
import iconPlus from '@renderer/assets/imgs/icon-plus.png'

const uploadFileName = ref('')

const upload = async () => {
  const fileName = await window.electronAPI.openFile()
  uploadFileName.value = fileName
}
</script>

<template>
  <div class="control">
    <div class="left file">
      <template v-if="uploadFileName">
        <img class="icon" :src="iconCSV" alt="" />
        <div class="file-name">{{ uploadFileName }}</div>
      </template>
      <div v-else class="upload" @click="upload">
        <img class="icon-plus" :src="iconPlus" alt="" />
      </div>
    </div>
    <div class="middle">
      <img class="icon-transform" :src="iconTransform" alt="" />
    </div>
    <div class="right file">
      <img class="icon" :src="iconCSV" alt="" />
      <div class="file-name">2011.csv</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 300px;

  .icon-transform {
    width: 50px;
    height: 50px;
  }

  .upload-wrapper {
    .icon-csv {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
      width: 90px;
      height: 90px;
    }
  }

  .file {
    width: 400px;
    text-align: center;

    .upload {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border: 1px dashed #18a058;
      width: 200px;
      height: 200px;
      cursor: pointer;

      .icon-plus {
        width: 50px;
        height: 50px;
      }
    }

    .file-name {
      text-align: center;
    }

    .icon {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
