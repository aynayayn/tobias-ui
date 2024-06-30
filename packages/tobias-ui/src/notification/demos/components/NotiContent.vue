<script lang="ts" setup>
import Mock from 'mockjs'
import { ref } from 'vue'

const msg = Mock.mock('@cparagraph(1,7)')

const value = ref<string>(msg)
</script>

<template>
  <div style="color: skyblue">
    <t-button>测试按钮</t-button>
    <p>{{ value }}</p>
  </div>
</template>
