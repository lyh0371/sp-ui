<template>
  <Button></Button>
</template>
<script lang="ts" setup>
import { Button } from 'sp-ui'
import { testFn } from '@sp-ui/utils'

const res = testFn(1, 2)
console.log(res)
</script>
<style scoped></style>
