import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import actions from "./actions";
import { navUser } from "./containers/_navUser"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage
})

const state = {
  sidebarShow: 'responsive',
  sidebarList: navUser,
  sidebarMinimize: false,
  auth: {
    token: null,
    user: null,
    authenticated: false,
  }
}

const getters = {
  auth: state => {
    return state.auth
  },
  sidebarList: state => {
    return state.sidebarList
  }
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  AUTH_RESET_AUTH_DATA(state) {
    state.auth = {
      token: null,
      user: null,
      authenticated: false
    }
  },
  AUTH_SET_AUTH_DATA(state, data) {
    state.auth = {
      token: data.token,
      user: data.user,
      authenticated: data.authenticated
    }
  },
  SIDEBAR_SET_LIST(state, data) {
    state.sidebarList = data
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})