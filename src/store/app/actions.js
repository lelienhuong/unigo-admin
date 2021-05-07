import { appMutations } from './enums'

export const actions = {
  toggleSideBar({ commit }) {
    commit(appMutations.TOGGLE.SIDEBAR, {}, { root: true })
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(appMutations.CLOSE_SIDEBAR, withoutAnimation, { root: true })
  },
  toggleDevice({ commit }, device) {
    commit(appMutations.TOGGLE.DEVICE, device, { root: true })
  }
}
