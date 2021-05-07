import { clientApi } from '@/api/client'

export const tableService = {
  getTableList: () => clientApi.get('/vue-admin-template/table/list')
}
