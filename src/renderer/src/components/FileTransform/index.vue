<script setup>
import iconCSV from '@renderer/assets/imgs/icon-csv.png'
import iconTransform from '@renderer/assets/imgs/icon-transform.png'
</script>

<template>
  <div class="control">
    <div class="left file">
      <img class="icon" :src="iconCSV" alt="" />
      <div class="file-name">2011.csv</div>
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
  width: 700px;
  height: 300px;

  .icon-transform {
    width: 50px;
    height: 50px;
  }

  .file {
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
