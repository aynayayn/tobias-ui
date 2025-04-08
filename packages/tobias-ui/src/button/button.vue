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
    loading: {
      type: Boolean,
      default: false,
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

    const btnLoadingCls = c(['loading', 'E'])

    return {
      handleClick,
      cls,
      btnLoadingCls,
    }
  },
})
</script>

<!-- :disabled="$props.disabled" or :disabled="disabled" -->
<!-- 不要随意在template中编写注释 -->
<template>
  <button :disabled="$props.disabled" :class="cls" @click="handleClick">
    <svg v-if="$props.loading" :class="btnLoadingCls" width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    <slot />
  </button>
</template>
