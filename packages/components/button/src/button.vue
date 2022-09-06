<template>
  <button class="sp-button" :class="buttonClass">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { globName } from '@sp-ui/utils'
export default {
  // http://www.bootstrapmb.com/item/12846/preview
  name: globName('Button')
}
</script>

<script lang="ts" setup>
import { buttonProps } from './props'
import { namespace } from '@sp-ui/utils'
import { computed } from 'vue'
const props = defineProps(buttonProps)

console.log(props.size)

const ns = namespace('button')
const buttonClass = computed(() => {
  return [ns.is('size', props.size), ns.is('type', props.type)]
})
</script>
