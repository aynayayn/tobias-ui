<docs>
---
title: 禁用按钮
---

设置`disabled`属性为`true`实现禁用按钮
</docs>

<script lang="ts" setup>
function handleClick() {
  console.log('click')
}
</script>

<template>
  <t-button type="dashed" disabled @click="handleClick">
    按钮
  </t-button>
</template>
