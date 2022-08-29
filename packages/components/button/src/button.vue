<template>
  <div class="button">
    <div class="btn">我是button</div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scope>
.button {
  .btn {
    background-color: red;
  }
  &:hover {
    color: yellow;
  }
}
</style>
