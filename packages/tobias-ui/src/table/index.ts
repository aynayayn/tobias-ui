import type { App, Plugin } from 'vue'
import Table from 'tobias-ui/table/table'
import { TableColumn } from 'tobias-ui/table/components/table-column'

(Table as unknown as Plugin).install = (app: App) => {
  app.component(Table.name!, Table)
  app.component(TableColumn.displayName, TableColumn)
}

export default Table
