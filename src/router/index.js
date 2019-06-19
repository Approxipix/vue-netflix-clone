import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home/Home';
import SignIn from '@/pages/SignIn/SignIn';
import SignUp from '@/pages/SignUp/SignUp';
import RecoverPassword from '@/pages/RecoverPassword/RecoverPassword';
import RecoverPasswordSuccess from '@/pages/RecoverPassword/RecoverPasswordSuccess';
import RecoverPasswordForm from '@/pages/RecoverPassword/RecoverPasswordForm';
import Profile from '@/components/User/Profile';

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
      name: 'Home',
      component: Home
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign-in');
  else if (!requiresAuth && currentUser) next('profile');
  else next();
});

export default router;
