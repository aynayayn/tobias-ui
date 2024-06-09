<docs>
---
title: 非props属性继承
---

除了`autocomplete`会被继承到input dom元素本身之外，其他属性均会由input dom元素外层的div继承
</docs>

<script lang='ts' setup>
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <t-input v-model="value" autocomplete test />
</template>
