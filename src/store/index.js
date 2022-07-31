import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import utilities from './modules/utilities';
import game from './modules/game';

const vuexPersist = new VuexPersist({
  key: 'sumon',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: { game, utilities }
})
