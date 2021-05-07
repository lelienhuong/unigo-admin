import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { userMutations } from './enums'
import { userService } from '@/services/user'

export const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      userService.login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit(userMutations.SET.TOKEN, data.token, { root: true })
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      userService.getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit(userMutations.SET.NAME, name, { root: true })
        commit(userMutations.SET.AVATAR, avatar, { root: true })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      userService.logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit(userMutations.RESET_STATE, {}, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit(userMutations.RESET_STATE, {}, { root: true })
      resolve()
    })
  }
}
