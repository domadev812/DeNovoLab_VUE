export default {
  namespaced: true,
  state: {
    show: false,
    message: ''
  },
  mutations: {
    setShow (state, value) {
      state.show = value
    },
    setMessage (state, message) {
      state.message = message
    }
  },
  actions: {
    setAsyncConfirm ({ commit }, message) {
      commit('setShow', true)
      commit('setMessage', message)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            new Promise((resolve, reject) => {
              const acceptBtn = document.querySelector('.async-confirm-btn')
              const declineBtn = document.querySelector('.async-decline-btn')
              function restartState () {
                commit('setShow', false)
                commit('setMessage', '')
              }
              function acceptPromise () {
                acceptBtn.removeEventListener('click', acceptPromise)
                restartState()
                resolve({ accepted: true })
              }
              function rejectPromise () {
                declineBtn.removeEventListener('click', rejectPromise)
                restartState()
                resolve({ accepted: false })
              }
              acceptBtn.addEventListener('click', acceptPromise)
              declineBtn.addEventListener('click', rejectPromise)
            })
          )
        }, 0)
      })
    }
  }
}
