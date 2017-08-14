import Vue from 'vue'
import Vuex from 'vuex'
import app_message from './modules/app_message'
import async_confirm from './modules/async_confirm'
import user_management from './modules/user_management'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app_message,
    async_confirm,
    user_management
  }
})
