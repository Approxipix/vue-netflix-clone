import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { store } from "./store/index";
import * as firebase from 'firebase';
import './index.scss'
import './helpers/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyCZCvqieLgtEPMmn8jdl79Aandh35MH_GQ",
  authDomain: "vue-netflix-clone.firebaseapp.com",
  databaseURL: "https://vue-netflix-clone.firebaseio.com",
  projectId: "vue-netflix-clone",
  storageBucket: "vue-netflix-clone.appspot.com",
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      }
    }).$mount('#app');
  }
});
