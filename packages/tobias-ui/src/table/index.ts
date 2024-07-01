import type { App, Plugin } from 'vue'
import { TableColumn } from 'tobias-ui/table/components/table-column'
import Table from 'tobias-ui/table/table'

(Table as unknown as Plugin).install = (app: App) => {
  app.component(Table.name!, Table)
  app.component(TableColumn.displayName, TableColumn)
}

export default Table
