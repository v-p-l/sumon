import Vue from "vue";
import App from "@/App.vue";
import "@/plugins/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import confetti from "@/plugins/confetti";
import moment from "@/plugins/moment";
import vueclipboard from "@/plugins/vueclipboard";
import firebaseConfig from "@/plugins/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
	confetti,
  vueclipboard,
  moment,
  render: h => h(App)
}).$mount('#app')
