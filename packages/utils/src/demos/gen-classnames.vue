<script lang="ts" setup>
import { useClassnames } from '@tobias-ui/utils/gen-classnames'
import { ref } from 'vue'

const { c, cx } = useClassnames('button')

const b = ref<boolean>(false)
const names = cx(() => ({
  c: true,
  d: b.value,
}))
</script>

<template>
  <div>
    {{ names }}
    <button @click="b = !b">
      按钮
    </button>
    <p>
      {{ c('1', '2', ['3', 'M']) }}
    </p>
  </div>
</template>
