import { actions } from '../../helpers/constants';

export default {
  state: {
    myList: [],
  },
  mutations: {
    setMyList(state, payload) {
      state.myList = payload;
    },
  },
  actions: {
    addMovieToMyList({ commit, state }, payload) {
      commit(actions.setMyList, [payload.movie, ...state.myList]);
    },
    removeMovieFromMyList({ commit, state }, payload) {
      commit(actions.setMyList, state.myList.filter(({ id }) => id !== payload.movie.id));
    },
  },
  getters: {
    myList(state) {
      return state.myList;
    }
  },
};
