<docs>
---
title: 自定义单元格渲染插槽
---

在定义`columns`数组时，可设置`slot`属性
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
    slot: 'age',
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
    name: `王小虎${index + 1}`,
    age: 32 + index,
    address: `黄河市金沙路1518弄${index + 1}`,
    action: '删除',
  }
}))
</script>

<template>
  <div>
    <t-table :columns="columns" :data="data">
      <template #age="{ value }">
        <!-- 这是一个注释节点 -->
        <span style="color: red;">{{ value }}</span>
        <span>岁</span>
      </template>
    </t-table>
  </div>
</template>
