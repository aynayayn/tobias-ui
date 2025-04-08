<docs>
---
title: 虚拟列表的基础使用
---

这是一个`virtualList`的基础用例（列表项定高）
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(Array.from({ length: 2000 }).map((_, index) => ({
  text: `${index + 1}ABC`,
})))
const itemHeight = ref(-100)
const styleObj = ref({})

function handleClick() {
  styleObj.value = {
    height: '800px',
  }
}

function handleItemClick(record: Record<string, any>) {
  console.log(record)
}
</script>

<template>
  <div>
    <t-virtual-list
      :style="styleObj"
      :data="data"
      :item-height="itemHeight"
      @item-click="handleItemClick"
    >
      <template #item="{ item }">
        <div class="item">
          <span class="item-text">{{ item.text }}</span>
          <span>abc</span>
        </div>
      </template>
    </t-virtual-list>
    <t-button style="margin-top: 10px;" @click="handleClick">
      将视口区域高度修改成800px
    </t-button>
  </div>
</template>

<style lang="less" scoped>
  .item {
    width: 100%;
    height: 100%;

    &-text {
      color: red;
    }
  }
</style>
