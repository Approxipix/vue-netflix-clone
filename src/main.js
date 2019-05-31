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

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyCZCvqieLgtEPMmn8jdl79Aandh35MH_GQ",
      authDomain: "vue-netflix-clone.firebaseapp.com",
      databaseURL: "https://vue-netflix-clone.firebaseio.com",
      projectId: "vue-netflix-clone",
      storageBucket: "vue-netflix-clone.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount("#app");
