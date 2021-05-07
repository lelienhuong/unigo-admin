import Vue from 'vue'
import Vuex from 'vuex'
import { camelCase } from 'lodash'
import { rootActions, rootMutations } from './enums'
import { authMutations } from './auth/enums'

Vue.use(Vuex)

const modules = {}

// See docs: https://webpack.js.org/guides/dependency-management/#context-module-api
const requireModule = require.context('./', true, /^(?=.*index).*\.js$/ /* Every index.js file */)
requireModule.keys().forEach((fileName) => {
  // Ignore this root index.js file, this is not a module
  if (fileName === './index.js') return
  // If your module path is something/else, moduleName will be somethingElse
  const moduleName = camelCase(fileName.replace(/(\.\/|index.js)/g, ''))
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  }
})

const store = new Vuex.Store({
  modules,
  state: {
    vueServerReady: false
  },
  mutations: {
    SET_VUE_SERVER_READY(state, vueServerReady) {
      Vue.set(state, 'vueServerReady', vueServerReady)
    }
  },
  actions: {
    vueServerInit({ rootState, commit }) {
      if (!rootState.vueServerReady) {
        const auth = localStorage.getItem('auth')
        if (auth) {
          commit(authMutations.SET.AUTH, JSON.parse(localStorage.getItem('auth')))
        }
        commit(rootMutations.SET.VUE_SERVER_READY, true)
      }
    }
  },
  getters: {
    sidebar: state => state?.app?.sidebar,
    device: state => state?.app?.device
  }
})

store.dispatch(rootActions.VUE_SERVER_INIT)

export default store
