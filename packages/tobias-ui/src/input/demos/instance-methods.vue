<docs>
---
title: 使用输入框实例方法
---

调用输入框组件定义时expose出来的方法

输入框组件定义时expose出了`focus`和`blur`两个方法

调用`focus`可使输入框处于聚焦状态

调用`blur`可使输入框处于非聚焦状态
</docs>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const inputRef = ref()

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <t-input ref="inputRef" />
</template>
