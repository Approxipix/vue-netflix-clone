import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import StartNow from '@/pages/StartNow/StartNow';
import SignIn from '@/pages/SignIn/SignIn';
import SignUp from '@/pages/SignUp/SignUp';
import RecoverPassword from '@/pages/RecoverPassword/RecoverPassword';
import RecoverPasswordSuccess from '@/pages/RecoverPassword/RecoverPasswordSuccess';
import RecoverPasswordForm from '@/pages/RecoverPassword/RecoverPasswordForm';
import Home from '@/pages/Home/Home';
import Movies from '@/pages/Movies/Movies';
import TVShows from '@/pages/TVShows/TVShows';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'StartNow',
      component: StartNow
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/recover-password',
      name: 'RecoverPassword',
      component: RecoverPassword
    },
    {
      path: '/recover-password/success',
      name: 'RecoverPasswordSuccess',
      component: RecoverPasswordSuccess
    },
    {
      path: '/recover-password/:code',
      name: 'RecoverPasswordForm',
      component: RecoverPasswordForm
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movies/:id',
      name: 'Movies',
      component: Movies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tv-shows/:id',
      name: 'TVShows',
      component: TVShows,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign-in');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
