import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import shared from "./shared";
import movie from "./movie";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    movie: movie,
  }
});
