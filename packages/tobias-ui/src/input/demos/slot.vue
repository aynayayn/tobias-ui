<docs>
---
title: 在输入框中使用插槽
---

可以使用`prefix`为输入框指定左边的插槽
可以使用`suffix`为输入框指定右边的插槽
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()
</script>

<template>
  <div>
    <t-input v-model="value">
      <template #prefix>
        prefix
      </template>
    </t-input>

    <t-input v-model="value">
      <template #suffix>
        suffix
      </template>
    </t-input>
  </div>
</template>
