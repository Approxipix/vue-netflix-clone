import * as firebase from "firebase";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    signUserInGoogle({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    // signUserInFacebook({ commit }) {
    //   commit("setLoading", true);
    //   commit("clearError");
    //   firebase
    //     .auth()
    //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    //     .then(user => {
    //       commit("setLoading", false);
    //       const newUser = {
    //         id: user.uid,
    //         name: user.displayName,
    //         email: user.email,
    //         photoUrl: user.photoURL
    //       };
    //       commit("setUser", newUser);
    //     })
    //     .catch(error => {
    //       commit("setLoading", false);
    //       commit("setError", error);
    //     });
    // },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
    },
    resetPasswordWithEmail({ commit }, payload) {
      const { email } = payload;
      commit("setLoading", true);
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          commit("setLoading", false);
          console.log("Email Sent");
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
