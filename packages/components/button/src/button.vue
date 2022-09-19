<template>
  <button v-ripple class="sp-button" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { buttonProps } from './props'
import { namespace } from '@sp-ui/utils'
import vRipple from '@sp-ui/utils/directives/ripple'
import { computed } from 'vue'
const props = defineProps(buttonProps)
const ns = namespace('button')
const buttonClass = computed(() => {
  return [ns.is('size', props.size), ns.is('type', props.type)]
})
</script>
