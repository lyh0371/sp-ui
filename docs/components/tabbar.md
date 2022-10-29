# Tabbal 按钮

用于移动端底部 tabbar。
也可以使用在 PC 端，如果你愿意的话

## 模式 1

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

:::

## 模式 2

> 突然想起老罗在发布会的一句话，明明一个图标就可以表示一个 APP，为什么还要在 APP 下面加上名字？于是我...

:::demo

```vue
<template>
  <sp-tabbar :tabList="tabList" v-model:activeIndex="activeIndex" :type="2" @change="change"></sp-tabbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tabList = ref([
  {
    icon: `<i class="iconfont icon-shouye"></i>`
  },
  {
    icon: `<i class="iconfont icon-tianjia"></i>`
  },
  {
    icon: `<i class="iconfont icon-wode"></i>`
  }
])
const activeIndex = ref(1)
const change = (item: any) => {
  console.log(item)
}
</script>
```

:::

如果你愿意的话，还可以这样

:::demo

```vue
<template>
  <sp-tabbar :tabList="tabList" v-model:activeIndex="activeIndex" :type="2" @change="change"></sp-tabbar>
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
const activeIndex = ref(0)
const change = (item: any) => {
  console.log(item)
}
</script>
```

:::
