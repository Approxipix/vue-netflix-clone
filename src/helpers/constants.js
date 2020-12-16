export const routes = {
  startNow: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  recoverPassword: '/recover-password',
  recoverPasswordSuccess: '/recover-password/success',
  recoverPasswordCode: '/recover-password/:code',

  home: '/home',
  tvShows: '/tv-shows/:id',
  movies: '/movies/:id',
  popular: '/popular',
  myList: '/my-list',
};

export const actions = {
  signUp: 'signUp',
  signIn: 'signIn',
  signInGoogle: 'signInGoogle',
  signInFacebook: 'signInFacebook',
  signInAnonymously: 'signInAnonymously',
  recoverPassword: 'recoverPassword',
  recoverPasswordWithEmail: 'recoverPasswordWithEmail',
  logout: 'logout',
  setUser: 'setUser',
  setLoading: 'setLoading',
  setGenres: 'setGenres',
  setConfiguration: 'setConfiguration',
  setError: 'setError',
  clearError: 'clearError',
};
