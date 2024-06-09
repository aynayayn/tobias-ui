<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useClassnames } from '@tobias-ui/utils'

export default defineComponent({
  name: 'TButton',
  props: {
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed'>,
      default: 'default',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    size: {
      type: String as PropType<'default' | 'small' | 'large'>,
      default: 'default',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: Event) => {
      emit('click', e)
    }

    const { c, cx } = useClassnames('button')
    const cls = cx(() => ({
      [c()]: true,
      [c([props.type, 'M'])]: true,
      [c('size', [props.size, 'M'])]: true,
    }))

    return {
      handleClick,
      cls,
    }
  },
})
</script>

<!-- :disabled="$props.disabled" or :disabled="disabled" -->
<!-- 不要随意在template中编写注释 -->
<template>
  <button :disabled="$props.disabled" :class="cls" @click="handleClick">
    <slot />
  </button>
</template>
