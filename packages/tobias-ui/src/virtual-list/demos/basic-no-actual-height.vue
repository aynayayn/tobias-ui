<docs>
---
title: 非定高虚拟滚动列表
---

非定高虚拟滚动列表基础使用例子
</docs>

<script lang="ts" setup>
import { ref } from 'vue'
import Mock from 'mockjs'

const data = Mock.mock({
  'list|10000': [
    {
      'id|+1': 1,
      title: '@ctitle(10, 20)',
      content: '@cparagraph(1, 7)',
    },
  ],
})

const list = ref<any[]>(data.list)

function handleItemClick(record: Record<string, any>, _e: Event) {
  console.log(record)
}

function handleClick() {
  setTimeout(() => {
    const data = Mock.mock({
      'list|100000': [
        {
          'id|+1': 1,
          title: '@ctitle(10, 20)',
          content: '@cparagraph(1, 7)',
        },
      ],
    })
    list.value = data.list
  })
}
</script>

<template>
  <div>
    <t-virtual-list-dynamic-item-height style="height: 500px;" :data="list" @item-click="handleItemClick">
      <template #item="{ item, index }">
        <div style="width: 100%; margin-bottom: 20px; padding: 10px; border-radius: 4px;" :class="{ 'deep-bg': index % 2 === 1 }">
          <p style="font-size: 24px;">
            index({{ index }}): {{ item.title }}
          </p>
          <p>
            id({{ item.id }}): {{ item.content }}
          </p>
        </div>
      </template>
    </t-virtual-list-dynamic-item-height>
    <t-button style="margin-top: 10px;" @click="handleClick">
      生成10万条数据（模拟改变props.data）
    </t-button>
  </div>
</template>

<style lang="less" scoped>
  .deep-bg {
    background-color: antiquewhite;
  }
</style>
