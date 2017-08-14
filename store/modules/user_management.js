import api from '../../api'

export default {
  namespaced: true,
  state: {
    selectedTab: null
  },
  getters: {
    userUrl () {
      return id => {
        return api.getEndpointUrl() + '/user/' + id
      }
    },
    createUserUrl () {
      return api.getEndpointUrl() + '/user/create'
    },
    agentUrl () {
      return id => {
        return api.getEndpointUrl() + '/agent/' + id
      }
    },
    createAgentUrl () {
      return api.getEndpointUrl() + '/agent/create'
    },
    roleListUrl () {
      return api.getEndpointUrl() + '/config/role/list'
    }
  },
  mutations: {
    changeSelectedTab (state, value) {
      state.selectedTab = value
    }
  }
}
