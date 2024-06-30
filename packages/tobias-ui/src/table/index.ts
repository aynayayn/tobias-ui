import type { App, Plugin } from 'vue'
import { TableColumn } from './components/table-column'
import Table from './table'

(Table as unknown as Plugin).install = (app: App) => {
  app.component(Table.name!, Table)
  app.component(TableColumn.displayName, TableColumn)
}

export default Table
