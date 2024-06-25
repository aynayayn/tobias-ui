import VirtualList from 'tobias-ui/virtual-list/virtual-list'
import type { App } from 'vue'
import VirtualListTranslate from 'tobias-ui/virtual-list/virtual-list-translate'
import VirtualListDynamicItemHeight from 'tobias-ui/virtual-list/virtual-list-dynamic-item-height'

VirtualList.install = (app: App) => {
  app.component(VirtualList.name!, VirtualList)
}

export default VirtualList

VirtualListTranslate.install = (app: App) => {
  app.component(VirtualListTranslate.name!, VirtualListTranslate)
}
export { VirtualListTranslate }

VirtualListDynamicItemHeight.install = (app: App) => {
  app.component(VirtualListDynamicItemHeight.name!, VirtualListDynamicItemHeight)
}
export { VirtualListDynamicItemHeight }
