# Tabs

有点不一样的 `Tabs`

## 基础用法

:::demo

```vue
<template>
  <div style="margin-bottom:20px;">
    <sp-tabs :tabs="tabs" v-model="activeIndex" borderColor="#ccc" themeColor="green" @change="change">
      <template #slotA>
        <div class="small-tip">01</div>
      </template>
    </sp-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tabs = ref([
  {
    id: 1,
    title: '语文'
  },
  {
    id: 2,
    title: '数学',
    slot: 'slotA'
  },
  {
    id: 3,
    title: '外语',
    disabled: false
  },
  {
    id: 4,
    title: '生物'
  },
  {
    id: 5,
    title: '物理'
  }
])
const activeIndex = ref(1)
const change = (item: any) => {
  console.log(item)
}
</script>

<style scoped>
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
```
