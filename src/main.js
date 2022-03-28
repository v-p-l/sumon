import Vue from "vue";
import App from "@/App.vue";
import "@/plugins/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import confetti from "@/plugins/confetti";
import vueclipboard from "@/plugins/vueclipboard";
// import { initializeApp } from "firebase/app";
// import firebaseConfig from "@/plugins/firebaseConfig.js";

// initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
	confetti,
  vueclipboard,
  render: h => h(App)
}).$mount('#app')
