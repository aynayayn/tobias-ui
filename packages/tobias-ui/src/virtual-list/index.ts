import type { App, Plugin } from 'vue'
import VirtualListDynamicItemHeight from './virtual-list-dynamic-item-height'
import VirtualListTranslate from './virtual-list-translate'
import VirtualList from './virtual-list'

(VirtualList as unknown as Plugin).install = (app: App) => {
  app.component(VirtualList.name!, VirtualList)
}

export default VirtualList;

(VirtualListTranslate as unknown as Plugin).install = (app: App) => {
  app.component(VirtualListTranslate.name!, VirtualListTranslate)
}
export { VirtualListTranslate }

(VirtualListDynamicItemHeight as unknown as Plugin).install = (app: App) => {
  app.component(VirtualListDynamicItemHeight.name!, VirtualListDynamicItemHeight)
}
export { VirtualListDynamicItemHeight }
