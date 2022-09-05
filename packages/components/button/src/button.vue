<template>
  <div class="button">
    <div class="btn">我是button{{ name }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('lyh')
</script>
