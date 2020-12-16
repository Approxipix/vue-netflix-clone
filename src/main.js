import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { store } from "./store/index";
import * as firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { actions } from "./helpers/constants";
import './index.scss';
import './helpers/fontawesome';
import './helpers/axiosInterceptors';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

let app = '';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        if (user) {
          this.$store.dispatch(actions.autoSignIn, user);
        }
      }
    }).$mount('#app');
  }
});
