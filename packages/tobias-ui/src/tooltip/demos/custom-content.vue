<docs>
---
title: 自定义tooltip的显示内容
---

通过`content`插槽自定义tooltip的显示内容
</docs>

<script lang="ts" setup>
</script>

<template>
  <t-tooltip>
    <t-button>123</t-button>
    <template #content>
      <span style="color: yellow">12345</span>
    </template>
  </t-tooltip>
</template>
