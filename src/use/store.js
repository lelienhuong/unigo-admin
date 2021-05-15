import store from '@/store'

/**
 * Use for Composition API
 *
 * @returns
 */
export const useStore = () => {
  const rootState = store.state

  const mapState = (mappedStates, namespace) => {
    return Object.values(mappedStates).map(mappedState => {
      // Access to the store, then can be used as (state) => state.something.something
      return mappedState(namespace ? store.state[namespace] : store.state)
    }) // [ someState, someOtherState ]
  }

  const mapActions = (mappedActions, namespace) => {
    const actions = {}
    Object.keys(mappedActions).forEach((mappedAction, index) => {
      actions[mappedAction] = (...args) => {
        store.dispatch(mappedActions[mappedAction], ...args)
      }
    }) // [ someAction(something, somethingElse), someOtherAction ]
    return actions
  }

  const mapMutations = (mappedMutations, namespace) => {
    const mutations = {}
    Object.keys(mappedMutations).forEach((mappedMutation, index) => {
      mutations[mappedMutation] = (...args) => {
        store.commit(mappedMutations[mappedMutation], ...args)
      }
    }) // [ someAction(something, somethingElse), someOtherAction ]
    return mutations
  }

  return {
    rootState,
    mapState,
    mapActions,
    mapMutations
  }
}
