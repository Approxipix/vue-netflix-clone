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
import Popular from '@/pages/Popular/Popular';
import MyList from '@/pages/MyList/MyList';
import Search from '@/pages/Search/Search';
import { routes } from '../helpers/constants';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: routes.startNow,
      name: 'StartNow',
      component: StartNow,
    },
    {
      path: routes.signIn,
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: routes.signUp,
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: routes.recoverPassword,
      name: 'RecoverPassword',
      component: RecoverPassword,
    },
    {
      path: routes.recoverPasswordSuccess,
      name: 'RecoverPasswordSuccess',
      component: RecoverPasswordSuccess,
    },
    {
      path: routes.recoverPasswordCode,
      name: 'RecoverPasswordForm',
      component: RecoverPasswordForm,
    },
    {
      path: routes.home,
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.movies}/:id` ,
      name: 'Movies',
      component: Movies,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.tvShows}/:id`,
      name: 'TVShows',
      component: TVShows,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: routes.popular,
      name: 'Popular',
      component: Popular,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: routes.myList,
      name: 'My List',
      component: MyList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.search}/:search`,
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next(routes.signIn);
  else if (!requiresAuth && currentUser) next(routes.home);
  else next();
});

export default router;
