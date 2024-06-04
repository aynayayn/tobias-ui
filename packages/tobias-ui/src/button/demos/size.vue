<docs>
---
title: 基础使用
---

通过`size`属性可以设置按钮大小
</docs>

<script lang="ts" setup>
function handleClick(e: Event) {
  console.log('click', e)
}
</script>

<template>
  <div>
    <t-button size="default" @click="handleClick">
      按钮1
    </t-button>
    <t-button size="small">
      按钮2
    </t-button>
    <t-button type="large">
      按钮3
    </t-button>
  </div>
</template>
