import Vue from 'vue'
import Vuex from 'vuex'
import episodes from './episodes';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    episodes: episodes
  }
})
