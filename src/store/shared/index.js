import axios from 'axios';
import { actions } from '../../helpers/constants';

export default {
  state: {
    loading: false,
    configuration: null,
    genres: null,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setConfiguration(state, payload) {
      state.configuration = payload;
    },
    setGenres(state, payload) {
      state.genres = payload;
    },
  },
  actions: {
    clearError({ commit }) {
      commit(actions.clearError);
    },

    setError({ commit }, payload) {
      commit(actions.setError, payload);
    },

    setConfiguration({ commit }) {
      axios.get('https://api.themoviedb.org/3/configuration')
        .then(response => {
          commit(actions.setConfiguration, response.data);
        })
        .catch(error => {
          commit(actions.setError, error);
        });
    },

    async setGenres ({ commit }) {
      const genres = {
        tv: [],
        movies: []
      };

      await axios.get('https://api.themoviedb.org/3/genre/movie/list')
        .then(response => {
          genres.movies = response.data.genres;
        })
        .catch(error => {
          commit(actions.setError, error);
        });

      await axios.get('https://api.themoviedb.org/3/genre/tv/list')
        .then(response => {
          genres.tv = response.data.genres;
        })
        .catch(error => {
          commit(actions.setError, error);
        });

      commit(actions.setGenres, genres);
    }
  },
  getters: {
    configuration(state) {
      return state.configuration;
    },
    genres(state) {
      return state.genres;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
