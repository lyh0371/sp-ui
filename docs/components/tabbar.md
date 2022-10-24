# Tabbal 按钮

用于移动端底部 tabbar。
也可以使用在 PC 端，如果你愿意的话

## 基础用法

:::demo

```vue
<template>
  <sp-tabbar :tabList="tabList" v-model:activeIndex="activeIndex" @change="change"></sp-tabbar>
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
const activeIndex = ref(0)
const change = (item: any) => {
  console.log(item)
}
</script>
```
