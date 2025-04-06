<docs>
---
title: 通过自定义组件传递表格的列信息
---

在使用`t-table`组件时，在里面使用`t-table-column`组件，并指定`title`和`key`
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

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
    <t-table :data="data">
      <TTableColumn key="name" title="姓名" />
      <TTableColumn key="age" title="年龄" />
      <TTableColumn key="address" title="地址" />
      <TTableColumn key="action" title="操作" />
    </t-table>
  </div>
</template>
