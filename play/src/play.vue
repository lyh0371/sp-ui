<template>
  <div class="footer-tabber">
    <SpTabbar v-model:activeIndex="activeIndex" :type="2" :tab-list="tabList" @change="change"></SpTabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tabList = ref([
  {
    icon: `首页`
  },
  {
    icon: `新闻`
  },
  {
    icon: `添加`
  },
  {
    icon: '列表'
  },
  {
    icon: `我的`
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
