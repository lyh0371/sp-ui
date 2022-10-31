<template>
  <div :id="`sp-tabbar__${id}`" class="sp-tabbar2">
    <div class="tabbar-wrap__indicator">
      <svg id="wave" version="1.1" :style="svgStyle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 119 26">
        <path class="path" d="M120.8,26C98.1,26,86.4,0,60.4,0C35.9,0,21.1,26,0.5,26H120.8z"></path>
      </svg>
    </div>
    <div class="tabbar-wrap" :style="{ height: height, backgroundColor: bgColor }">
      <div
        v-for="(item, index) in tabList"
        :key="item.title"
        class="tabbar-wrap__item"
        :style="{ width: tabWidth }"
        :class="{ active: activeIndex === index }"
        @click.stop="(e) => clickHandle(item, index, e)"
      >
        <div class="icon-wrap">
          <div class="icon" v-html="item.icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { propsFn, TtabList } from './props'
import { useUniqueId } from './hook'

const { id } = useUniqueId()
const emit = defineEmits(['update:activeIndex', 'change'])
const svgLeft = ref(0)
const waveWidth = ref(0)
const tabbarX = ref(0)
const clickHandle = (item: TtabList, index: Number, e: MouseEvent) => {
  let x = 0
  let targetDom = e.target as Element

  if (targetDom.matches('.icon-wrap')) {
    // 看看是不是目标元素
    x = targetDom.getBoundingClientRect().x
  } else if (targetDom.matches('.tabbar-wrap__item')) {
    x = targetDom.querySelector('.icon-wrap')!.getBoundingClientRect().x
  } else {
    // 点着儿子了
    while (targetDom.parentNode) {
      if (targetDom.matches('.icon-wrap')) {
        x = targetDom.getBoundingClientRect().x
        break
      }
      targetDom = targetDom.parentNode as Element
    }
  }
  svgLeft.value = x
  emit('update:activeIndex', index)
  emit('change', item)
}
const props = defineProps(propsFn({ type: 2 }))
const tabLen = props.tabList!.length
const tabWidth = computed(() => 100 / tabLen + '%')
const svgStyle = computed(() => ({
  left: svgLeft.value - waveWidth.value / 2 - tabbarX.value
}))
onMounted(() => {
  const doc = document.querySelector(`#sp-tabbar__${id}`)
  const tbx = doc!.querySelector('.tabbar-wrap')?.getBoundingClientRect().x as number
  const firstItem = doc!.getElementsByClassName('tabbar-wrap__item')[props.activeIndex]?.querySelector('.icon-wrap')
  waveWidth.value = (doc!.querySelector('#wave')!.getBoundingClientRect().width - 50) as number
  svgLeft.value = firstItem?.getBoundingClientRect().x as number
  tabbarX.value = tbx
})
</script>
