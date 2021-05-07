import { settingsMutations } from './enums'

export const actions = {
  changeSetting({ commit }, data) {
    commit(settingsMutations.CHANGE_SETTING, data)
  }
}
