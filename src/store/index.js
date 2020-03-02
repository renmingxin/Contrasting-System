import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import game from './module/game'
import list from './module/list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    game,
    list
  }
})
