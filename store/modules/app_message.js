import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    showMessage: false,
    message: null,
    backgroundColor: null
  },
  mutations: {
    setShowMessage (state, value) {
      state.showMessage = value
    },
    setMessage (state, message) {
      state.message = message
    },
    setBackgroundColor (state, backgroundColor) {
      state.backgroundColor = backgroundColor
    }
  },
  actions: {
    setAppMessage ({ commit }, payload) {
      // Payload can be both an object with 'message' and 'type' properties or
      // a string.
      const message = payload.message || payload
      // payload.type will define the color of the background, add if / elses
      // or switch if more 'types' are necessary. Remember the last must be the default.
      const backgroundColor = payload.type === 'error' ? 'crimson' : '#03c0fc'
      commit('setMessage', message)
      commit('setBackgroundColor', backgroundColor)
      commit('setShowMessage', true)
      setTimeout(() => {
        commit('setShowMessage', false)
        commit('setMessage', null)
        commit('setBackgroundColor', null)
      }, 5000)
    }
  }
}
