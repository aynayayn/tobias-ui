<docs>
---
title: 使用transform实现的虚拟滚动列表
---

使用`transform: translateY([x]px)`实现的虚拟滚动列表（列表项定高）
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(Array.from({ length: 200 }).map((_, index) => ({
  text: `${index + 1}ABC`,
})))

function handleItemClick(record: Record<string, any>, e: Event) {
  console.log(record)
  console.log(e)
}
</script>

<template>
  <div>
    <t-virtual-list-translate :data="data" @item-click="handleItemClick">
      <template #item="{ item }">
        <div style="width: 100%; height: 100%">
          <span>item.text: {{ item.text }}</span>
        </div>
      </template>
    </t-virtual-list-translate>
  </div>
</template>
