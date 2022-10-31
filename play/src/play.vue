<template>
  <div class="footer-tabber">
    <SpTabbar v-model:activeIndex="activeIndex" :type="3" :tab-list="tabList" @change="change"></SpTabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tabList = ref([
  {
    title: '首页',
    icon: `<i class="iconfont icon-shouye"></i>`
  },
  {
    title: '列表1',
    icon: `<i class="iconfont icon-liebiao"></i>`
  },
  {
    title: '列表2',
    icon: `<i class="iconfont icon-liebiao"></i>`
  },
  {
    title: '我的',
    icon: `<i class="iconfont icon-wode"></i>`
  }
])
const activeIndex = ref(1)
const change = (item: any) => {
  console.log(item)
}
</script>
<style scoped>
.name {
  font-size: 16px;
}
.footer-tabber {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
