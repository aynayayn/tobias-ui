<docs>
---
title: 自定义单元格渲染函数
---

在定义`columns`数组时，如果某一列的单元格内容需要自定义显示，可以编写`customRender`函数
`customRender`函数接收一个包含`value`和`record`的对象
</docs>

<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    title: '姓名',
    key: 'name',
  },
  {
    title: '年龄',
    key: 'age',
    render: (params: { value: any; record: Record<string, any> }) => {
      return h('span', null, `${params.value}岁`)
    },
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
    <t-table :columns="columns" :data="data" />
  </div>
</template>
