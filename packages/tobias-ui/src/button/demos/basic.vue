<docs>
---
title: 基础使用
---
</docs>

<script lang="ts" setup>
function handleClick(e: Event) {
  console.log('click', e)
}
</script>

<template>
  <div>
    <t-button @click="handleClick">
      按钮1
    </t-button>
    <t-button type="dashed">
      按钮2
    </t-button>
    <t-button type="primary">
      按钮3
    </t-button>
  </div>
</template>
