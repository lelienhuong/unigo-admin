import { authService } from '@/services/auth'
import { authMutations } from './enums'

export const actions = {

  async login({ commit }, form) {
    const { data } = await authService.login(form)
    console.log(JSON.stringify(data))
    localStorage.setItem('auth', JSON.stringify(data))
    commit(authMutations.SET.AUTH, data, { root: true })
  },

  logout({ commit }, form) {
    localStorage.removeItem('auth')
    commit(authMutations.SET.AUTH, null, { root: true })
  }

}
