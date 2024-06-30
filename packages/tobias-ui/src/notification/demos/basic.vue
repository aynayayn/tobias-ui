<docs>
---
title: 基础使用
---

这是一个`notification`基础使用的例子
</docs>

<script lang="ts" setup>
import { Notification } from 'tobias-ui'
import Mock from 'mockjs'
import { getCurrentInstance, h } from 'vue'
import NotiContent from './components/NotiContent.vue'

const curInstance = getCurrentInstance()

function handleClick() {
  const close = Notification.info({
    title: Mock.mock('@ctitle(1, 7)'),
    // content: h(Button, {}, '测试按钮'), // 这样写，t-button的样式是生效的
    content: h(NotiContent), // 这样写（NotiContent组件里引用了t-button），t-button的样式不生效
    appContext: curInstance?.appContext,
  })

  setTimeout(() => {
    close()
  }, 3000)
}
</script>

<template>
  <div>
    <t-button @click="handleClick">
      弹出通知框
    </t-button>
  </div>
</template>
