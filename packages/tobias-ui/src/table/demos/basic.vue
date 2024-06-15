<docs>
---
title: 基础使用
---

`table`的基础使用
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
  },
  {
    title: '年龄',
    key: 'age',
  },
  {
    title: '住址',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
  },
])

const data = ref(Array.from({ length: 5 }).map((_, index) => {
  return {
    name: `王小虎 + ${index + 1}`,
    age: 32 + index,
    address: `黄河市金沙路1518弄${index + 1}`,
    action: '删除',
  }
}))
</script>

<template>
  <div>
    <t-table :columns="columns" :data="data" />
  </div>
</template>
