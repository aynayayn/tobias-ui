<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useClassnames } from '@tobias-ui/utils'
import { omit, pick } from 'lodash-es'
import type { InputProps } from './interface'
import { inputDomProps } from './interface'

// vue version >= 3.3
defineOptions({
  name: 'TInput',
  inheritAttrs: false,
})

// be abled to import InputProps from other file unless vue version >= 3.3
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  disabled: false,
  size: 'default',
})

// from vue3.3
const emit = defineEmits<{
  'update:modelValue': [string]
  'change': [Event]
}>()

// from vue3.3
defineSlots<{
  prefix: () => any
  suffix: () => any
}>()

const { c, cx } = useClassnames('input')

const wrapperCls = cx(() => ({
  [c()]: true,
  [c(['disabled', 'M'])]: props.disabled,
  [c([props.size, 'M'])]: true,
}))

const inputCls = cx(() => ({
  [c('input')]: true,
}))

const prefixCls = c(['prefix', 'E'])

const suffixCls = c(['suffix', 'E'])

// 可以通过inputRef.value.value主动设置输入框的值
// input元素挂载完成后，在无任何主动输入行为的情况下，无论value属性被设置为了什么值，通过inputRef.value.value取到的都是空字符串
const inputRef = ref<HTMLInputElement | null>(null)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)

  // console.log(target.value)
  // console.log(props.modelValue)

  nextTick(() => {
    // console.log(props.modelValue)

    // 1. 如果在使用时没有v-model绑定，则props.modelValue会一直是初始默认值''，而这个函数被调用是在用户有输入之后，所以target.value不会为''，
    // target.value !== props.modelValue成立，输入框被主动设置为初始默认值（外在的表现就是用户不能输入内容）
    // 2. 如果在使用时绑定了v-model，则经过了更新之后，props.modelValue在nextTick中取到的会和target.value一致
    // target.value !== props.modelValue不成立，主动置值操作不会执行
    if (target.value === props.modelValue)
      emit('change', e)

    if (target.value !== props.modelValue)
      inputRef.value && (inputRef.value.value = props.modelValue)
  })
}

// 如果在使用该组件时没有v-model绑定，则props.modelValue就会是一直是初始默认值''。具体阐述如下：
// 没有v-model绑定的情况下，确实可以在handleInput响应函数中拿到输入框当时的内容和emit出'update:modelValue'事件
// 但是由于在使用时没有v-model绑定，所以响应不了抛射出的update:modelValue事件，也无法进行更新响应式变量的操作
// props.modelValue也就不会改变
onMounted(() => {
  // 刚挂载完成时，在无任何主动输入行为的情况下，无论value属性被设置为了什么值，通过inputRef.value.value取到的是空字符串
  if (inputRef.value && inputRef.value.value !== props.modelValue)
    inputRef.value.value = props.modelValue
})

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

// from vue3.2
defineExpose({
  focus,
  blur,
})
</script>

<template>
  <div :class="wrapperCls" v-bind="omit($attrs, [...inputDomProps])">
    <span v-if="$slots.prefix" :class="prefixCls">
      <slot name="prefix" />
    </span>
    <input ref="inputRef" v-bind="pick($attrs, [...inputDomProps])" :disabled="$props.disabled" :class="inputCls" :value="$props.modelValue" @input="handleInput">
    <span v-if="$slots.suffix" :class="suffixCls">
      <slot name="suffix" />
    </span>
  </div>
</template>
