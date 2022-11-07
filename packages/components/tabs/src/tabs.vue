<template>
  <div ref="tabsDom" class="sp--tabs">
    <tabs-bar :style="barStyle"></tabs-bar>
    <div
      v-for="(item, index) in tabs"
      :key="item.id"
      ref="tabsItem"
      data-color="red"
      class="sp--tabs__item"
      :class="activeIndex === index && 'sp--tabs__item__active'"
      @click="(e) => clickHandle(item, index, e)"
    >
      {{ item.title }}
      <slot v-if="item.slot" :name="item.slot"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import tabsBar from './tabsBar.vue'
import { useBarStyle } from './barHook'
import { watch, ref, watchEffect, onMounted } from 'vue'
type Ttabs = {
  id: number
  title: string
  slot?: string
  disabled?: boolean
}

type Props = {
  tabs: Ttabs[]
  themeColor?: string
  modelValue: number
  borderColor?: string
}

const ClassName = {
  themeColor: '--themeColor',
  borderColor: '--borderColor'
}

const { updataBarStyle, barStyle } = useBarStyle()
const emit = defineEmits(['change', 'update:modelValue'])

const props = withDefaults(defineProps<Props>(), {
  themeColor: 'red',
  modelValue: 0,
  borderColor: 'transparent'
})

const activeIndex = ref(0)

watch(
  () => props.modelValue,
  (newVal) => {
    activeIndex.value = newVal
  },
  {
    immediate: true
  }
)
const clickHandle = async (item: Ttabs, index: number, e: MouseEvent) => {
  await updataBarStyle(e)
  await updateEmit(item, index)
}

const updateEmit = async (item: Ttabs, index: number) => {
  emit('change', { ...item })
  emit('update:modelValue', index)
}
const tabsDom = ref<HTMLElement | null>(null)
const styleHandle = () => {
  const tDom = tabsDom.value
  if (tDom) {
    tDom.style.setProperty(ClassName.themeColor, props.themeColor)
    tDom.style.setProperty(ClassName.borderColor, props.borderColor)
  }
}
watchEffect(() => styleHandle())
const tabsItem = ref()
onMounted(() => {
  updataBarStyle({ target: [...tabsItem.value][activeIndex.value] } as MouseEvent)
})
</script>
