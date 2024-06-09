<docs>
---
title: 输入框禁用
---

通过设置`disabled`属性为`true`使输入框处于禁用状态
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

// 这里如果不给值，就是undefined；由于在TInput中设置了props.modelValue的默认值为''，所以会使用''而不是undefined作为props.modelValue的初始值
// 如果这里给了值，TInput中的props.modelValue的初始值就是这里给的值
const value = ref<string>()
</script>

<template>
  <t-input v-model="value" disabled />
</template>
