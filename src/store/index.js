import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import shared from "./shared";
import myList from "./myList";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    myList: myList,
    shared: shared,
  },
});
