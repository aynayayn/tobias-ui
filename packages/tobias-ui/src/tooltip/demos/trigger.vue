<docs>
---
title: 触发tooltip显示的方式
---

通过`trigger`属性设置触发tooltip显示的方式
</docs>

<script lang="ts" setup>
</script>

<template>
  <t-tooltip trigger="hover" style="cursor: pointer; margin-right: 20px;" content="123">
    <t-button>hover</t-button>
  </t-tooltip>

  <t-tooltip trigger="click" style="cursor: pointer;" content="456">
    <t-button>click</t-button>
  </t-tooltip>
</template>
