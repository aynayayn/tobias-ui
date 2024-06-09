<docs>
---
title: tooltip显示在不同方位
---

通过设置`placement`属性调整tooltip的显示位置
</docs>

<script lang="ts" setup>
import { ref } from 'vue'

const defaultContent = ref<string>('我是默认提示内容')
</script>

<template>
  <div style="width: 100%; height: 160px; position: relative; display: flex;">
    <div style="width: 100px; height: 100%; margin-left: 50px; display: flex; flex-direction: column; justify-content: space-between;align-items: flex-start;">
      <t-tooltip placement="left" :content="defaultContent" style="display: block;">
        <t-button>left</t-button>
      </t-tooltip>
      <t-tooltip placement="left-start" :content="defaultContent" style="display: block;">
        <t-button>left-start</t-button>
      </t-tooltip>
      <t-tooltip placement="left-end" :content="defaultContent" style="display: block;">
        <t-button>left-end</t-button>
      </t-tooltip>
    </div>

    <div style="width: 315px;display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <t-tooltip placement="top" :content="defaultContent">
          <t-button>top</t-button>
        </t-tooltip>
        <t-tooltip placement="top-start" :content="defaultContent">
          <t-button>top-start</t-button>
        </t-tooltip>
        <t-tooltip placement="top-end" :content="defaultContent">
          <t-button>top-end</t-button>
        </t-tooltip>
      </div>
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <t-tooltip placement="bottom" :content="defaultContent">
          <t-button>bottom</t-button>
        </t-tooltip>
        <t-tooltip placement="bottom-start" :content="defaultContent">
          <t-button>bottom-start</t-button>
        </t-tooltip>
        <t-tooltip placement="bottom-end" :content="defaultContent">
          <t-button>bottom-end</t-button>
        </t-tooltip>
      </div>
    </div>

    <div style="width: 100px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end;">
      <t-tooltip placement="right" :content="defaultContent" style="display: block;">
        <t-button>right</t-button>
      </t-tooltip>
      <t-tooltip placement="right-start" :content="defaultContent" style="display: block;">
        <t-button>right-start</t-button>
      </t-tooltip>
      <t-tooltip placement="right-end" :content="defaultContent" style="display: block;">
        <t-button>right-end</t-button>
      </t-tooltip>
    </div>
  </div>
</template>
