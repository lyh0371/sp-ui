<template>
  <div class="sp-tabbar1">
    <div class="tabbar-wrap" :style="{ height: height, backgroundColor: bgColor }">
      <span class="tabbar-wrap__indicator" :style="indicatorStyle"></span>
      <div
        v-for="(item, index) in tabList"
        :key="item.title"
        class="tabbar-wrap__item"
        :style="{ width: tabWidth }"
        :class="{ active: activeIndex === index }"
        @click="clickHandle(item, index)"
      >
        <div class="icon" v-html="item.icon"></div>
        <span class="title"> {{ item.title }}</span>
      </div>
    </div>
    <svg id="filter-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { propsFn, TtabList } from './props'
const emit = defineEmits(['update:activeIndex', 'change'])
const clickHandle = (item: TtabList, index: Number) => {
  emit('update:activeIndex', index)
  emit('change', item)
}
const props = defineProps(propsFn({ type: 1 }))
const tabLen = props.tabList!.length
const tabWidth = computed(() => 100 / tabLen + '%')
const indicatorStyle = computed(() => {
  const indicatorLeft = (100 / (tabLen * 2)) * (props.activeIndex * 2 + 1) + '%'
  return {
    left: `calc(${indicatorLeft} - calc((${props.height} + 10px) / 2))`,
    height: props.height,
    width: `calc(${props.height} + 10px)`,
    backgroundColor: props.bgColor
  }
})
</script>
