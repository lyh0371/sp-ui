<template>
  <div class="footer-tabber">
    <div>tabs</div>
    <sp-tabs v-model="activeIndex" :tabs="tabs" border-color="#eee" theme-color="green" @change="change">
      <template #slotA>
        <div class="small-tip">01</div>
      </template>
    </sp-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tabs = ref()
tabs.value = [...new Array(20)].map((item, index) => ({
  id: index,
  title: `科目${index + 1}`
}))

const activeIndex = ref(5)
const change = (item: any) => {
  console.log(item)
}
</script>
<style scoped>
.footer-tabber {
  margin: 100px;
  width: 200px;
}
.small-tip {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  position: absolute;
  font-size: 12px;
  top: -10px;
  right: -10px;
}
</style>
