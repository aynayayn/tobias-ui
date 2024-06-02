import genClassnames from 'classnames'
import { computed } from 'vue'

type BEMType = string | [string, 'B' | 'E' | 'M' | undefined]

export function useClassnames(componentName: string) {
  const prefix = 'tobias'

  const componentClass = `${prefix}-${componentName}`

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
      }, componentClass)
    }
    return componentClass
  }

  const cx = (cls: () => Record<string, boolean>) => {
    return computed(() => {
      const changedRaw = cls()
      const names = genClassnames(changedRaw)
      return names
    })
  }

  return { c, cx }
}
