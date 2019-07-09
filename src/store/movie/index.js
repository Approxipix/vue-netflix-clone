export default {
  state: {
    selectedMovie: {
      movie: null,
      category: '',
    },
  },
  mutations: {
    selectMovie (state, payload) {
      state.selectedMovie = payload
    },
  },
  actions: {
    selectMovie ({commit}, payload) {
      commit('selectMovie', payload)
    },
  },
  getters: {
    selectedMovie (state) {
      return state.selectedMovie
    },
  }
}
