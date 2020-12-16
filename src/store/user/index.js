import * as firebase from "firebase";
import router from '../../router/index';
import { routes, actions } from '../../helpers/constants';

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUp({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit(actions.setLoading, false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
          this.dispatch(actions.setConfiguration);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    signIn({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit(actions.setLoading, false);
          this.dispatch(actions.setConfiguration);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    autoSignIn({ commit }, payload) {
      this.dispatch(actions.setConfiguration);
      commit(actions.setUser, {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      });
    },

    signInGoogle({ commit }) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit(actions.setLoading, false);
          this.dispatch(actions.setConfiguration);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    signInFacebook({ commit }) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(user => {
          commit(actions.setLoading, false);
          this.dispatch(actions.setConfiguration);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    signInAnonymously({ commit }) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          commit(actions.setLoading, false);
          this.dispatch(actions.setConfiguration);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    recoverPasswordWithEmail({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(() => {
          commit(actions.setLoading, false);
          router.push(routes.recoverPasswordSuccess)
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    recoverPassword({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .confirmPasswordReset(payload.code, payload.newPassword)
        .then(user => {
          commit(actions.setLoading, false);
          router.push(routes.home);
          this.dispatch(actions.setConfiguration);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit(actions.setUser, null);
          router.push(routes.startNow);
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
