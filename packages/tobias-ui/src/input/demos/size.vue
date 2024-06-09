<docs>
---
title: 设置输入框的尺寸大小
---
通过设置`size`属性来调整输入框的大小，默认值是`default`，其他可用值有`small`, `large`
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <div>
    <t-input v-model="value" />
    <t-input v-model="value" size="large" />
    <t-input v-model="value" size="small" />
  </div>
</template>
