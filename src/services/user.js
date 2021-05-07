import { authApi } from '@/api/auth'
import { clientApi } from '@/api/client'

export const userService = {
  login: (data) => clientApi.post('/vue-admin-template/user/login', data),
  logout: () => clientApi.post('/vue-admin-template/user/logout'),
  getInfo: () => authApi.get('/vue-admin-template/user/info')
}
