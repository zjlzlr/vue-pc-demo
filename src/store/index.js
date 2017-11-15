import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  loading: false
}

const mutations = { // 只支持同步
  changeLoading (state, show) { // 侧边栏路由
    state.loading = show
  }
}

const actions = { // 支持异步 API 和 分发多重 mutations
  changeLoading ({ commit }, value) {
    commit('changeLoading', value)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
