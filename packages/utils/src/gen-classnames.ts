import genClassnames from 'classnames'
import { computed } from 'vue'

type BEMType = string | [string, 'B' | 'E' | 'M' | undefined]

export function useClassnames(componentName: string) {
  const prefix = 'tobias'

  const componentClass = `${prefix}-${componentName}`

  // 类名拼接函数，接收多个字符串，返回单个类名，可以直接作为dom元素的class属性值
  const c = (...arg: BEMType[]) => {
    if (arg.length) {
      return arg.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          const [value, type] = cur
          if (type === 'E')
            return `${prev}__${value}`
          if (type === 'M')
            return `${prev}--${value}`
        }
        return `${prev}-${cur}`
      }, componentClass) as string
    }
    return componentClass
  }

  // 响应式类名生成函数，返回单个类名或者以空白符间隔的多个类名，可以直接作为dom元素的class属性值
  const cx = (cls: () => Record<string, boolean>) => {
    return computed(() => {
      const changedRaw = cls() // cls函数返回对象中的响应式变量的改变可以导致cls函数的重新执行
      const names = genClassnames(changedRaw)
      return names
    })
  }

  return { c, cx }
}
