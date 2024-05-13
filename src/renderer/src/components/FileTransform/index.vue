<script setup>
import { ref } from 'vue'
import iconCSV from '@renderer/assets/imgs/icon-csv.png'
import iconTransform from '@renderer/assets/imgs/icon-transform.png'
import iconPlus from '@renderer/assets/imgs/icon-plus.png'

const uploadFilePath = ref(`/Users/leejacky/Downloads/demo.csv`)
const hasTransform = ref(false)
// const uploadFilePath = ref('')

const getFileNameByPath = (path) => {
  const fileName = path.split('/').pop()
  return fileName
}

const upload = async () => {
  const filePath = await window.electronAPI.openFile()
  getFileNameByPath(filePath)
  uploadFilePath.value = filePath
}

const clearFilePath = () => {
  uploadFilePath.value = ''
  hasTransform.value = false
}

const saveFile = async () => {
  await window.electronAPI.saveFile()
}

const fileTransform = async () => {
  if (!uploadFilePath.value) return
  await window.electronAPI.transformFile(uploadFilePath.value)
  hasTransform.value = true
}
</script>

<template>
  <div class="control">
    <div class="left file">
      <template v-if="uploadFilePath">
        <img class="icon" :src="iconCSV" alt="" />
        <div class="file-name">{{ getFileNameByPath(uploadFilePath) }}</div>
        <n-button class="button" type="primary" @click="clearFilePath">重新选择</n-button>
      </template>
      <div v-else class="upload" @click="upload">
        <img class="icon-plus" :src="iconPlus" alt="" />
      </div>
    </div>
    <div class="middle">
      <img class="icon-transform" :src="iconTransform" alt="" />
      <n-button v-if="uploadFilePath" class="button" type="primary" @click="fileTransform"
        >转换</n-button
      >
    </div>
    <div class="right file">
      <img class="icon" :src="iconCSV" alt="" />
      <div class="file-name">结果</div>
      <n-button v-if="hasTransform" class="button" type="primary" @click="saveFile">下载</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .middle {
    display: flex;
    text-align: center;
    flex-direction: column;
  }

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

  .button {
    margin-top: 15px;
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
