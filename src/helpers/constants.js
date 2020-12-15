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
  logout: 'logout',
  setGenres: 'setGenres',
};
