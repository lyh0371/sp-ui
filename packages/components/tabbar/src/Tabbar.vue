<template>
  <component :is="modelComp" v-bind="$attrs"></component>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import Model1 from './Model1.vue'
import Model2 from './Model2.vue'

type Ttype = 1 | 2
const props = defineProps({
  type: {
    type: Number as PropType<Ttype>,
    default: 1
  }
})

const modelArr = ['', Model1, Model2]
const modelComp = computed(() => modelArr[props.type])
</script>
<style scoped></style>
