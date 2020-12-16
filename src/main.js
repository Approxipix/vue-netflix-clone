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
const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(config);

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
