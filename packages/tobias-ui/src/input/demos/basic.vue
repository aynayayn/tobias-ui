<docs>
---
titie: 基础使用
---

这是一个`input`基础使用的例子
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <div>
    <t-input v-model="value" />
  </div>
</template>
