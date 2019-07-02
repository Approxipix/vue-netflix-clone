import axios from 'axios';

export default {
  state: {
    loading: false,
    configuration: null,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setConfiguration (state, payload) {
      state.configuration = payload;
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    setConfiguration ({commit}) {
      axios.get('https://api.themoviedb.org/3/configuration').then(response => {
        commit('setConfiguration', response.data)
      }).catch(error => {
        commit('setError', error)
      });
    }
  },
  getters: {
    configuration (state) {
      return state.configuration
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
