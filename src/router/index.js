import Vue from "vue";
import Router from "vue-router";
const Home = () => import("@/components/Home/Home");
const Profile = () => import("@/components/User/Profile");
const SignUp = () => import("@/components/SignUp/SignUp");
const SignIn = () => import("@/components/SignIn/SignIn");
import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      // beforeEnter: AuthGuard
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignIn
    }
  ],
  mode: "history"
});
