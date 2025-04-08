<docs>
---
title: 加载中状态
---

设置`loading`属性为`true`使按钮显示“加载中”
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref<boolean>(false)

function handleClick() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <t-button :loading="loading" @click="handleClick">
      按钮
    </t-button>
  </div>
</template>
